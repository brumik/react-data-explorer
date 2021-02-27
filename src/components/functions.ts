export enum AxisFunctions {
    formatDateAsDays = 'formatDateAsDays',
    formatNumberAsK = 'formatNumberAsK',
    formatDateAsDayMonth = 'formatDateAsDayMonth',
    default = ''
}

const returnSame = (i: any): string => i as string;

const formatDateAsDays = (i: string): string =>
    (i && i.split('-')[2]);

const formatDateAsDayMonth = (i: string): string => {
    if (!i) return '';
    const parts  = i.split('-');
    return `${parts[1]}/${parts[2]}`;
}

const formatNumberAsK = (i: number): string =>
    (i && i >= 1000 ? `${i / 1000}k` : `${i}`);

const mapper: Record<AxisFunctions, (i: any) => string> = {
    [AxisFunctions.default]: returnSame,
    [AxisFunctions.formatDateAsDays]: formatDateAsDays,
    [AxisFunctions.formatDateAsDayMonth]: formatDateAsDayMonth,
    [AxisFunctions.formatNumberAsK]: formatNumberAsK
};

type FuncType = (i: any) => string;
export const getFunction = (name: AxisFunctions): FuncType => mapper[name];
