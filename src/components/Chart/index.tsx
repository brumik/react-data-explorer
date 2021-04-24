import React, { FunctionComponent } from 'react';
import {
    ChartKind,
    ChartSchema,
    ChartTopLevelType,
    ChartTopSchemaElement
} from './types';
import CreateWrapper from './Renderers/CreateWrapper';
import CreatePieChart from './Renderers/CreatePieChart';

interface Props {
    ids?: number[],
    data: ChartSchema
}

const ChartRenderer: FunctionComponent<Props> = ({
    ids = [] as number[],
    data
}) => {
    const charts = (): ChartTopSchemaElement[] => {
        const top = data.charts.filter(({ kind }) => kind === ChartKind.wrapper) as ChartTopSchemaElement[];
        if (ids.length > 0) {
            return top.filter(({ id }) => ids.includes(id)).sort((a,b) => a.id - b.id);
        } else {
            return top.filter(({ parent }) => parent === null).sort((a,b) => a.id - b.id);
        }
    }

    return (
        <React.Fragment>
            {charts().map(el => {
                if(el.type === ChartTopLevelType.chart) {
                    return (<CreateWrapper key={el.id} id={el.id} data={data} />);
                } else if (el.type === ChartTopLevelType.pie) {
                    return (<CreatePieChart key={el.id} id={el.id} data={data} />);
                } else {
                    return null;
                }
            })}
        </React.Fragment>
    );
}

export default ChartRenderer;
