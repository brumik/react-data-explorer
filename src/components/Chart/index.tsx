import React, { FunctionComponent } from 'react';
import {
    ChartElement, ChartKind, DataType, PropFunctions
} from './types';
import CreateWrapper from './createWrapper';
import CreatePieChart from './createPieChart';

interface Props {
    ids?: number[],
    data: DataType
}

const ChartRenderer: FunctionComponent<Props> = ({
    ids = [] as number[],
    data = {
        charts: [] as ChartElement[],
        functions: {} as PropFunctions
    }
}) => {
    const getCharts = (c: ChartElement[]) => {
        if (ids.length > 0) {
            return c.filter(({ id }) => ids.includes(id)).sort((a,b) => a.id - b.id);
        } else {
            return c.filter(({ parent }) => parent === null).sort((a,b) => a.id - b.id);
        }
    }

    return (
        <React.Fragment>
            {getCharts(data.charts).map(el => {
                if(el.kind === ChartKind.wrapper) {
                    return (<CreateWrapper key={el.id} id={el.id} data={data} />);
                } else if (el.kind === ChartKind.pie) {
                    return (<CreatePieChart key={el.id} id={el.id} data={data} />);
                } else {
                    return null;
                }
            })}
        </React.Fragment>
    );
}

export default ChartRenderer;
