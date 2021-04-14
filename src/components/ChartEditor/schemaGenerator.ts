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
    SelectOptions
} from './types';

const mapChartType = (type: FormChartTypes): ChartType => {
    switch(type) {
        case FormChartTypes.bar: return ChartType.bar;
        case FormChartTypes.area: return ChartType.area;
        case FormChartTypes.line: return ChartType.line;
        default: return ChartType.bar;
    }
};

const getStackedSchema = (selectedOptions: SelectOptions, apiParams: ApiParams): ChartSchemaElement[] => {
    const getSimpleChart = () => {
        const generateChart = (y: string, idx = 0) => ({
            id: 1100 + 1 + idx,
            kind: ChartKind.simple,
            type: mapChartType(selectedOptions.chartType),
            parent: 1100,
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
            id: 1000,
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
            id: 1100,
            parent: 1000,
            props: {},
            kind: ChartKind.stack
        },
        ...getSimpleChart()
    ];
}

const getGroupedSchema = (selectedOptions: SelectOptions, apiParams: ApiParams): ChartSchemaElement[] => {
    const getSimpleChart = () => {
        const generateChart = (y: string, idx = 0) => ({
            id: 1100 + 1 + idx,
            kind: ChartKind.simple,
            type: ChartType.bar,
            parent: 1100,
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
            id: 1000,
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
            id: 1100,
            parent: 1000,
            props: {},
            kind: ChartKind.group,
            template: getSimpleChart()
        }
    ];
}

const getPieSchema = (selectedOptions: SelectOptions, apiParams: ApiParams): ChartSchemaElement[] => {
    return [
        {
            id: 1000,
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

const getSchema = (selectedOptions: SelectOptions, apiParams: ApiParams): ChartSchemaElement[] => {
    if (selectedOptions.attributes.length < 1) {
        return [];
    }

    switch(selectedOptions.chartType) {
        case FormChartTypes.grouped:
            return getGroupedSchema(selectedOptions, apiParams);
        case FormChartTypes.pie:
            return getPieSchema(selectedOptions, apiParams);
        default:
            return getStackedSchema(selectedOptions, apiParams);
    }
}

export default getSchema