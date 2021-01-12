import React, { FunctionComponent } from 'react';
import {
    ChartKind,
    ChartElement
} from './types';
import createChart from './createChart'
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
            return charts.filter(({ id }) => ids.includes(id));
        } else {
            return charts.filter(({ parent }) => parent === null);
        }
    }

    return (
        <React.Fragment>
            {
                getCharts() && getCharts().map(el => {
                    if (el.kind === ChartKind.wrapper) {
                        return createWrapper(el.id, charts);
                    } else {
                        return createChart(el);
                    }
                })
            }
        </React.Fragment>
    );
}

export default ChartRenderer;
