import '@patternfly/react-core/dist/styles/base.css';
import * as React from 'react';
import DataExplorer, { ChartKind, ChartElementArray, ChartType } from '../../src/';

const schema: ChartElementArray = [
    {
        id: 1,
        kind: ChartKind.wrapper,
        parent: null as number,
        children: [2],
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
        apiParams: [],
        apiEndpoint: fetch('/demo/api/jobExplorer.json').then(r => r.json()),
        type: ChartType.line,
        x: 'created_date',
        y: 'host_count'
    },
    {
        id: 3,
        kind: ChartKind.wrapper,
        parent: null as number,
        children: [4],
        xAxis: {
            label: 'Days in the month'
        },
        yAxis: {
            label: 'Host Count'
        }
    },
    {
        id: 4,
        kind: ChartKind.group,
        parent: 3,
        children: [5, 6]
    },
    {
        id: 5,
        kind: ChartKind.simple,
        parent: 4,
        children: [],
        apiParams: [],
        apiEndpoint: fetch('/demo/api/jobExplorer.json').then(r => r.json()),
        type: ChartType.bar,
        x: 'created_date',
        y: 'host_count'
    },
    {
        id: 6,
        kind: ChartKind.simple,
        parent: 4,
        children: [],
        apiParams: [],
        apiEndpoint: fetch('/demo/api/jobExplorer.json').then(r => r.json()),
        type: ChartType.bar,
        x: 'created_date',
        y: 'host_count'
    }
];

const App = () => <DataExplorer schema={schema} />;

export default App;
