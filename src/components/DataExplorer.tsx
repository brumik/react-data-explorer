import React, {
    FunctionComponent,
    useEffect,
    useState
} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardTitle
} from '@patternfly/react-core';
import {
    FormApiProps,
    ChartFunctions,
    ChartSchemaElement,
    ChartEditor,
    ChartRenderer
} from '../';

interface Props {
    apis: FormApiProps[],
    schema: ChartSchemaElement[],
    functions: ChartFunctions,
    onSchemaChange?: (schema: ChartSchemaElement[]) => void
}

const DataExplorer: FunctionComponent<Props> = ({
    apis,
    schema: defaultSchema,
    functions,
    onSchemaChange = (d) => {
        /* eslint-disable-next-line */
        console.log(JSON.stringify(d));
    }
}) => {
    const [editorOpen, setEditorOpen] = useState(false);
    const [schema, setSchema] = useState(defaultSchema);
    const [temp, setTemp] = useState([] as ChartSchemaElement[]);

    useEffect(() => {
        if (!editorOpen) {
            setSchema([
                ...schema,
                ...temp
            ] as ChartSchemaElement[]);
            setTemp([]);
        }
    }, [editorOpen]);

    useEffect(() => {
        onSchemaChange(schema);
    }, [schema])

    return (
        <Card>
            <CardTitle>Data Explorer</CardTitle>
            <CardBody>
                <Button onClick={() => {
                    setEditorOpen(!editorOpen)
                }}>
                    {editorOpen && <span>Save Chart</span>}
                    {!editorOpen && <span>Add new chart</span>}
                </Button>
                { editorOpen && (
                    <ChartEditor
                        schema={schema}
                        apis={apis}
                        onSchemaChange={(updated) => setTemp(updated)}
                    />
                )}
                { !editorOpen && (
                    <ChartRenderer
                        data={{
                            charts: schema,
                            functions
                        }}
                    />
                )}
            </CardBody>
        </Card>
    );
};

export default DataExplorer;
