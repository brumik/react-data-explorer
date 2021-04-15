import '@patternfly/react-core/dist/styles/base.css';
import * as React from 'react';
import /* DataExplorer, */ {
    ChartSchemaElement,
    // functions,
    // ChartRenderer,
    ChartEditor
} from '../../src/';
import { dashboard as schema } from './schema';

const App: React.FunctionComponent<Record<string, never>> = () => {
    const logger = (json: ChartSchemaElement[]) => {
        // eslint-disable-next-line no-console
        console.debug(json);
    }

    return (
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
            { /* <DataExplorer
                schema={schema}
                onSchemaChange={logger}
                functions={functions}
            /> */ }
            {/* <ChartRenderer
                data={{
                    charts: schema,
                    functions
                }}
            /> */}
            <ChartEditor
                schema={schema}
                id={1000}
                apis={[
                    {
                        url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
                        optionUrl: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer_options/',
                        params: {},
                        label: 'Job Explorer'
                    }
                ]}
                onSchemaChange={logger}
            />
        </div>
    );
};

export default App;
