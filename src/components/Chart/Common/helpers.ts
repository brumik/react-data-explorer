import {
    ChartData,
    ChartTooltipCustomFunction,
    ChartTooltipPropsData
} from '../types';

type GetLabelReturnType = (d: any) => string;

const snakeToSentence = (str: string): string => {
    const sentence = str.toLowerCase().split('_');
    sentence[0] = sentence[0][0].toUpperCase() + sentence[0].slice(1);
    return sentence.join(' ');
}

const getChartLabelFromData = (
    { labelAttr, labelName }: ChartTooltipPropsData
): GetLabelReturnType =>
    ({ datum }: { datum: Record<string, string> }) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `${labelName ?? snakeToSentence(labelAttr)}: ${datum[labelAttr]}`;

const getWrapperLabelFromData = (tooltips: ChartTooltipPropsData[]) =>
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

export const getLabels = (
    data = null as ChartTooltipPropsData | ChartTooltipPropsData[],
    fnc = null as ChartTooltipCustomFunction
): GetLabelReturnType => {
    if (fnc) {
        return ({ datum }: { datum: Record<string, string> }) => fnc(datum);
    } else if (data) {
        return !Array.isArray(data)
            ? getChartLabelFromData(data)
            : getWrapperLabelFromData(data)
    } else {
        return () => '';
    }
}

export const getBarWidthFromData = (data: ChartData): number => {
    const calculated = Math.floor(50 / data.length);
    const min = 1;
    const max = 20;
    return Math.max(min, Math.min(max, calculated));
}