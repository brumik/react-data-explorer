import React, { FunctionComponent } from 'react';
import VChartWrapper from './VChartWrapper';
import { useTypedSelector } from '../helpers';

const ChartRenderer: FunctionComponent<Record<string, undefined>> = () => {
    const charts = useTypedSelector(store =>
        store.charts.filter(({ parent }) => parent === null));

    return (
        <React.Fragment>
            {charts.map(wrapper => (<VChartWrapper key={wrapper.id} {...wrapper} />))}
        </React.Fragment>
    );
}

export default ChartRenderer;
