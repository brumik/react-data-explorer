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
    WrapperTooltipProps,
    GroupedApiDataFormat,
    ApiDataFormat,
    ApiDataKind,
    ApiProps,
    ResolvedApi,
    LegendPosition,
    LegendData,
    SimpleApiDataFormat,
    LegendOrientation
} from './types';
import createChart from './createChart';
import createGroup from './createGroup';
import createStack from './createStack';
import { disabledAxisProps } from './styling';
import { snakeToSentence } from './helpers';
import { ApiReturnType, ApiType, fetchApi, GroupedApi } from '../helpers';

const components: Partial<Record<ChartKind, (
    id: number,
    data: DataType,
    resolvedApi: ResolvedApi
) => React.ReactElement>> = {
    [ChartKind.group]: createGroup,
    [ChartKind.stack]: createStack,
    [ChartKind.simple]: createChart
};

interface Props {
    id: number,
    data: DataType
}

const convertGroupedByData = (data: GroupedApi): GroupedApiDataFormat => {
    const { dates } = data;
    const items: GroupedApiDataFormat = [];
    dates.forEach((el) => {
        el.items.forEach((item, idx) => {
            if (!items[idx]) {
                items[idx] = [];
            }
            items[idx].push({
                created_date: el.date,
                ...item
            });
        })
    });
    return items;
}

const getApiData = async (api: ApiProps): Promise<ResolvedApi> => {
    const resolvedData: ResolvedApi = {
        data: [] as ApiDataFormat,
        kind: ApiDataKind.simple
    }

    await fetchApi(api).then((result: ApiReturnType) => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        if (result['dates']) {
            result.type = ApiType.grouped
        } else {
            result.type = ApiType.nonGrouped
        }

        switch (result.type) {
            case ApiType.grouped:
                resolvedData.data = convertGroupedByData(result);
                resolvedData.kind = ApiDataKind.grouped
                break;
            case ApiType.nonGrouped:
                resolvedData.data = result.items;
                resolvedData.kind = ApiDataKind.simple
                break;
        }
    });

    return resolvedData;
};

const getLegendData = (resolvedApi: ResolvedApi): LegendData => {
    switch (resolvedApi.kind) {
        case ApiDataKind.simple:
            const datapoint = resolvedApi.data as SimpleApiDataFormat;
            return [{ name: datapoint[0].name as string }];
        case ApiDataKind.grouped:
            const datapoints = resolvedApi.data as GroupedApiDataFormat;
            return datapoints.map(line => ({
                name: (line[0].name || 'No Name') as string
            }));
    }
};

interface OtherProps {
    padding?: { top: number, bottom: number, left: number, right: number },
    legendData?: LegendData,
    legendPosition?: LegendPosition,
    legendOrientation?: LegendOrientation
}

const CreateWrapper: FunctionComponent<Props> = ({
    id,
    data
}) => {
    const { charts, functions } = data;
    const wrapper = charts.find(({ id: i }) => i === id) as ChartWrapper;
    const child = charts.find(({ parent }) => parent === wrapper.id);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const handleResize = () => {
        if (containerRef.current && containerRef.current.clientWidth) {
            setWidth(containerRef.current.clientWidth);
        }
    };
    const [loading, setLoading] = useState(true);
    const [resolvedApi, setResolvedApi] = useState({
        data: [],
        kind: ApiDataKind.simple
    } as ResolvedApi);

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        padding[legend.position] += 100;
        if (
            legend.position === LegendPosition.bottomLeft ||
            legend.position === LegendPosition.bottom
        ) {
            props.height += 100;
        }

        const legendData: LegendData = legend.data
            ?? resolvedApi.data.length > 0
            ? getLegendData(resolvedApi)
            : [{ name: 'No Data Yet' }];
        otherProps = {
            ...otherProps,
            padding,
            ...legend.position && { legendPosition: legend.position },
            ...legend.orientation && { legendOrientation: legend.orientation },
            legendData
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
    if (wrapper.tooltip) {
        labelProps = {
            containerComponent: <ChartVoronoiContainer
                constrainToVisibleArea
                labels={getLabels(wrapper.tooltip)}
            />
        }
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        getApiData(wrapper.api)
            .then(results => {
                setResolvedApi(results);
            })
            .catch(() => ({}))
            .finally(() => {
                setLoading(false);
            });

    }, [ wrapper.api ])

    return (
        <div ref={containerRef}>
            <div style={{ height: props.height }}>
                {
                    !loading && <Chart
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
                        {child && components[child.kind](child.id, data, resolvedApi)}
                    </Chart>
                }
            </div>
        </div>
    );
};

export default CreateWrapper;
