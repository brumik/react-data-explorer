import { ChartTooltipType } from '../types';
import { ChartTooltip as DefaultLegend } from '@patternfly/react-charts';

type LegendType = typeof DefaultLegend;

const mapper: Partial<Record<ChartTooltipType, LegendType>> = {
    [ChartTooltipType.default]: DefaultLegend
};

export default mapper