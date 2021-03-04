const returnSame = (i: string | number): string => i as string;

const formatDateAsDays = (i: string): string =>
    (i && i.split('-')[2]);

const formatDateAsDayMonth = (i: string): string => {
    if (!i) return '';
    const parts = i.split('-');
    return `${parts[1]}/${parts[2]}`;
}

const formatNumberAsK = (i: number): string =>
    (i && i >= 1000 ? `${i / 1000}k` : `${i}`);

type FunctionTypeAxisMapper =
    typeof returnSame |
    typeof formatDateAsDays |
    typeof formatDateAsDayMonth |
    typeof formatNumberAsK;

export const axisFormat: Record<string, FunctionTypeAxisMapper> = {
    default: returnSame,
    formatDateAsDays,
    formatDateAsDayMonth,
    formatNumberAsK
};

const consoleLogValue = (e: never, params: Record<string, any>): void => {
    // eslint-disable-next-line no-console
    console.log(params);
};

type FunctionTypeOnClick = typeof consoleLogValue;

export const onClick: Record<string, FunctionTypeOnClick> = {
    consoleLog: consoleLogValue
};

export default {
    onClick,
    axisFormat
}