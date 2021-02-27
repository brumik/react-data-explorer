import { ChartElement } from '../..';
import { Chart } from './types';


export const passDataToChildren = (
    charts: ChartElement[],
    childrenId: number[],
    data: Record<string, unknown>[]
): ChartElement[] => ([
    ...charts.filter(({ id }) => childrenId.includes(id)),
    ...childrenId.map(childId => {
        const modified = charts.find(({ id }) => id === childId) as Chart;
        // This if statement ensures that the chart's own data
        // prop is not overwritten, in case it has a more specific api
        if (
            modified.props &&
            modified.props.data &&
            modified.props.data.length > 0) {
            return modified;
        } else {
            modified.props.data = data;
            return modified;
        }
    })
]);