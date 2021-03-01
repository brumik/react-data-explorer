import React from 'react';
import {
    VictoryBar,
    VictoryLine,
    VictoryPie,
    VictoryArea,
    VictoryScatter,
    VictoryHistogram
} from 'victory';
import {
    ChartType,
    Chart,
    ChartElement,
    LegendProps
} from './types';
import legendMapper from './Tooltips';
import { labelStylingProps } from './styling';
import { snakeToSentence } from './helpers';

const components: Partial<Record<ChartType, React.ElementType>> = {
    [ChartType.bar]: VictoryBar,
    [ChartType.line]: VictoryLine,
    [ChartType.pie]: VictoryPie,
    [ChartType.area]: VictoryArea,
    [ChartType.scatter]: VictoryScatter,
    [ChartType.histogram]: VictoryHistogram
};

const getLabels = ({ labelAttr, labelName }: LegendProps) =>
    ({ datum }: { datum: Record<string, string> }) =>
        `${labelName ?? snakeToSentence(labelAttr)}: ${datum[labelAttr]}`;

const createChart = (
    id: number,
    charts: ChartElement[]
): React.ReactElement => {
    const chart = charts.find(({ id: i }) => i === id) as Chart;
    const SelectedChart = components[chart.type];

    let props = {...chart.props};
    if (chart.legend) {
        const LegendComponent = legendMapper[chart.legend.type];
        props = {
            ...props,
            labels: getLabels(chart.legend),
            labelComponent: <LegendComponent
                {...labelStylingProps}
                {...chart.legend.props}
            />
        }
    }

    return (
        <SelectedChart
            key={chart.id}
            {...props}
        />
    );
};

export default createChart;
