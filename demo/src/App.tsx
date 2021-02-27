import '@patternfly/react-core/dist/styles/base.css';
import * as React from 'react';
import DataExplorer, { ChartKind, ChartElement, ChartType, LegendType } from '../../src/';

// const legend = (ori = 'horizontal') => ({
//     x: 0,
//     y: 0,
//     title: 'Legend',
//     gutter: 20,
//     orientation: ori,
//     data: [
//         { name: 'Chart 1' },
//         { name: 'Chart 2' },
//         { name: 'Chart 3' },
//         { name: 'Chart 4' },
//     ],
//     style: {
//         border: { stroke: "black" },
//         title: { fontSize: 10 },
//         labels: { fontSize: 7 },
//     },
//     centerTitle: true
// }) as VictoryLegendProps;

const schema: ChartElement[] = [
    // Cluster page bar chart
    {
        id: 1000,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            height: 220,
            domainPadding: 20
        },
        xAxis: {
            label: 'Date',
            tickFormat: 'formatDateAsDayMonth'
        },
        yAxis: {
            label: 'Jobs across all clusters'
        }
    },
    {
        id: 1100,
        kind: ChartKind.stack,
        parent: 1000,
        props: {},
        api: {
            params: {
                status: ['successful', 'failed'],
                quick_date_range: 'last_30_days',
                job_type: ['workflowjob', 'job'],
                group_by_time: true,
                org_id: [],
                cluster_id: [],
                template_id: [],
                only_root_workflows_and_standalone_jobs: false,
                attributes: ['failed_count', 'successful_count']
            },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        }
    },
    {
        id: 1002,
        kind: ChartKind.simple,
        type: ChartType.bar,
        parent: 1100,
        props: {
            x: 'created_date',
            y: 'failed_count',
            style: {
                data: {
                    fill: '#A30000'
                }
            },
            labels: ({ datum }: { datum: Record<string, string> }) => datum.failed_count
        },
        legend: {
            type: LegendType.default,
            props: {}
        }
    },
    {
        id: 1001,
        kind: ChartKind.simple,
        type: ChartType.bar,
        parent: 1100,
        props: {
            x: 'created_date',
            y: 'successful_count',
            style: {
                data: {
                    fill: '#6EC664'
                }
            },
            labels: ({ datum }: { datum: Record<string, string> }) => datum.successful_count
        },
        legend: {
            type: LegendType.default,
            props: {}
        }
    }

    // Line example
    // {
    //     id: 1,
    //     kind: ChartKind.wrapper,
    //     parent: null,
    //     props: {
    //         height: 200
    //     },
    //     xAxis: {
    //         label: 'Days in the month',
    //         tickFormat: 'formatDateAsDays'
    //     },
    //     yAxis: {
    //         label: 'Host Count',
    //         tickFormat: 'formatNumberAsK'
    //     }
    // },
    // {
    //     id: 2,
    //     kind: ChartKind.simple,
    //     parent: 1,
    //     props: {
    //         x: 'created_date',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.bar,
    // },
    // // Pie example
    // {
    //     id: 3,
    //     kind: ChartKind.wrapper,
    //     parent: null,
    //     props: {
    //         height: 200,
    //     },
    //     xAxis: {},
    //     yAxis: {},
    //     hidden: true,
    //     legend: legend('vertical')
    // },
    // {
    //     id: 4,
    //     kind: ChartKind.simple,
    //     parent: 3,
    //     props: {
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
    // // Grouped example
    // {
    //     id: 5,
    //     kind: ChartKind.wrapper,
    //     parent: null,
    //     props: {
    //         height: 200,
    //     },
    //     xAxis: {
    //         label: 'Days in the month'
    //     },
    //     yAxis: {
    //         label: 'Host Count'
    //     },
    //     hidden: false
    // },
    // {
    //     id: 6,
    //     kind: ChartKind.group,
    //     parent: 5,
    //     props: {
    //         offset: 3
    //     }
    // },
    // {
    //     id: 7,
    //     kind: ChartKind.simple,
    //     parent: 6,
    //     props: {
    //         x: 'created_date',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.bar,
    // },
    // {
    //     id: 8,
    //     kind: ChartKind.simple,
    //     parent: 6,
    //     props: {
    //         x: 'created_date',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.bar,
    // },
    // // Stacked example
    // {
    //     id: 10,
    //     kind: ChartKind.wrapper,
    //     parent: null,
    //     props: {
    //         height: 200,
    //     },
    //     xAxis: {
    //         label: 'Days in the month'
    //     },
    //     yAxis: {
    //         label: 'Host Count'
    //     },
    //     hidden: false
    // },
    // {
    //     id: 11,
    //     kind: ChartKind.stack,
    //     parent: 10,
    //     props: {}
    // },
    // {
    //     id: 12,
    //     kind: ChartKind.simple,
    //     parent: 11,
    //     props: {
    //         x: 'created_date',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.area,
    // },
    // {
    //     id: 13,
    //     kind: ChartKind.simple,
    //     parent: 11,
    //     props: {
    //         x: 'created_date',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.area,
    // },
    // // Stacked and grouped example
    // {
    //     id: 100,
    //     kind: ChartKind.wrapper,
    //     parent: null,
    //     props: {
    //         height: 200,
    //     },
    //     xAxis: {
    //         label: 'Days in the month'
    //     },
    //     yAxis: {
    //         label: 'Host Count'
    //     },
    //     hidden: false,
    //     legend: legend()
    // },
    // {
    //     id: 101,
    //     kind: ChartKind.group,
    //     parent: 100,
    //     props: {
    //         offset: 5
    //     }
    // },
    // {
    //     id: 111,
    //     kind: ChartKind.stack,
    //     parent: 101,
    //     props: {}
    // },
    // {
    //     id: 112,
    //     kind: ChartKind.simple,
    //     parent: 111,
    //     props: {
    //         x: 'created_date',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.bar,
    // },
    // {
    //     id: 113,
    //     kind: ChartKind.simple,
    //     parent: 111,
    //     props: {
    //         x: 'created_date',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.bar,
    // },
    // {
    //     id: 211,
    //     kind: ChartKind.stack,
    //     parent: 101,
    //     props: {}
    // },
    // {
    //     id: 212,
    //     kind: ChartKind.simple,
    //     parent: 211,
    //     props: {
    //         x: 'created_date',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.bar,
    // },
    // {
    //     id: 213,
    //     kind: ChartKind.simple,
    //     parent: 211,
    //     props: {
    //         x: 'created_date',
    //         y: 'host_count'
    //     },
    //     api: {
    //         params: { 'group_by_time': 'true' },
    //         url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
    //         optionUrl: '/demo/api/jobExplorerOptions.json'
    //     },
    //     type: ChartType.bar,
    // },
];

const App: React.FunctionComponent<Record<string, never>> = () => {
    const logger = (json: ChartElement[]) => {
        // eslint-disable-next-line no-console
        console.debug(json);
    }

    return (
        <div style={{ width: '1100px', margin: 'auto', fontSize: 10 }}>
            <DataExplorer
                schema={schema}
                onSchemaChange={logger}
            />
        </div>
    );
};

export default App;
