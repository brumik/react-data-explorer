import React, { FunctionComponent } from 'react';
import {
    ChartElement, DataType, PropFunctions
} from './types';
import createWrapper from './createWrapper';

interface Props {
    ids?: number[],
    data: DataType
}

const ChartRenderer: FunctionComponent<Props> = ({
    ids = null,
    data = {
        charts: [] as ChartElement[],
        functions: {} as PropFunctions
    }
}) => {
    const { charts } = data;
    const getCharts = () => {
        if (ids.length !== null) {
            return charts.filter(({ id }) => ids.includes(id)).sort((a,b) => a.id - b.id);
        } else {
            return charts.filter(({ parent }) => parent === null).sort((a,b) => a.id - b.id);
        }
    }

    return (
        <React.Fragment>
            { getCharts() && getCharts().map(el => createWrapper(el.id, data)) }
        </React.Fragment>
    );
}

export default ChartRenderer;
