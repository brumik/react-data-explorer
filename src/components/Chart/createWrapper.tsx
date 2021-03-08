import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
    Chart,
    ChartAxis,
    ChartVoronoiContainer
} from '@patternfly/react-charts';
import {
    ChartWrapper,
    ChartKind,
    DataType
} from './types';
import createChart from './createChart';
import createGroup from './createGroup';
import createStack from './createStack';
import { axisStyle, disabledAxisProps } from './styling';

const components: Partial<Record<ChartKind, (
    id: number,
    data: DataType
) => React.ReactElement>> = {
    [ChartKind.group]: createGroup,
    [ChartKind.stack]: createStack,
    [ChartKind.simple]: createChart
};

interface Props {
    id: number,
    data: DataType
}

const CreateWrapper: FunctionComponent<Props> = ({
    id,
    data
}) => {
    const { charts, functions } = data;
    const wrapper = charts.find(({ id: i }) => i === id) as ChartWrapper;
    const child = charts.find(({ parent }) => parent === wrapper.id);

    const xAxis = {
        style: axisStyle,
        fixLabelOverlap: true,
        ...wrapper.xAxis,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...wrapper.xAxis.tickFormat && { tickFormat: functions.axisFormat[wrapper.xAxis.tickFormat] }
    };

    const yAxis = {
        style: axisStyle,
        ...wrapper.yAxis,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tickFormat: functions.axisFormat[wrapper.yAxis.tickFormat]
    };

    const childIsBarChart = () =>
        child.kind === ChartKind.simple && child.type === 'bar';


    const props = {
        // theme: VictoryTheme.material,
        domainPadding: childIsBarChart() ? 20 : 0,
        ...wrapper.props
    }

    const containerRef = useRef(null);
    const [ width, setWidth ] = useState(0);
    const handleResize = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (containerRef.current && containerRef.current.clientWidth) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            setWidth(containerRef.current.clientWidth);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    interface Datum {
        xName: string,
        _y: number
    }

    return (
        <div ref={containerRef}>
            <div style={{ height: props.height }}>
                <Chart
                    key={id}
                    {...props}
                    width={width}
                    containerComponent={<ChartVoronoiContainer
                        // eslint-disable-next-line no-underscore-dangle
                        labels={({ datum }: Record<string, Datum>) => `${datum.xName}: ${datum._y}`}
                        constrainToVisibleArea
                    />}
                    padding={{
                        bottom: 70,
                        left: 70,
                        right: 50,
                        top: 50
                    }}
                >
                    { wrapper.hidden &&
                        <ChartAxis {...disabledAxisProps} />
                    }
                    {!wrapper.hidden && <ChartAxis {...xAxis} /> }
                    {!wrapper.hidden && <ChartAxis dependentAxis {...yAxis} />}
                    { /* wrapper.legend && <VictoryLegend {...wrapper.legend} /> */ }
                    { child && components[child.kind](child.id, data) }
                </Chart>
            </div>
        </div>
    );
};

export default CreateWrapper;
