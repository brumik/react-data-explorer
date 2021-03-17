import React, { FunctionComponent, useState } from 'react';
import {
    Chart as PFChart,
    ChartAxis,
    ChartLegendOrientation,
    ChartLegendPosition,
    ChartVoronoiContainer
} from '@patternfly/react-charts';
import {
    ChartApiData,
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
import ResponsiveContainer from './ResponsiveContainer';
import { getInteractiveLegend } from './getInteractiveLegend';

const components: Partial<Record<ChartKind, (
    id: number,
    data: ChartSchema,
    resolvedApi: ChartApiData
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
    legendOrientation?: ChartLegendOrientation,
    legendComponent?: any
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
        data: []
    } as ChartApiData);

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

        const legendData: ChartLegendData = legend.data ?? resolvedApi.legend;
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { getEvents, legendComponent } = getInteractiveLegend(wrapper, resolvedApi, setResolvedApi);

    return (
        <ResponsiveContainer
            setWidth={setWidth}
            height={props.height}
            api={wrapper.api}
            setData={setResolvedApi}
        >
            {resolvedApi.data.length > 0 && <PFChart
                {...otherProps}
                {...props}
                key={id}
                width={width}
                {...labelProps}
                /* eslint-disable-next-line */
                events={getEvents()}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                legendComponent={legendComponent}
            >
                <ChartAxis {...xAxis} />
                <ChartAxis dependentAxis {...yAxis} />
                {child && components[child.kind](child.id, data, resolvedApi)}
            </PFChart>}
        </ResponsiveContainer>
    );
};

export default CreateWrapper;
