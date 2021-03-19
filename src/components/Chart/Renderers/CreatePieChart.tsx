import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    ChartLegend,
    ChartLegendOrientation,
    ChartPie as PFChartPie,
    ChartPieLegendPosition,
    getInteractiveLegendEvents,
    getInteractiveLegendItemStyles
} from '@patternfly/react-charts';
import {
    ChartApiData,
    ChartLegendData,
    ChartPie,
    ChartSchema
} from '../types';
import ResponsiveContainer from '../Common/ResponsiveContainer';

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

interface ReturnType {
    events: any,
    legendComponent: React.ReactElement<typeof ChartLegend>
}

const getInteractiveLegend = (
    element: ChartPie,
    serie: Record<string, string | number | boolean>[],
    setSerie: (serie: Record<string, string | number | boolean>[]) => void,
    chartData: ChartApiData
): ReturnType => {
    const handleLegendClick = ({ index }: { index: number }) => {
        // Don't allow hiding ALL the series
        const hiddenCount = serie.filter(({ hidden }) => hidden).length;
        if (
            !serie[index].hidden &&
            serie.length === hiddenCount + 1
        ) {
            return;
        }

        // Set the charts data in it too
        const tempData = [...serie];
        tempData[index].hidden = !tempData[index].hidden;
        setSerie(tempData);
    };

    const isHidden = (idx: number): boolean =>
        !!serie[idx]?.hidden;

    const getNames = (): [string | string[]] => [
        chartData.data[0]?.name
    ];

    const getEvents = () => {
        return getInteractiveLegendEvents({
            chartNames: getNames(),
            isHidden,
            legendName: `legend-${element.id}`,
            onLegendClick: handleLegendClick
        });
    }

    let r = {
        events: getEvents(),
        legendComponent: null
    } as ReturnType;

    if (element.legend && chartData.legend) {
        r = {
            ...r,
            legendComponent: <ChartLegend
                name={`legend-${element.id}`}
                data={chartData.legend.map((el, index) => ({
                    ...el,
                    ...getInteractiveLegendItemStyles(isHidden(index))
                }))}
                events={[{
                    target: 'labels',
                    eventHandlers: {
                        onClick: () => [
                            {
                                target: 'data',
                                mutation: (props) => {
                                    handleLegendClick(props);
                                    return null;
                                }
                            }
                        ]
                    }
                }]}
            />
        };
    }

    return r;
};

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
    const [serie, setSerie] = useState([
        { hidden: true }
    ] as Record<string, string | number | boolean>[])

    useEffect(() => {
        if (resolvedApi.data.length > 0) {
            setSerie(
                resolvedApi.data[0].serie.map(el => ({
                    ...el,
                    hidden: false
                }))
            );
        }
    }, [ resolvedApi ])

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

        if (wrapper.legend.interactive) {
            otherProps = {
                ...otherProps,
                ...getInteractiveLegend(wrapper, serie, setSerie, resolvedApi)
            };
            delete otherProps.legendData;
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
                data={serie.filter(({ hidden }) => !hidden)}
                key={resolvedApi.data[0].name}
                name={resolvedApi.data[0].name}
                width={width}
                constrainToVisibleArea={true}
            />}
        </ResponsiveContainer>
    );
};

export default CreatePieChart;
