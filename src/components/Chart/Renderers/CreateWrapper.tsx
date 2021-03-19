import React, { FunctionComponent, useState } from 'react';
import {
    Chart as PFChart,
    ChartAxis,
    ChartLegendOrientation,
    ChartLegendPosition,
    ChartVoronoiContainer,
    createContainer
} from '@patternfly/react-charts';
import {
    ChartApiData,
    ChartData,
    ChartKind,
    ChartLegendData,
    ChartSchema,
    ChartSchemaElement,
    ChartType,
    ChartWrapper
} from '../types';
import createChart from './createChart';
import createGroup from './createGroup';
import createStack from './createStack';
import { getBarWidthFromData, getLabels } from '../Common/helpers';
import ResponsiveContainer from '../Common/ResponsiveContainer';
import { getInteractiveLegend } from '../Common/getInteractiveLegend';

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
    legendComponent?: any,
    domainPadding?: number,
    events?: any
}

const getDomainPadding = (
    data: ChartData,
    child: ChartSchemaElement
): number => {
    switch (child.kind) {
        case ChartKind.simple:
            return child.type === ChartType.bar ? 20 : 0;
        case ChartKind.group:
            return child.template && child.template.type === ChartType.bar
                ? getBarWidthFromData(data) * data.length / 2
                : 0
        default:
            return 0;
    }
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

    const props = {
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

        if (wrapper.legend.interactive) {
            otherProps = {
                ...otherProps,
                ...getInteractiveLegend(wrapper, resolvedApi, setResolvedApi)
            }
            delete otherProps.legendData;
        }
    }

    let labelProps = {};
    if (wrapper.tooltip) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const ContainerComponent = wrapper.tooltip.cursor
            ? createContainer('voronoi', 'cursor')
            : ChartVoronoiContainer;

        labelProps = {
            containerComponent: <ContainerComponent
                cursorDimension='x'
                constrainToVisibleArea
                labels={getLabels(wrapper.tooltip.data, wrapper.tooltip.customFnc)}
            />
        }
    }

    // Get the domain padding if it has a grouped bar chart from template or a bar chart
    otherProps = {
        domainPadding: getDomainPadding(resolvedApi.data, child),
        ...otherProps
    }

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
            >
                <ChartAxis {...xAxis} />
                <ChartAxis dependentAxis {...yAxis} />
                {child && components[child.kind](child.id, data, resolvedApi)}
            </PFChart>}
        </ResponsiveContainer>
    );
};

export default CreateWrapper;
