import {
    ChartKind,
    ChartLegendOrientation,
    ChartLegendPosition,
    ChartSchemaElement,
    ChartSimple,
    ChartTooltipType,
    ChartTopLevelType,
    ChartType
} from '../../index';
import {
    ApiParams,
    FormChartTypes,
    FormSelectOptions
} from './types';

const mapChartType = (type: FormChartTypes): ChartType => {
    switch(type) {
        case FormChartTypes.bar: return ChartType.bar;
        case FormChartTypes.area: return ChartType.area;
        case FormChartTypes.line: return ChartType.line;
        default: return ChartType.bar;
    }
};

const getStackedSchema = (
    selectedOptions: FormSelectOptions,
    apiParams: ApiParams,
    lastId: number,
    topLevelId: number
): ChartSchemaElement[] => {
    const stackId = lastId + 1;

    const getSimpleChart = () => {
        const generateChart = (y: string, idx = 0) => ({
            id: stackId + 1 + idx,
            kind: ChartKind.simple,
            type: mapChartType(selectedOptions.chartType),
            parent: stackId,
            props: {
                x: 'created_date',
                y
            },
            tooltip: {
                type: ChartTooltipType.default,
                props: {}
            }
        } as ChartSimple);

        return (selectedOptions.attributes).map(generateChart);
    };

    return [
        {
            id: topLevelId,
            kind: ChartKind.wrapper,
            type: ChartTopLevelType.chart,
            parent: null,
            props: {
                height: 300,
                ...selectedOptions.chartType === FormChartTypes.bar && { domainPadding: 20 }
            },
            xAxis: {
                label: selectedOptions.xAxisLabel
            },
            yAxis: {
                label: selectedOptions.yAxisLabel
            },
            api: {
                params: apiParams,
                url: selectedOptions.source
            }
        },
        {
            id: stackId,
            parent: topLevelId,
            props: {},
            kind: ChartKind.stack
        },
        ...getSimpleChart()
    ];
}

const getGroupedSchema = (
    selectedOptions: FormSelectOptions,
    apiParams: ApiParams,
    lastId: number,
    topLevelId: number
): ChartSchemaElement[] => {
    const getSimpleChart = () => {
        const generateChart = (y: string, idx = 0) => ({
            id: lastId + 2 + idx, // Last Id + group adds 1 + the curretn increase
            kind: ChartKind.simple,
            type: ChartType.bar,
            parent: lastId + 1,
            props: {
                x: 'created_date',
                y
            },
            tooltip: {
                type: ChartTooltipType.default,
                props: {}
            }
        } as ChartSimple);

        return generateChart(selectedOptions.attributes[0], 0);
    };

    return [
        {
            id: topLevelId,
            kind: ChartKind.wrapper,
            type: ChartTopLevelType.chart,
            parent: null,
            props: {
                height: 300
            },
            xAxis: {
                label: selectedOptions.xAxisLabel
            },
            yAxis: {
                label: selectedOptions.yAxisLabel
            },
            api: {
                params: apiParams,
                url: selectedOptions.source + '?limit=5'
            },
            legend: {
                interactive: false,
                orientation: ChartLegendOrientation.vertical,
                position: ChartLegendPosition.right
            }
        },
        {
            id: lastId + 1,
            parent: topLevelId,
            props: {},
            kind: ChartKind.group,
            template: getSimpleChart()
        }
    ];
}

const getPieSchema = (
    selectedOptions: FormSelectOptions,
    apiParams: ApiParams,
    id: number
): ChartSchemaElement[] => {
    return [
        {
            id,
            kind: ChartKind.wrapper,
            type: ChartTopLevelType.pie,
            parent: null,
            props: {
                height: 300,
                x: '',
                y: selectedOptions.attributes[0]
            },
            api: {
                params: apiParams,
                url: selectedOptions.source + '?limit=5'
            },
            legend: {
                interactive: true,
                orientation: ChartLegendOrientation.vertical,
                position: ChartLegendPosition.right
            }
        }
    ]
}

const getSchema = (
    selectedOptions: FormSelectOptions,
    apiParams: ApiParams,
    lastId: number,
    topLevelId = lastId + 1
): ChartSchemaElement[] => {
    if (selectedOptions.attributes.length < 1) {
        return [];
    }

    if (lastId <= topLevelId) {
        lastId += 1;
    }

    switch(selectedOptions.chartType) {
        case FormChartTypes.grouped:
            return getGroupedSchema(selectedOptions, apiParams, lastId, topLevelId);
        case FormChartTypes.pie:
            return getPieSchema(selectedOptions, apiParams, topLevelId);
        default:
            return getStackedSchema(selectedOptions, apiParams, lastId, topLevelId);
    }
}

export default getSchema