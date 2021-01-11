import React, { FunctionComponent } from 'react';
import {
    ChartKind,
    ChartElement
} from './types';
import createChart from './createChart'
import createWrapper from './createWrapper';

interface Props {
    ids?: number[],
    allCharts: ChartElement[]
}

const ChartRenderer: FunctionComponent<Props> = ({
    ids = [],
    allCharts
}) => {
    const getCharts = () => {
        if (ids.length > 0) {
            return allCharts.filter(({ id }) => ids.includes(id));
        } else {
            return allCharts.filter(({ parent }) => parent === null);
        }
    }

    const components: Partial<Record<ChartKind, (id: number, allCharts: ChartElement[]) => React.ReactElement>> = {
        [ChartKind.wrapper]: createWrapper,
        [ChartKind.simple]: createChart
    };

    return (
        <React.Fragment>
            {getCharts() && getCharts().map(el => components[el.kind](el.id, allCharts))}
        </React.Fragment>
    );
}

export default ChartRenderer;
