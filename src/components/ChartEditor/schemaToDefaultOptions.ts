/* eslint no-console: ["error", { allow: ["error"] }] */
import {
    ChartGroup,
    ChartKind,
    ChartPie,
    ChartSchemaElement,
    ChartSimple,
    ChartStack,
    ChartTopLevelType,
    ChartTopSchemaElement,
    ChartType,
    ChartWrapper
} from '../Chart/types';
import {
    FormApiProps,
    FormChartTypes,
    FormSelectOptions
} from './types';

const mapChartType = (type: ChartType): FormChartTypes => {
    switch (type) {
        case ChartType.bar: return FormChartTypes.bar;
        case ChartType.area: return FormChartTypes.area;
        case ChartType.line: return FormChartTypes.line;
        default: return FormChartTypes.bar;
    }
};

const defaultOptions = (url: string): FormSelectOptions => ({
    source: url,
    // TODO: The total count may not supported in all APIs
    attributes: ['total_count'] as string[],
    chartType: FormChartTypes.bar,
    xAxis: 'time',
    viewBy: '-',
    xAxisLabel: 'Label X',
    yAxisLabel: 'Label Y'
});

const pieChartOptions = (element: ChartPie): FormSelectOptions => ({
    ...defaultOptions(element.api.url),
    attributes: [element.props.x as string],
    xAxis: element.api.params.group_by as string
});

const groupedChartOptions = (
    topElement: ChartWrapper,
    groupElement: ChartGroup
): FormSelectOptions => {
    if (!groupElement.template) {
        console.error('Edit chart: Groupped charts are supported only with the template option.');
        return defaultOptions(topElement.api.url);
    }

    return {
        ...defaultOptions(topElement.api.url),
        attributes: [groupElement.template.props.x as string],
        chartType: FormChartTypes.bar,
        xAxis: 'time',
        viewBy: topElement.api.params.group_by as string,
        xAxisLabel: topElement.xAxis.label || 'Label X',
        yAxisLabel: topElement.yAxis.label || 'Label Y'
    }
}

const stackedChartOptions = (
    topElement: ChartWrapper,
    stackElement: ChartStack,
    schema: ChartSchemaElement[]
): FormSelectOptions => {
    const simpleCharts = schema.filter(({ parent }) => parent === stackElement.id) as ChartSimple[];

    const chartType = simpleCharts.length > 0
        ? mapChartType(simpleCharts[0].type)
        : FormChartTypes.bar;

    return {
        ...defaultOptions(topElement.api.url),
        attributes: simpleCharts.map(({ props }) => props.y as string),
        chartType,
        xAxis: 'time',
        viewBy: '-',
        xAxisLabel: topElement.xAxis.label || 'Label X',
        yAxisLabel: topElement.yAxis.label || 'Label Y'
    }
}

const stackOrGroupedChartOptions = (
    schema: ChartSchemaElement[],
    topLevelElement: ChartWrapper
): FormSelectOptions => {
    const groupElement = schema.find(({ parent }) => parent === topLevelElement.id);

    if (groupElement.kind === ChartKind.group) {
        return groupedChartOptions(topLevelElement, groupElement);
    }

    if (groupElement.kind === ChartKind.stack) {
        return stackedChartOptions(topLevelElement, groupElement, schema);
    }

    console.error('Edit chart: The editor only supports stacked, grouped and pie charts.');
    return defaultOptions(topLevelElement.api.url);
}

const schemaToDefaultOptions = (
    schema: ChartSchemaElement[],
    apis: FormApiProps[],
    id: number
): FormSelectOptions => {
    if (!schema || schema.length < 1 || !id) {
        return defaultOptions(apis[0].url);
    }

    const topLevelElement = schema.find(
        ({ id: cId, kind }) => id === cId && kind === ChartKind.wrapper
    ) as ChartTopSchemaElement;

    if (!topLevelElement) {
        console.error('Edit chart: Could not find the top level chart element by id.');
        return defaultOptions(apis[0].url);
    }

    if (topLevelElement.type === ChartTopLevelType.chart) {
        return stackOrGroupedChartOptions(schema, topLevelElement);
    } else if (topLevelElement.type === ChartTopLevelType.pie){
        return pieChartOptions(topLevelElement);
    } else {
        console.error('Edit chart: Editor does not supports this top level chart element.');
        return defaultOptions(apis[0].url);
    }
};

export default schemaToDefaultOptions;