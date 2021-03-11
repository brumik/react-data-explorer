import React from 'react';
import {
    ChartBar,
    ChartLine,
    ChartPie,
    ChartArea,
    ChartScatter
} from '@patternfly/react-charts';
import {
    ChartType,
    Chart,
    TooltipProps,
    DataType,
    ResolvedApi
} from './types';
import legendMapper from './Tooltips';
import { snakeToSentence } from './helpers';

const components: Partial<Record<ChartType, React.ElementType>> = {
    [ChartType.bar]: ChartBar,
    [ChartType.line]: ChartLine,
    [ChartType.pie]: ChartPie,
    [ChartType.area]: ChartArea,
    [ChartType.scatter]: ChartScatter
};

const getLabels = ({ labelAttr, labelName }: TooltipProps) =>
    ({ datum }: { datum: Record<string, string> }) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `${labelName ?? snakeToSentence(labelAttr)}: ${datum[labelAttr]}`;

const createChart = (
    id: number,
    data: DataType,
    resolvedApi: ResolvedApi
): React.ReactElement => {
    const { charts, functions } = data;
    const chart = charts.find(({ id: i }) => i === id) as Chart;
    const SelectedChart = components[chart.type];

    let props = {...chart.props};
    if (chart.tooltip) {
        const LegendComponent = legendMapper[chart.tooltip.type];
        props = {
            ...props,
            labels: getLabels(chart.tooltip),
            labelComponent: <LegendComponent
                {...chart.tooltip.props}
                dy={0}
            />
        }
    }

    if (chart.onClick) {
        props = {
            ...props,
            events: [{
                target: 'data',
                eventHandlers: {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    onClick: functions.onClick[chart.onClick]
                }
            }]
        }
    }

    return (
        <SelectedChart
            key={chart.id}
            {...props}
            data={resolvedApi.data}
        />
    );
};

export default createChart;
