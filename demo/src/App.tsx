import '@patternfly/react-core/dist/styles/base.css';
import * as React from 'react';
import DataExplorer, { ChartElement } from '../../src/';
import { dashboard as schema } from './schema';
import onClick from './onClickFunctions';

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
                functions={{ onClick }}
            />
        </div>
    );
};

export default App;
