import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
    Chart,
    ChartAxis,
    ChartVoronoiContainer
} from '@patternfly/react-charts';
import {
    ChartWrapper,
    ChartKind,
    DataType,
    WrapperTooltipProps
} from './types';
import createChart from './createChart';
import createGroup from './createGroup';
import createStack from './createStack';
import { disabledAxisProps } from './styling';
import { snakeToSentence } from './helpers';

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
        fixLabelOverlap: true,
        ...wrapper.xAxis,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...wrapper.xAxis.tickFormat && { tickFormat: functions.axisFormat[wrapper.xAxis.tickFormat] }
    };

    const yAxis = {
        ...wrapper.yAxis,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tickFormat: functions.axisFormat[wrapper.yAxis.tickFormat]
    };

    const childIsBarChart = () =>
        child.kind === ChartKind.simple && child.type === 'bar';


    const props = {
        domainPadding: childIsBarChart() ? 20 : 0,
        height: 200,
        ...wrapper.props
    }

    let otherProps = {
        padding: {
            bottom: 70,
            left: 70,
            right: 50,
            top: 50
        }
    };
    if (wrapper.legend) {
        const { legend } = wrapper;
        const { padding } = otherProps;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        padding[legend.position] += 100;
        if (
            legend.position === 'top' ||
            legend.position === 'bottom'
        ) {
            props.height += 100;
        }
        otherProps = {
            ...otherProps,
            ...padding,
            ...legend.data && { legendData: legend.data },
            ...legend.position && { legendPosition: legend.position },
            ...legend.orientation && { legendOrientation: legend.orientation }
        }
    }

    const getLabels = (tooltips: WrapperTooltipProps[]) =>
        ({ datum }: { datum: Record<string, string> }) => {
            let result = '';
            tooltips.forEach(({ labelAttr, labelName }, idx) => {
                if (idx > 0) {
                    result += '\n';
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                result += `${labelName ?? snakeToSentence(labelAttr)}: ${datum[labelAttr]}`;

            });
            return result;
        }

    let labelProps = {};
    if (wrapper.label) {
        labelProps = {
            containerComponent: <ChartVoronoiContainer
                constrainToVisibleArea
                labels={getLabels(wrapper.label)}
            />
        }
    }


    const containerRef = useRef<HTMLDivElement>(null);
    const [ width, setWidth ] = useState(0);
    const handleResize = () => {
        if (containerRef.current && containerRef.current.clientWidth) {
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

    return (
        <div ref={containerRef}>
            <div style={{ height: props.height }}>
                <Chart
                    {...otherProps}
                    {...props}
                    key={id}
                    width={width}
                    {...labelProps}
                >
                    {wrapper.hidden &&
                        <ChartAxis {...disabledAxisProps} />
                    }
                    {!wrapper.hidden && <ChartAxis {...xAxis} />}
                    {!wrapper.hidden && <ChartAxis dependentAxis {...yAxis} />}
                    {child && components[child.kind](child.id, data)}
                </Chart>
            </div>
        </div>
    );
};

export default CreateWrapper;
