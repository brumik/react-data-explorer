export enum AxisFunctions {
    formatDateAsDays = 'formatDateAsDays',
    formatNumberAsK = 'formatNumberAsK',
    default = ''
}

const returnSame = (i: any): string => i as string;

const formatDateAsDays = (i: string): string =>
    (i && i.split('-')[2]);

const formatNumberAsK = (i: number): string =>
    (i && i >= 1000 ? `${i / 1000}k` : `${i}`);

const mapper: Record<AxisFunctions, (i: any) => string> = {
    [AxisFunctions.default]: returnSame,
    [AxisFunctions.formatDateAsDays]: formatDateAsDays,
    [AxisFunctions.formatNumberAsK]: formatNumberAsK
};

type FuncType = (i: any) => string;
export const getFunction = (name: AxisFunctions): FuncType => mapper[name];
