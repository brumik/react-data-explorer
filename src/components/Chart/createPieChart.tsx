import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { ChartPie } from '@patternfly/react-charts';
import {
    DataType,
    GroupedApiDataFormat,
    ApiDataFormat,
    ApiDataKind,
    ApiProps,
    ResolvedApi,
    PieLegendPosition,
    LegendData,
    ChartPie as ChartPieType,
    LegendOrientation,
    SimpleApiDataFormat
} from './types';
import { ApiReturnType, ApiType, fetchApi, GroupedApi } from '../helpers';

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
            return datapoint.map(({ name }) => ({ name: (name || 'No Name') as string }));
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
    legendPosition?: PieLegendPosition,
    legendOrientation?: LegendOrientation
}

const CreatePieChart: FunctionComponent<Props> = ({
    id,
    data
}) => {
    const { charts } = data;
    const wrapper = charts.find(({ id: i }) => i === id) as ChartPieType;
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        padding[legend.position] += 100;
        if (legend.position === PieLegendPosition.bottom) {
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
                    !loading && <ChartPie
                        {...otherProps}
                        {...props}
                        data={resolvedApi.data}
                        key={id}
                        width={width}
                        constrainToVisibleArea={true}
                    />
                }
            </div>
        </div>
    );
};

export default CreatePieChart;
