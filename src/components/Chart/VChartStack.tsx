/* eslint-disable */
import React, { FunctionComponent } from 'react';
// import { VictoryStack } from 'victory';
// import VChart from './VChart';
// import VChartGroup from './VChartGroup';
import {
    StackChart,
    // ChartKind
} from '../../types';

// const components: Partial<Record<ChartKind, React.ReactType>> = {
//     [ChartKind.group]: VChartGroup,
//     [ChartKind.simple]: VChart
// };

const VChartStack: FunctionComponent<StackChart> = () => (<></>);
/*(
    <VictoryStack>
        {charts.map((chart, idx) => {
            const Chart = components[chart.kind];
            return <Chart key={idx} {...chart} />
        })}
    </VictoryStack>
);*/

export default VChartStack;
