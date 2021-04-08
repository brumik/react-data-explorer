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
import CustomSelect from './CustomSelect';

interface Props {
    schema: ChartSchemaElement[],
    id: number,
    apis: FormApiProps[]
}


type SelectOptions = Record<string, string | string[]>;

const getSchema = (selectedOptions: SelectOptions, apiParams: ApiParams): ChartSchemaElement[] => {
    if (
        selectedOptions.attributes.length < 1
    ) {
        return [];
    }

    /*
    Stacked/simple chart: x-axis je group by (time/org/template/etc...)
    Grouped chart: group by time AND neco ine
    */

    return [
        {
            id: 1000,
            kind: ChartKind.wrapper,
            type: ChartTopLevelType.chart,
            parent: null,
            props: {
                height: 300,
                domainPadding: selectedOptions.chartType === ChartType.bar ? 20 : 0
            },
            xAxis: {
                label: 'Date'
                // tickFormat: 'formatDateAsDayMonth'
            },
            yAxis: {
                label: 'Jobs across all clusters'
            },
            api: {
                params: apiParams,
                url: selectedOptions.source as string
            }
        },
        {
            id: 1100,
            kind: ChartKind.stack,
            parent: 1000,
            props: {}
        },
        ...(selectedOptions.attributes as string[]).map((y, idx) => ({
            id: 1100 + 1 + idx,
            kind: ChartKind.simple,
            type: selectedOptions.chartType,
            parent: 1100,
            props: {
                x: selectedOptions.xAxis === 'created_date' ? 'created_date' : 'name',
                y
            }
        } as ChartSchemaElement))
    ];
}

const chartTypeOptions = [
    {key: ChartType.bar, value: 'Bar'},
    {key: ChartType.line, value: 'Line'},
    {key: ChartType.area, value: 'Area'}
];

const xAxisOptions = [
    {key: 'created_date', value: 'Date'},
    {key: 'org', value: 'Organizations'},
    {key: 'template', value: 'Templates'},
    {key: 'cluster', value: 'Clusters'}
];

const ChartEditor: FunctionComponent<Props> = ({
    id,
    schema,
    apis
}) => {
    const [options, setOptions] = useState({} as ApiReturnType);
    const [selectOptions, setSelectoptions] = useState({
        source: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
        attributes: ['successful_count', 'failed_count'],
        chartType: ChartType.bar,
        xAxis: 'created_date'
    });

    const getApiParams = (): ApiParams => ({
        group_by_time: selectOptions.xAxis === 'created_date',
        ...selectOptions.xAxis !== 'created_date' && {group_by: selectOptions.xAxis},
        only_root_workflows_and_standalone_jobs: false,
        attributes: selectOptions?.attributes
    })

    useEffect(() => {
        fetchApi(
            apis[0].optionUrl,
            getApiParams()
        ).then((data) => {
            setOptions(data);
        }).catch(() => ({}));
    }, []);

    const form = () => (
        <React.Fragment>
            <span>Sources (apis)</span>
            <CustomSelect
                selected={selectOptions.source}
                onChange={(value) =>
                    setSelectoptions({
                        ...selectOptions,
                        source: value as string
                    })
                }
                options={apis.map(({ url, label }) => ({ key: url, value: label }))}
            />
            <span>X-axis</span>
            <CustomSelect
                selected={selectOptions.xAxis}
                onChange={(value) =>
                    setSelectoptions({
                        ...selectOptions,
                        xAxis: value as string
                    })
                }
                options={xAxisOptions}
            />
            <span>Attribute (select multiple)</span>
            <CustomSelect
                selected={selectOptions.attributes}
                onChange={(value) =>
                    setSelectoptions({
                        ...selectOptions,
                        attributes: value as string[]
                    })
                }
                options={options.attributes}
                isSingle={false}
            />
            <span>Chart Type</span>
            <CustomSelect
                selected={selectOptions.chartType}
                onChange={(value) =>
                    setSelectoptions({
                        ...selectOptions,
                        chartType: value as ChartType
                    })
                }
                options={chartTypeOptions}
            />
        </React.Fragment>
    );

    return (
        <EditorDrawer
            form={Object.keys(options).length > 0 && form()}
            chart={
                <ChartRenderer
                    data={{
                        charts: getSchema(selectOptions, getApiParams()),
                        functions
                    }}
                    ids={[id]}
                />
            }
        />
    );
};

export default ChartEditor;
