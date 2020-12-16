import React, { FunctionComponent } from 'react';
import { VictoryGroup } from 'victory';
import VChart from './VChart';
import { GroupChart } from '../../types';

interface Props extends GroupChart{
    [x: string]: any
}

const VChartGroup: FunctionComponent<Props> = ({
    children = [],
    ...rest
}) => {
    return (
        <VictoryGroup
            {...rest}
            offset={5}
            colorScale={['tomato', 'orange']}
        >
            {children.map((id) =>
                (<VChart
                    {...rest}
                    key={id}
                    id={id}
                    barWidth={1}
                />)
            )}
        </VictoryGroup>
    );
};

export default VChartGroup;
