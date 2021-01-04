import React from 'react';
import { VictoryGroup } from 'victory';
import chart from './createChart';
import { Chart } from '../../types';
import { useTypedSelector } from '../helpers';

const createGroup = (id: number): React.ReactElement => {
    const { children, ...c } = useTypedSelector(store => store.charts.find(({ id: i }) => i === id)) as Chart;

    return (
        <VictoryGroup
            {...c}
            offset={5}
            colorScale={['tomato', 'orange']}
        >
            {children.map((i) => chart(i))}
        </VictoryGroup>
    );
};

export default createGroup;
