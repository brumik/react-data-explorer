import React, {
    FunctionComponent,
    useEffect,
    useState
} from 'react';
import { ChartSchemaElement } from '../Chart/types';
import ChartRenderer from '../Chart';
import { functions } from '../../index';
import { ApiParams, FormApiProps, FormChartTypes } from './types';
import EditorDrawer from './EditorDrawer';
import { fetchApi, ApiReturnType } from './api';
import CustomSelect from './CustomSelect';
import { Button, TextInput } from '@patternfly/react-core';
import getSchema from './schemaGenerator';
import schemaToDefaultOptions from './schemaToDefaultOptions';

interface Props {
    schema: ChartSchemaElement[],
    id: number,
    apis: FormApiProps[]
}

const ChartEditor: FunctionComponent<Props> = ({
    id,
    schema: defaultSchema,
    apis
}) => {
    const [options, setOptions] = useState({} as ApiReturnType);
    const [selectOptions, setSelectoptions] = useState(
        schemaToDefaultOptions(defaultSchema, apis, id)
    );

    const grouppedByTime = () => selectOptions.xAxis === 'time';
    const groupedByElse = () => selectOptions.viewBy !== '-';
    const isGroupedChart = () => grouppedByTime() && groupedByElse();
    const isPieChart = () => !grouppedByTime();

    const getApiParams = (): ApiParams => ({
        group_by_time: grouppedByTime(),
        ...!grouppedByTime() ?
            {group_by: selectOptions.xAxis} :
            {group_by: groupedByElse() ? selectOptions.viewBy : null},
        attributes: selectOptions?.attributes,
        quick_date_range: 'last_2_weeks'
    });

    const [schema, setSchema] = useState(getSchema(selectOptions, getApiParams()));

    const applySettings = () => {
        setSchema(getSchema(selectOptions, getApiParams()));
    }

    useEffect(() => {
        fetchApi(
            apis[0].optionUrl,
            getApiParams()
        ).then((data) => {
            setOptions(data);
        }).catch(() => ({}));
    }, [ apis[0], selectOptions.xAxis, selectOptions.attributes, selectOptions.viewBy ]);

    const getChartFormOptions = () => {
        let chartTypeOptions = [];

        if (isGroupedChart()) {
            chartTypeOptions = [{ key: FormChartTypes.grouped, value: 'Grouped bar chart' }];
        } else if (isPieChart()) {
            chartTypeOptions = [{ key: FormChartTypes.pie, value: 'Pie chart' }];
        } else {
            chartTypeOptions = [
                { key: FormChartTypes.bar, value: 'Bar chart' },
                { key: FormChartTypes.line, value: 'Line chart' },
                { key: FormChartTypes.area, value: 'Area chart' }
            ];
        }

        if (!chartTypeOptions.map(({key}) => key).includes(selectOptions.chartType)) {
            setSelectoptions({
                ...selectOptions,
                chartType: chartTypeOptions[0].key
            });
        }

        return (
            <React.Fragment>
                <span>Chart Type</span>
                <CustomSelect
                    selected={selectOptions.chartType}
                    onChange={(value) =>
                        setSelectoptions({
                            ...selectOptions,
                            chartType: value as FormChartTypes
                        })
                    }
                    options={chartTypeOptions}
                />
            </React.Fragment>
        );
    }

    const getAttributesFormOptions = () => {
        const isSingle = isGroupedChart() || isPieChart();
        return (
            <React.Fragment>
                <span>{isSingle ? 'Attribute' : 'Attribues'}</span>
                <CustomSelect
                    selected={selectOptions.attributes}
                    onChange={(value) =>
                        setSelectoptions({
                            ...selectOptions,
                            attributes: Array.isArray(value) ? value : [value]
                        })
                    }
                    options={options.attributes}
                    isSingle={isSingle}
                />
            </React.Fragment>
        )
    }

    const getGroupByFormOptions = () => {
        const viewByOptions = [
            { key: '-', value: 'None' },
            ...options.group_by
        ];

        if (!grouppedByTime() && selectOptions.viewBy !== '-') {
            setSelectoptions({
                ...selectOptions,
                viewBy: '-'
            });
        }

        return (
            <React.Fragment>
                <span>Group by</span>
                <CustomSelect
                    selected={selectOptions.viewBy}
                    onChange={(value) =>
                        setSelectoptions({
                            ...selectOptions,
                            viewBy: value as string
                        })
                    }
                    options={viewByOptions}
                    disabled={!grouppedByTime()}
                />
            </React.Fragment>
        )
    }

    const getLabelNameFormOptions = () => {
        return selectOptions.chartType !== FormChartTypes.pie && (
            <React.Fragment>
                <span>X axis label</span>
                <TextInput
                    value={selectOptions.xAxisLabel}
                    type='text'
                    onChange={(value) =>
                        setSelectoptions({
                            ...selectOptions,
                            xAxisLabel: value
                        })
                    }
                    aria-label={'X axis label'}
                />
                <span>Y axis label</span>
                <TextInput
                    value={selectOptions.yAxisLabel}
                    type='text'
                    onChange={(value) =>
                        setSelectoptions({
                            ...selectOptions,
                            yAxisLabel: value
                        })
                    }
                    aria-label={'Y axis label'}
                />
            </React.Fragment>
        )
    }

    const getViewByFormOptions = () => {
        const xAxisOptions = [
            { key: 'time', value: 'Time' },
            ...options.group_by
        ];

        const title = isPieChart
            ? 'View by'
            : 'View by (x-axis)';

        return (
            <React.Fragment>
                <span>{title}</span>
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
            </React.Fragment>
        )
    }

    const getSourcesFormOptions = () => (
        <React.Fragment>
            <span>Sources</span>
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
        </React.Fragment>
    );

    const getApiParamsFormOptions = () => (
        <React.Fragment>
            <Button onClick={() => alert('This will bring up more options')}>
                Edit API request Params
            </Button>
        </React.Fragment>
    );

    const form = () => (
        <React.Fragment>
            {getSourcesFormOptions()}
            {getApiParamsFormOptions()}
            {getViewByFormOptions()}
            {getGroupByFormOptions()}
            {getChartFormOptions()}
            {getAttributesFormOptions()}
            {getLabelNameFormOptions()}
            <Button onClick={() => applySettings()}>Apply Settings</Button>
        </React.Fragment>
    );

    return (
        <EditorDrawer
            form={Object.keys(options).length > 0 && form()}
            chart={
                <ChartRenderer
                    data={{
                        charts: schema,
                        functions
                    }}
                    ids={[id]}
                />
            }
        />
    );
};

export default ChartEditor;
