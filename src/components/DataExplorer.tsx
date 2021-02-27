import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from '@patternfly/react-core';
import { useDispatch } from 'react-redux';
import ChartRenderer from './Chart/';
import {
    ChartKind,
    ChartElement,
    ApiProps
} from './Chart/types';
import { useTypedSelector } from '../store/';
import { set as setCharts } from '../store/charts/actions';
import Form from './Form/';
import { fetchApi } from './helpers';
import {
    addWrapperElement
} from '../store/charts/actions';


interface Props {
    apis?: ApiProps[]
    schema?: ChartElement[],
    onSchemaChange?: (json: ChartElement[]) => void
}

const initialFetch = async (schema: ChartElement[]): Promise<ChartElement[]> => {
    const chartsToLoad = schema.filter(el => el.api);
    const staticSchema = schema.filter(el => !el.api)

    await Promise.all(
        chartsToLoad.map(el => fetchApi(el.api))
    ).then((results: Record<string, unknown>[]) => {
        for(let i = 0; i < chartsToLoad.length; i++) {
            chartsToLoad[i].api.data = results[i].items as Record<string, unknown>[];
        }
    });

    return [ ...staticSchema, ...chartsToLoad];
};

const DataExplorer: FunctionComponent<Props> = ({
    // apis = [], // for the form
    schema = [], // for the charts
    onSchemaChange = () => ([])
}) => {
    const [ loaded, setLoaded ] = useState(false);
    const charts = useTypedSelector(store => store.charts);
    const dispatch = useDispatch();
    const chartsIdsToRender = charts.filter(({ parent }) => parent === null).map(({ id }) => id);
    const [ editorChartId, setEditorChartId ] = useState(null as number);

    useEffect(() => {
        if (schema === []) {
            return;
        }

        initialFetch(schema).then((fetched) => {
            dispatch(setCharts(fetched));
            setLoaded(true);
        }).catch(() => ({}));
    }, [])

    useEffect(() => {
        onSchemaChange(charts.map(el => {
            if (el.kind === ChartKind.simple) {
                return { ...el, props: { ...el.props, data: []}}
            } else {
                return el;
            }
        }));
    }, [ charts ])

    const addNewChart = () => {
        dispatch(addWrapperElement({
            id: null,
            kind: ChartKind.wrapper,
            parent: null,
            props: {
                height: 200
            },
            xAxis: { label: 'Label X' },
            yAxis: { label: 'Label Y' },
            hidden: false
        }))
    };

    return (
        <React.Fragment>
            { chartsIdsToRender.length > 0 &&
                chartsIdsToRender.map(id => (
                    <Button
                        key={id}
                        onClick={() => {
                            setEditorChartId(id);
                        }}
                    >
                        Edit the { id } chart.
                    </Button>
                ))
            }
            <Button
                onClick={() => {
                    addNewChart()
                }}
            >
                New Chart
            </Button>
            { loaded && editorChartId &&
                <Button
                    onClick={() => {
                        setEditorChartId(null)
                    }}
                >
                    Close Editor
                </Button>

            }
            { loaded && editorChartId && <Form wrapperId={editorChartId} /> }
            { schema === [] && 'No schema provided' }
            { loaded && charts.length > 0 &&
                <ChartRenderer
                    charts={charts}
                    ids={editorChartId ? [ editorChartId ] : chartsIdsToRender}
                />
            }
        </React.Fragment>
    );
};

export default DataExplorer;
