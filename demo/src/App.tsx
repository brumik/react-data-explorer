import * as React from 'react';
import DataExplorer, {
    ChartSchemaElement,
    functions
} from '../../src/';
import { dashboard as schema } from './schema';

const App: React.FunctionComponent<Record<string, never>> = () => {
    const logger = (json: ChartSchemaElement[]) => {
        // eslint-disable-next-line no-console
        console.debug(json);
    }

    return (
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
            <DataExplorer
                apis={[
                    {
                        url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
                        optionUrl: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer_options/',
                        params: {},
                        label: 'Job Explorer'
                    }
                ]}
                schema={schema}
                functions={functions}
                onSchemaChange={logger}
            />
        </div>
    );
};

export default App;
