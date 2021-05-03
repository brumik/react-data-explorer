import React from 'react'
import fetchMock from 'fetch-mock-jest';
import { render, waitFor } from '@testing-library/react';
import DataExplorer from '../components/DataExplorer';
import {
    ChartSchemaElement,
    ChartKind,
    ChartTopLevelType,
    functions,
    ChartType
} from '../index';
import { stackedChartResponse } from './assets/fetchResponses';

const charts: ChartSchemaElement[] = [
    {
        id: 1000,
        kind: ChartKind.wrapper,
        type: ChartTopLevelType.chart,
        parent: null,
        props: {
            height: 300
        },
        xAxis: {
            label: 'Date',
        },
        yAxis: {
            label: 'Jobs across all clusters'
        },
        api: {
            params: {},
            url: 'http://chart1.url'
        }
    },
    {
        id: 1001,
        kind: ChartKind.simple,
        type: ChartType.line,
        parent: 1000,
        props: {
            x: 'created_date',
            y: 'success_count'
        }
    }
];

describe('Data Explorer', () => {
    test('should render empty DataExplorer', async () => {
        const { container } = render(<DataExplorer
            apis={[]}
            schema={[]}
            onSchemaChange={() => ({})}
            functions={functions}
        />)
        await waitFor(() => container.querySelector('svg'));
        expect(container).toMatchSnapshot();
    });

    test('should render pie chart in DataExplorer', async () => {
        fetchMock.post({ url: 'http://chart1.url' }, stackedChartResponse);
        const { container } = render(<DataExplorer
            apis={[]}
            schema={charts}
            onSchemaChange={() => ({})}
            functions={functions}
        />);
        await waitFor(() => container.querySelector('svg'));

        expect(container).toMatchSnapshot()
    });

    xtest('should render toggle button', () => { });
    xtest('should open editor when clicked on the toogle button', () => { });
    xtest('should open close editor when clicked on the toggle button', () => {});
});
