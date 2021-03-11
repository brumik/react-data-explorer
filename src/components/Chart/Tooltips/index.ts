import { TooltipType } from '../types';
import { ChartTooltip as DefaultLegend } from '@patternfly/react-charts';

type LegendType = typeof DefaultLegend;

const tooltips: Partial<Record<TooltipType, LegendType>> = {
    [TooltipType.default]: DefaultLegend
};

export default tooltips