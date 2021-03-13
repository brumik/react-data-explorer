import React, { FunctionComponent, useState } from 'react';
import {
    Chart as PFChart,
    ChartAxis,
    ChartLegendOrientation,
    ChartLegendPosition,
    ChartVoronoiContainer
} from '@patternfly/react-charts';
import {
    ChartData,
    ChartDataKind,
    ChartKind,
    ChartLegendData,
    ChartSchema,
    ChartWrapper,
    ChartWrapperTooltipProps
} from './types';
import createChart from './createChart';
import createGroup from './createGroup';
import createStack from './createStack';
import { snakeToSentence } from './helpers';
import { getLegendData } from './Api';
import ResponsiveContainer from './ResponsiveContainer';

const components: Partial<Record<ChartKind, (
    id: number,
    data: ChartSchema,
    resolvedApi: ChartData
) => React.ReactElement>> = {
    [ChartKind.group]: createGroup,
    [ChartKind.stack]: createStack,
    [ChartKind.simple]: createChart
};

interface Props {
    id: number,
    data: ChartSchema
}

interface OtherProps {
    padding?: { top: number, bottom: number, left: number, right: number },
    legendData?: ChartLegendData,
    legendPosition?: ChartLegendPosition,
    legendOrientation?: ChartLegendOrientation
}

const CreateWrapper: FunctionComponent<Props> = ({
    id,
    data
}) => {
    const { charts, functions } = data;
    const wrapper = charts.find(({ id: i }) => i === id) as ChartWrapper;
    const child = charts.find(({ parent }) => parent === wrapper.id);
    const [width, setWidth] = useState(0);
    const [resolvedApi, setResolvedApi] = useState({
        data: [],
        kind: ChartDataKind.simple
    } as ChartData);

    const xAxis = {
        fixLabelOverlap: true,
        ...wrapper.xAxis,
        ...wrapper.xAxis.tickFormat && { tickFormat: functions.axisFormat[wrapper.xAxis.tickFormat] }
    };

    const yAxis = {
        ...wrapper.yAxis,
        tickFormat: functions.axisFormat[wrapper.yAxis.tickFormat]
    };

    const childIsBarChart = () =>
        child.kind === ChartKind.simple && child.type === 'bar';

    const props = {
        domainPadding: childIsBarChart() ? 20 : 0,
        height: 200,
        ...wrapper.props
    }

    let otherProps: OtherProps = {
        padding: {
            bottom: 70,
            left: 70,
            right: 50,
            top: 50
        }
    };
    if (wrapper.legend) {
        const { legend } = wrapper;
        const { padding } = otherProps;
        if (
            legend.position === ChartLegendPosition.bottom ||
            legend.position === ChartLegendPosition.right
        ) {
            padding[legend.position] += 100;
        }

        if (
            legend.position === ChartLegendPosition.bottomLeft ||
            legend.position === ChartLegendPosition.bottom
        ) {
            props.height += 100;
        }

        const legendData: ChartLegendData = legend.data
            ?? resolvedApi.data.length > 0
            ? getLegendData(resolvedApi)
            : [{ name: 'No Data Yet' }];
        otherProps = {
            ...otherProps,
            padding,
            ...legend.position && { legendPosition: legend.position },
            ...legend.orientation && { legendOrientation: legend.orientation },
            legendData
        }
    }

    const getLabels = (tooltips: ChartWrapperTooltipProps[]) =>
        ({ datum }: { datum: Record<string, string> }) => {
            let result = '';
            tooltips.forEach(({ labelAttr, labelName }, idx) => {
                if (idx > 0) {
                    result += '\n';
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                result += `${labelName ?? snakeToSentence(labelAttr)}: ${datum[labelAttr]}`;

            });
            return result;
        }

    let labelProps = {};
    if (wrapper.tooltip) {
        labelProps = {
            containerComponent: <ChartVoronoiContainer
                constrainToVisibleArea
                labels={getLabels(wrapper.tooltip)}
            />
        }
    }

    return (
        <ResponsiveContainer
            setWidth={setWidth}
            height={props.height}
            api={wrapper.api}
            setData={setResolvedApi}
        >
            <PFChart
                {...otherProps}
                {...props}
                key={id}
                width={width}
                {...labelProps}
            >
                <ChartAxis {...xAxis} />
                <ChartAxis dependentAxis {...yAxis} />
                {child && components[child.kind](child.id, data, resolvedApi)}
            </PFChart>
        </ResponsiveContainer>
    );
};

export default CreateWrapper;
