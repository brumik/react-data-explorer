import { ChartAxisFormatFunction } from './types';

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

const axisFormat: Record<string, ChartAxisFormatFunction> = {
    default: returnSame,
    formatDateAsDays,
    formatDateAsDayMonth,
    formatNumberAsK
};

export default axisFormat;