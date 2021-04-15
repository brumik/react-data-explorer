export type ApiParams = Record<string, unknown>;
export interface FormApiProps {
    url: string,
    optionUrl: string,
    params: ApiParams,
    label: string
}

export interface FormSelectOptions {
    source: string,
    attributes: string[],
    chartType: FormChartTypes,
    xAxis: string,
    viewBy: string,
    xAxisLabel: string,
    yAxisLabel: string
}

export enum FormChartTypes {
    grouped = 'groupedBar',
    pie = 'pie',
    bar = 'bar',
    line = 'line',
    area = 'area'
}
