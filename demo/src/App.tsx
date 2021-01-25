import '@patternfly/react-core/dist/styles/base.css';
import * as React from 'react';
import DataExplorer, { ChartKind, ChartElement, ChartType } from '../../src/';

const schema: ChartElement[] = [
    // Line example
    {
        id: 1,
        kind: ChartKind.wrapper,
        parent: null,
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
    // Pie example
    {
        id: 3,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            height: 200,
        },
        xAxis: {},
        yAxis: {},
        hidden: true
    },
    {
        id: 4,
        kind: ChartKind.simple,
        parent: 3,
        props: {
            x: '',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'false', 'limit': '5' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.pie,
    },
    // Grouped example
    {
        id: 5,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            height: 200,
        },
        xAxis: {
            label: 'Days in the month'
        },
        yAxis: {
            label: 'Host Count'
        },
        hidden: false
    },
    {
        id: 6,
        kind: ChartKind.group,
        parent: 5,
        props: {
            offset: 3
        }
    },
    {
        id: 7,
        kind: ChartKind.simple,
        parent: 6,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.bar,
    },
    {
        id: 8,
        kind: ChartKind.simple,
        parent: 6,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.bar,
    },
    // Stacked example
    {
        id: 10,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            height: 200,
        },
        xAxis: {
            label: 'Days in the month'
        },
        yAxis: {
            label: 'Host Count'
        },
        hidden: false
    },
    {
        id: 11,
        kind: ChartKind.stack,
        parent: 10,
        props: {}
    },
    {
        id: 12,
        kind: ChartKind.simple,
        parent: 11,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.bar,
    },
    {
        id: 13,
        kind: ChartKind.simple,
        parent: 11,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.bar,
    },
    // Stacked and grouped example
    {
        id: 100,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            height: 200,
        },
        xAxis: {
            label: 'Days in the month'
        },
        yAxis: {
            label: 'Host Count'
        },
        hidden: false
    },
    {
        id: 101,
        kind: ChartKind.group,
        parent: 100,
        props: {
            offset: 5
        }
    },
    {
        id: 111,
        kind: ChartKind.stack,
        parent: 101,
        props: {}
    },
    {
        id: 112,
        kind: ChartKind.simple,
        parent: 111,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.bar,
    },
    {
        id: 113,
        kind: ChartKind.simple,
        parent: 111,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.bar,
    },
    {
        id: 211,
        kind: ChartKind.stack,
        parent: 101,
        props: {}
    },
    {
        id: 212,
        kind: ChartKind.simple,
        parent: 211,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.bar,
    },
    {
        id: 213,
        kind: ChartKind.simple,
        parent: 211,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        type: ChartType.bar,
    },
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
