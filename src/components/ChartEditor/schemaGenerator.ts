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
}

const getSchema = (selectedOptions: SelectOptions, apiParams: ApiParams): ChartSchemaElement[] => {
    if (
        Array.isArray(selectedOptions.attributes) &&
        selectedOptions.attributes.length < 1
    ) {
        return [];
    }

    const isGroup = () => selectedOptions.xAxis === 'created_date'
        && selectedOptions.viewBy !== '-';

    const getSimpleChart = () => {
        const generateChart = (y: string, idx = 0) => ({
            id: 1100 + 1 + idx,
            kind: ChartKind.simple,
            type: mapChartType(selectedOptions.chartType),
            parent: 1100,
            props: {
                x: selectedOptions.xAxis === 'created_date' ? 'created_date' : 'name',
                y
            },
            tooltip: {
                type: ChartTooltipType.default,
                props: {}
            }
        } as ChartSchemaElement);

        return (selectedOptions.attributes).map(generateChart);
    };

    /*
    Stacked/simple chart: x-axis je group by (time/org/template/etc...)
    Grouped chart: group by time AND neco ine
    */

    let baseArr: ChartSchemaElement[] = [
        {
            id: 1000,
            kind: ChartKind.wrapper,
            type: ChartTopLevelType.chart,
            parent: null,
            props: {
                height: 300,
                ...!isGroup() && selectedOptions.chartType === FormChartTypes.bar && { domainPadding: 20 }
            },
            xAxis: {
                label: selectedOptions.xAxisLabel
                // tickFormat: 'formatDateAsDayMonth'
            },
            yAxis: {
                label: selectedOptions.yAxisLabel
            },
            api: {
                params: apiParams,
                url: (selectedOptions.source) + (isGroup() ? '?limit=5' : '')
            },
            ...isGroup() && {
                legend: {
                    interactive: false,
                    orientation: ChartLegendOrientation.vertical,
                    position: ChartLegendPosition.right
                }
            }
        },
        {
            id: 1100,
            parent: 1000,
            props: {},
            ...isGroup() && {
                kind: ChartKind.group,
                template: getSimpleChart()[0] as ChartSimple
            },
            ...!isGroup() && { kind: ChartKind.stack }
        }
    ];

    if (!isGroup()) {
        baseArr = [...baseArr, ...getSimpleChart()];
    }

    return baseArr;
}

export default getSchema