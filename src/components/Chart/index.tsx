import React, { FunctionComponent } from 'react';
import {
    ChartElement
} from './types';
import createWrapper from './createWrapper';

interface Props {
    ids?: number[],
    charts: ChartElement[]
}

const ChartRenderer: FunctionComponent<Props> = ({
    ids = null,
    charts
}) => {
    const getCharts = () => {
        if (ids.length !== null) {
            return charts.filter(({ id }) => ids.includes(id)).sort((a,b) => a.id - b.id);
        } else {
            return charts.filter(({ parent }) => parent === null).sort((a,b) => a.id - b.id);
        }
    }

    return (
        <React.Fragment>
            { getCharts() && getCharts().map(el => createWrapper(el.id, charts)) }
        </React.Fragment>
    );
}

export default ChartRenderer;
