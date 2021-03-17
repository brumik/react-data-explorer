import React, { FunctionComponent, useState } from 'react';
import { ChartLegendOrientation, ChartPie as PFChartPie, ChartPieLegendPosition } from '@patternfly/react-charts';
import {
    ChartApiData,
    ChartLegendData,
    ChartPie,
    ChartSchema
} from './types';
import ResponsiveContainer from './ResponsiveContainer';

interface Props {
    id: number,
    data: ChartSchema
}

interface OtherProps {
    padding?: { top: number, bottom: number, left: number, right: number },
    legendData?: ChartLegendData,
    legendPosition?: ChartPieLegendPosition,
    legendOrientation?: ChartLegendOrientation
}

const CreatePieChart: FunctionComponent<Props> = ({
    id,
    data
}) => {
    const { charts } = data;
    const wrapper = charts.find(({ id: i }) => i === id) as ChartPie;
    const [width, setWidth] = useState(0);
    const [resolvedApi, setResolvedApi] = useState({
        data: []
    } as ChartApiData);

    const props = {
        height: 200,
        ...wrapper.props
    }

    let otherProps: OtherProps = {
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
        if (
            legend.position === ChartPieLegendPosition.bottom ||
            legend.position === ChartPieLegendPosition.right
        ) {
            padding[legend.position] += 100;
        }

        if (
            legend.position === ChartPieLegendPosition.bottom
        ) {
            props.height += 100;
        }

        const legendData: ChartLegendData = legend.data ?? resolvedApi.legend
        otherProps = {
            ...otherProps,
            padding,
            ...legend.position && { legendPosition: legend.position },
            ...legend.orientation && { legendOrientation: legend.orientation },
            legendData
        }
    }

    return (
        <ResponsiveContainer
            setWidth={setWidth}
            height={props.height}
            api={wrapper.api}
            setData={setResolvedApi}
        >
            { resolvedApi.data.length > 0 && <PFChartPie
                {...otherProps}
                {...props}
                labels={() => 'TODO'}
                data={resolvedApi.data[0].serie}
                key={id}
                width={width}
                constrainToVisibleArea={true}
            />}
        </ResponsiveContainer>
    );
};

export default CreatePieChart;