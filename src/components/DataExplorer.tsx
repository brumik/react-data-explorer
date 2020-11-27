/**
 * This file will be the base component.
 * It will contain a ChartCreator form, save the JSON from it,
 * store the JSON and give the JSON to the Chart renderer to
 * render the charts itself.
 */
import React, { FunctionComponent, useState, useEffect } from 'react';
import { VictoryBar, VictoryChart } from 'victory';

const DataExplorer: FunctionComponent<{}> = () => {
    const [ isLoading, setIsLoading ] = useState(true);

    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];

    useEffect(() => {
        setTimeout(() => { setIsLoading(false); }, 3000);
    }, []);

    return (
        <>
            { isLoading && (<div>Loading</div>)}
            { !isLoading && (<div>Loaded</div>)}
            <VictoryChart>
                <VictoryBar
                    data={ data }
                    x='quarter'
                    y="earnings"
                />
            </VictoryChart>
        </>
    );
};

export default DataExplorer;
