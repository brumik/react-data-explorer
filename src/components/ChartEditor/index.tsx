import React, {
    FunctionComponent,
    useEffect,
    useState
} from 'react';
import { ChartKind, ChartSchemaElement, ChartTopLevelType, ChartType } from '../Chart/types';
import ChartRenderer from '../Chart';
import { functions } from '../../index';
import { ApiParams, FormApiProps } from './types';
import EditorDrawer from './EditorDrawer';
import { fetchApi, ApiReturnType } from './api';
import {
    Select,
    SelectOption,
    SelectVariant
} from '@patternfly/react-core';

interface Props {
    schema: ChartSchemaElement[],
    id: number,
    apis: FormApiProps[]
}


interface SelectOptionVariables {
    isOpen: boolean,
    selected: string | string[]
}
type SelectOptions = Record<string, SelectOptionVariables>;

const getSchema = (selectedOptions: SelectOptions): ChartSchemaElement[] => {
    if (
        selectedOptions.attributes.selected.length < 1
    ) {
        return [];
    }

    return [
        {
            id: 1000,
            kind: ChartKind.wrapper,
            type: ChartTopLevelType.chart,
            parent: null,
            props: {
                height: 300,
                domainPadding: selectedOptions.chartType?.selected === ChartType.bar ? 20 : 0
            },
            xAxis: {
                label: 'Date',
                tickFormat: 'formatDateAsDayMonth'
            },
            yAxis: {
                label: 'Jobs across all clusters'
            },
            api: {
                params: {
                    status: ['successful', 'failed'],
                    quick_date_range: 'last_30_days',
                    job_type: ['workflowjob', 'job'],
                    group_by_time: true,
                    only_root_workflows_and_standalone_jobs: false,
                    attributes: selectedOptions.attributes.selected
                },
                url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/'
            }
        },
        {
            id: 1100,
            kind: ChartKind.stack,
            parent: 1000,
            props: {}
        },
        ...(selectedOptions.attributes.selected as string[]).map((y, idx) => ({
            id: 1100 + 1 + idx,
            kind: ChartKind.simple,
            type: selectedOptions.chartType?.selected,
            parent: 1100,
            props: {
                x: 'created_date',
                y
            }
        } as ChartSchemaElement))
    ];
}

const ChartEditor: FunctionComponent<Props> = ({
    id,
    schema,
    apis
}) => {
    const [options, setOptions] = useState({} as ApiReturnType);
    const [selectOptions, setSelectoptions] = useState({
        source: {
            isOpen: false,
            selected: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/'
        },
        attributes: {
            isOpen: false,
            selected: ['successful_count', 'failed_count']
        },
        chartType: {
            isOpen: false,
            selected: ChartType.bar
        }
    } as SelectOptions);

    const getApiParams = (api: FormApiProps): ApiParams => ({
        ...api.params,
        // Temp to match the stacked bar chart
        status: ['successful', 'failed'],
        quick_date_range: 'last_30_days',
        job_type: ['workflowjob', 'job'],
        group_by_time: true,
        only_root_workflows_and_standalone_jobs: false,
        // The selected attr
        attributes: selectOptions?.attributes?.selected
    })

    useEffect(() => {
        fetchApi(
            apis[0].optionUrl,
            getApiParams(apis[0])
        ).then((data) => {
            setOptions(data);
        }).catch(() => ({}));
    }, []);

    const toggleInArray = (arr: string[], item: string): string[] =>
        arr.includes(item)
            ? arr.filter(i => i !== item)
            : [...arr, item];

    const form = () => (
        <React.Fragment>
            <p>For grouped bar chart</p>
            <span>Sources (apis)</span>
            <Select
                variant={SelectVariant.single}
                onToggle={() => setSelectoptions({
                    ...selectOptions,
                    source: {
                        ...selectOptions.source,
                        isOpen: !selectOptions.source.isOpen
                    }
                })}
                onSelect={(_, selection) => {
                    setSelectoptions({
                        ...selectOptions,
                        source: {
                            ...selectOptions.source,
                            selected: selection as string,
                            isOpen: false
                        }
                    });
                }}
                selections={selectOptions.source.selected}
                isOpen={selectOptions.source.isOpen}
                direction={'down'}
            >
                {apis.map(({ url, label }) =>
                    <SelectOption key={url} value={url}>{label}</SelectOption>
                )}
            </Select>
            <span>Attribute (select multiple)</span>
            <Select
                variant={SelectVariant.checkbox}
                onToggle={() => setSelectoptions({
                    ...selectOptions,
                    attributes: {
                        ...selectOptions.attributes,
                        isOpen: !selectOptions.attributes.isOpen
                    }
                })}
                onSelect={(_, selection) => {
                    setSelectoptions({
                        ...selectOptions,
                        attributes: {
                            ...selectOptions.attributes,
                            isOpen: false,
                            selected: toggleInArray(
                                selectOptions.attributes.selected as string[],
                                selection as string
                            )
                        }
                    });
                }}
                selections={selectOptions.attributes.selected}
                isOpen={selectOptions.attributes.isOpen}
                direction={'down'}
            >
                {options.attributes?.map(({key, value}) =>
                    <SelectOption key={key} value={key}>{ value }</SelectOption>
                )}
            </Select>
            <span>Chart Type</span>
            <Select
                variant={SelectVariant.single}
                onToggle={() => setSelectoptions({
                    ...selectOptions,
                    chartType: {
                        ...selectOptions.chartType,
                        isOpen: !selectOptions.chartType.isOpen
                    }
                })}
                onSelect={(_, selection) => {
                    setSelectoptions({
                        ...selectOptions,
                        chartType: {
                            ...selectOptions.chartType,
                            selected: selection as string,
                            isOpen: false
                        }
                    });
                }}
                selections={selectOptions.chartType.selected}
                isOpen={selectOptions.chartType.isOpen}
                direction={'down'}
            >
                <SelectOption value={ChartType.bar}>Bar</SelectOption>
                <SelectOption value={ChartType.line}>Line</SelectOption>
                <SelectOption value={ChartType.area}>Area</SelectOption>
            </Select>
        </React.Fragment>
    );

    return (
        <EditorDrawer
            form={Object.keys(options).length > 0 && form()}
            chart={
                <ChartRenderer
                    data={{
                        charts: getSchema(selectOptions),
                        functions
                    }}
                    ids={[id]}
                />
            }
        />
    );
};

export default ChartEditor;
