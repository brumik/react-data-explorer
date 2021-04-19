import React from 'react'
import fetchMock from 'fetch-mock-jest';
import { act, render } from '@testing-library/react';
import DataExplorer from '../components/DataExplorer';
import {
    ChartSchemaElement,
    ChartKind,
    ChartLegendOrientation,
    ChartLegendPosition,
    ChartTopLevelType,
    functions
} from '../index';

const pieChartResponse = {
    "items": [
        { "host_count": 4655, "total_count": 578, "id": 2, "name": "organization_0" },
        { "host_count": 96225, "total_count": 456, "id": -2, "name": "" },
        { "host_count": 2995, "total_count": 411, "id": 4, "name": "organization_3" },
        { "host_count": 2975, "total_count": 410, "id": 3, "name": "organization_1" },
        { "host_count": 2975, "total_count": 410, "id": 1, "name": "organization_2" },
        { "host_count": 70720, "id": -1, "name": "26 Others" }
    ]
};

const pieChartSchema: ChartSchemaElement[] = [
    {
        id: 4000,
        kind: ChartKind.wrapper,
        type: ChartTopLevelType.pie,
        parent: null,
        props: {
            height: 300,
            x: '',
            y: 'host_count'
        },
        api: {
            params: {
                group_by: 'org',
                include_others: true,
                attributes: ['host_count'],
                sort_by: `total_count:desc`
            },
            url: 'http://piechart.url',
            method: 'GET'
        },
        legend: {
            interactive: true,
            orientation: ChartLegendOrientation.vertical,
            position: ChartLegendPosition.right
        }
    }
];

describe('Data Explorer', () => {
    test('should render empty DataExplorer', () => {
        const { container } = render(<DataExplorer
            apis={[]}
            schema={[]}
            onSchemaChange={() => ({})}
            functions={functions}
        />)
        expect(container).toMatchSnapshot()
    });

    test('should render pie chart DataExplorer', async () => {
        fetchMock.get({ url: 'http://piechart.url' }, pieChartResponse);
        let container = null;
        await act(async () => {
            container = render(<DataExplorer
                apis={[]}
                schema={pieChartSchema}
                onSchemaChange={() => ({})}
                functions={functions}
            />).container;
        });

        expect(container).toMatchSnapshot()
    });
});
