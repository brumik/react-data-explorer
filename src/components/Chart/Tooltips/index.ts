import { TooltipType } from '../types';
import { ChartTooltip as DefaultLegend } from '@patternfly/react-charts';

const tooltips: Partial<Record<TooltipType, React.ElementType>> = {
    [TooltipType.default]: DefaultLegend
};

export default tooltips