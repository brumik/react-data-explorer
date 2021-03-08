import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    ChartElement, DataType, PropFunctions
} from './types';
import CreateWrapper from './createWrapper';
import { fetchApi } from '../helpers';

interface Props {
    ids?: number[],
    data: DataType
}

const initialFetch = async (schema: ChartElement[]): Promise<ChartElement[]> => {
    const chartsToLoad = schema.filter(el => el.api);
    const staticSchema = schema.filter(el => !el.api)


    await Promise.all(
        chartsToLoad.map(el => fetchApi(el.api))
    ).then((results: Record<string, unknown>[]) => {
        for (let i = 0; i < chartsToLoad.length; i++) {
            chartsToLoad[i].api.data = results[i].items as Record<string, unknown>[];
        }
    });

    return [...staticSchema, ...chartsToLoad];
};


const ChartRenderer: FunctionComponent<Props> = ({
    ids = [] as number[],
    data = {
        charts: [] as ChartElement[],
        functions: {} as PropFunctions
    }
}) => {
    const [loaded, setLoaded] = useState(false);
    const [fetched, setFetched] = useState([] as ChartElement[]);

    const getCharts = (c: ChartElement[]) => {
        if (ids.length > 0) {
            return c.filter(({ id }) => ids.includes(id)).sort((a,b) => a.id - b.id);
        } else {
            return c.filter(({ parent }) => parent === null).sort((a,b) => a.id - b.id);
        }
    }

    useEffect(() => {
        initialFetch(data.charts).then((initialized) => {
            setFetched(initialized);
            setLoaded(true);
        }).catch(() => ({}));
    }, [ data ])

    return (
        <React.Fragment>
            { loaded && getCharts(fetched).map(el =>
                (<CreateWrapper
                    id={el.id}
                    key={el.id}
                    data={{ ...data, charts: fetched }}
                />)
            )}
        </React.Fragment>
    );
}

export default ChartRenderer;
