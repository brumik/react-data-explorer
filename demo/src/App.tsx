import '@patternfly/react-core/dist/styles/base.css';
import * as React from 'react';
import DataExplorer, { ChartKind, ChartElement, ChartType } from '../../src/';

const schema: ChartElement[] = [
    {
        id: 1,
        kind: ChartKind.wrapper,
        parent: null,
        children: [2],
        props: {
            height: 200
        },
        xAxis: {
            label: 'Days in the month'
        },
        yAxis: {
            label: 'Host Count'
        }
    },
    {
        id: 2,
        kind: ChartKind.simple,
        parent: 1,
        children: [],
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.line,
    },
    // {
    //     id: 11,
    //     kind: ChartKind.simple,
    //     parent: null,
    //     children: [],
    //     props: {
    //         height: 200,
    //         x: '',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'false', 'limit': '5' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.pie,
    // },
    // {
    //     id: 3,
    //     kind: ChartKind.wrapper,
    //     parent: null as number,
    //     children: [4],
    //     xAxis: {
    //         label: 'Days in the month'
    //     },
    //     yAxis: {
    //         label: 'Host Count'
    //     }
    // },
    // {
    //     id: 4,
    //     kind: ChartKind.group,
    //     parent: 3,
    //     children: [5, 6]
    // },
    // {
    //     id: 5,
    //     kind: ChartKind.simple,
    //     parent: 4,
    //     children: [],
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     }
    //     type: ChartType.bar,
    //     x: 'created_date',
    //     y: 'host_count'
    // },
    // {
    //     id: 6,
    //     kind: ChartKind.simple,
    //     parent: 4,
    //     children: [],
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     }
    //     type: ChartType.bar,
    //     x: 'created_date',
    //     y: 'host_count'
    // }
];

const App = () => {
    const logger = (json: ChartElement[]) => {
        console.debug(json);
    }

    return <DataExplorer
        schema={schema}
        onSchemaChange={logger}
    />;
};

export default App;
