import { TooltipType } from '../types';
import { default as DefaultLegend } from './DefaultTooltip';

const tooltips: Partial<Record<TooltipType, React.ElementType>> = {
    [TooltipType.default]: DefaultLegend
};

export default tooltips