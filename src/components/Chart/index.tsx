import React, { FunctionComponent } from 'react';
import {
    ChartElement, DataType, PropFunctions
} from './types';
import CreateWrapper from './createWrapper';

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
            { getCharts(data.charts).map(el =>
                (<CreateWrapper
                    id={el.id}
                    key={el.id}
                    data={data}
                />)
            )}
        </React.Fragment>
    );
}

export default ChartRenderer;
