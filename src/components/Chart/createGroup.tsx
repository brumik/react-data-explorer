import React from 'react';
import { VictoryGroup } from 'victory';
import chart from './createChart';
import {
    ChartElement
} from './types';

const createGroup = (id: number, allCharts: ChartElement[]): React.ReactElement => {
    const { children, ...c } = allCharts.find(({ id: i }) => i === id);

    return (
        <VictoryGroup
            {...c}
            offset={5}
            colorScale={['tomato', 'orange']}
        >
            {children.map((i) => chart(i, allCharts))}
        </VictoryGroup>
    );
};

export default createGroup;
