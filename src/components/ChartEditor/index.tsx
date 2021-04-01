import React, {
    FunctionComponent,
    useState
} from 'react';
import {
    Button,
    Card,
    CardBody,
    Drawer,
    DrawerContent,
    DrawerContentBody,
    DrawerPanelContent,
    DrawerHead,
    DrawerActions,
    DrawerCloseButton
} from '@patternfly/react-core';
import { ChartSchemaElement } from '../Chart/types';
import ChartRenderer from '../Chart';
import { functions } from '../../index';
import MainForm from './MainForm';
import { FormApiProps } from './types';

interface Props {
    schema: ChartSchemaElement[],
    id: number,
    apis: FormApiProps[]
}

const ChartEditor: FunctionComponent<Props> = ({
    id,
    schema,
    apis
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const panelContent = (
        <DrawerPanelContent>
            <DrawerHead>
                <MainForm schema={schema} id={id} apis={apis} />
                <DrawerActions>
                    <DrawerCloseButton onClick={() => setIsExpanded(false)} />
                </DrawerActions>
            </DrawerHead>
        </DrawerPanelContent>
    );

    return (
        <Card>
            <CardBody>
                <Button aria-expanded={isExpanded} onClick={toggleExpand}>
                    Toggle Editor
                </Button>
                <Drawer isExpanded={isExpanded}>
                    <DrawerContent panelContent={panelContent}>
                        <DrawerContentBody>
                            <ChartRenderer
                                data={{
                                    charts: schema,
                                    functions
                                }}
                                ids={[id]}
                            />
                        </DrawerContentBody>
                    </DrawerContent>
                </Drawer>
            </CardBody>
        </Card>
    );
};

export default ChartEditor;
