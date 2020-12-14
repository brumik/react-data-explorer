import React, { FunctionComponent, useContext } from 'react';
import VChartWrapper from './VChartWrapper';
import ChartElementsContext from '../ChartElementsContext'

const ChartRenderer: FunctionComponent<Record<string, undefined>> = () => {
    const chartElements = useContext(ChartElementsContext);
    const charts = chartElements.filter(({ parent }) => parent === null);

    return (
        <React.Fragment>
            {charts.map(wrapper => (<VChartWrapper key={wrapper.id} {...wrapper} />))}
        </React.Fragment>
    );
}

export default ChartRenderer;
