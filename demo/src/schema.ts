import {
    ChartKind,
    ChartElement,
    ChartType,
    TooltipType,
    LegendProps
} from '../../src/';

const legend = (ori = 'horizontal') => ({
    data: [
        { name: 'Chart 1' },
        { name: 'Chart 2' },
        { name: 'Chart 3' },
        { name: 'Chart 4' }
    ],
    orientation: ori,
    position: ori === 'horizontal' ? 'bottom' : 'right'
}) as unknown as LegendProps;

export const dashboard: ChartElement[] = [
    // Cluster page bar chart
    {
        id: 1000,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            height: 300,
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
            }
        },
        legend: {
            type: TooltipType.default,
            props: {},
            labelAttr: 'failed_count',
            labelName: 'Failed'
        },
        onClick: 'consoleLog'
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
            }
        },
        legend: {
            type: TooltipType.default,
            props: {},
            labelAttr: 'successful_count'
        }
    },
    {
        id: 2000,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            height: 300
        },
        xAxis: {
            label: 'Date',
            tickFormat: 'formatDateAsDayMonth'
        },
        yAxis: {
            label: 'Job runs'
        },
        label: [
            {
                labelAttr: 'failed_count',
                labelName: 'Failed'
            },
            {
                labelAttr: 'successful_count'
            }
        ]
    },
    {
        id: 2100,
        kind: ChartKind.group,
        parent: 2000,
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
        id: 2002,
        kind: ChartKind.simple,
        type: ChartType.line,
        parent: 2100,
        props: {
            x: 'created_date',
            y: 'failed_count',
            style: {
                data: {
                    stroke: '#A30000'
                }
            }
        },
        onClick: 'consoleLog'
    },
    {
        id: 2001,
        kind: ChartKind.simple,
        type: ChartType.line,
        parent: 2100,
        props: {
            x: 'created_date',
            y: 'successful_count',
            style: {
                data: {
                    stroke: '#6EC664'
                }
            }
        },
    },
    {
        id: 3000,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            height: 300,
            domainPadding: 30
        },
        xAxis: {
            label: 'Date',
            tickFormat: 'formatDateAsDayMonth'
        },
        yAxis: {
            label: 'Jobs across organizations'
        },
    },
    {
        id: 3100,
        kind: ChartKind.group,
        parent: 3000,
        props: {
            offset: 11
        },
        api: {
            params: {
                status: [],
                org_id: [],
                quick_date_range: 'last_2_weeks',
                job_type: ['workflowjob', 'job'],
                cluster_id: [],
                template_id: [],
                start_date: null,
                end_date: null,
                attributes: ['total_count'],
                group_by_time: true,
                group_by: 'org',
                sort_by: `total_count:desc`
            },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/?limit=5',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        },
        template: {
            id: 0,
            kind: ChartKind.simple,
            type: ChartType.bar,
            parent: 0,
            props: {
                x: 'created_date',
                y: 'total_count'
            },
            legend: {
                type: TooltipType.default,
                props: {},
                labelAttr: 'total_count'
            }
        }
    }
];

export const showcase: ChartElement[] = [
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
            // tickFormat: 'formatDateAsDays'
        },
        yAxis: {
            label: 'Host Count',
            tickFormat: 'formatNumberAsK'
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
        type: ChartType.line
    },
    // Pie example
    // {
    //     id: 3,
    //     kind: ChartKind.wrapper,
    //     parent: null,
    //     props: {
    //         height: 500
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
    //     type: ChartType.pie
    // },
    // Grouped example
    {
        id: 5,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            domainPadding: 11,
            height: 200,
        },
        xAxis: {
            label: 'Days in the month'
        },
        yAxis: {
            label: 'Host Count',
            tickFormat: 'formatNumberAsK'
        },
        hidden: false
    },
    {
        id: 6,
        kind: ChartKind.group,
        parent: 5,
        props: {
            offset: 10
        },
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
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
        type: ChartType.bar
    },
    {
        id: 8,
        kind: ChartKind.simple,
        parent: 6,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        type: ChartType.bar
    },
    // Stacked example
    {
        id: 10,
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
        },
        hidden: false
    },
    {
        id: 11,
        kind: ChartKind.stack,
        parent: 10,
        props: {},
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
        }
    },
    {
        id: 12,
        kind: ChartKind.simple,
        parent: 11,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        type: ChartType.area
    },
    {
        id: 13,
        kind: ChartKind.simple,
        parent: 11,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        type: ChartType.area
    },
    // Stacked and grouped example
    {
        id: 100,
        kind: ChartKind.wrapper,
        parent: null,
        props: {
            domainPadding: 11,
            height: 200
        },
        xAxis: {
            label: 'Days in the month'
        },
        yAxis: {
            label: 'Host Count'
        },
        hidden: false,
        legend: legend()
    },
    {
        id: 101,
        kind: ChartKind.group,
        parent: 100,
        props: {},
        api: {
            params: { 'group_by_time': 'true' },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            optionUrl: '/demo/api/jobExplorerOptions.json'
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
        type: ChartType.bar
    },
    {
        id: 113,
        kind: ChartKind.simple,
        parent: 111,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        type: ChartType.bar
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
        type: ChartType.bar
    },
    {
        id: 213,
        kind: ChartKind.simple,
        parent: 211,
        props: {
            x: 'created_date',
            y: 'host_count'
        },
        type: ChartType.bar
    }
];
