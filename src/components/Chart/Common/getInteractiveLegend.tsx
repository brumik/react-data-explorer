import {
    getInteractiveLegendEvents,
    getInteractiveLegendItemStyles,
    ChartLegend
} from '@patternfly/react-charts';
import React from 'react';
import { ChartApiData, ChartTopSchemaElement } from '../types';

interface ReturnType {
    events: any,
    legendComponent: React.ReactElement<typeof ChartLegend>
}

export const getInteractiveLegend = (
    element: ChartTopSchemaElement,
    data: ChartApiData,
    setData: (data: ChartApiData) => void
): ReturnType => {
    const handleLegendClick = ({ index }: { index: number }) => {
        // Don't allow hiding ALL the series
        const hiddenCount = data.data.filter(({ hidden }) => hidden).length;
        if (
            !data.data[index].hidden &&
            data.data.length === hiddenCount + 1
        ) {
            return;
        }

        // Set the charts data in it too
        const tempData = [...data.data];
        tempData[index].hidden = !tempData[index].hidden;
        setData({
            ...data,
            data: tempData
        })
    };

    const isHidden = (idx: number) =>
        data.data[idx].hidden

    const getNames = (): [string | string[]] => [
        data.data.map(({ name }) => name)
    ];

    const getEvents = () => getInteractiveLegendEvents({
        chartNames: getNames(),
        isHidden,
        legendName: `legend-${element.id}`,
        onLegendClick: handleLegendClick
    });

    let r = {
        events: getEvents(),
        legendComponent: null
    } as ReturnType;

    if (element.legend && data.legend) {
        r = {
            ...r,
            legendComponent: <ChartLegend
                name={`legend-${element.id}`}
                data={data.legend.map((el, index) => ({
                    ...el,
                    ...getInteractiveLegendItemStyles(isHidden(index))
                }))}
            />
        };
    }

    return r;
};