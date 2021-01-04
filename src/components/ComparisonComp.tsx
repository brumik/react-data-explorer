import React, { FunctionComponent } from 'react';
import { VictoryChart, VictoryBar, VictoryGroup, VictoryAxis, VictoryLine } from 'victory';

interface Props {
    data: any[]
}

const axisStyle = {
    axisLabel: { fontSize: 7, padding: 22 },
    ticks: { size: 5 },
    tickLabels: { fontSize: 5, padding: 2 }
};

const xAxis = {
    style: axisStyle,
    tickFormat: (i: string) => (i && i.split('-')[2])
};

const yAxis = {
    style: axisStyle,
    tickFormat: (i: number) => (i && i >= 1000 ? `${i / 1000}k` : i)
};

const ComparisonComp: FunctionComponent<Props> = ({ data }) => (
    <><VictoryChart
        height={200}
    >
        <VictoryAxis {...xAxis} />
        <VictoryAxis
            dependentAxis
            {...yAxis}
        />
        <VictoryLine
            data={data}
            x={'created_date'}
            y={'host_count'}
        />
    </VictoryChart>
    <VictoryChart
        height={200}
    >
        <VictoryAxis {...xAxis} />
        <VictoryAxis
            dependentAxis
            {...yAxis}
        />
        <VictoryGroup
            offset={5}
            colorScale={['tomato', 'orange']}
        >
            <VictoryBar
                data={data}
                x={'created_date'}
                y={'host_count'}
            />
            <VictoryBar
                data={data}
                x={'created_date'}
                y={'host_count'}
            />
        </VictoryGroup>
    </VictoryChart></>
);

export default ComparisonComp;
