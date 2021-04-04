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

interface Props {
    form: React.ReactNode,
    chart: React.ReactNode
}

const EditorDrawer: FunctionComponent<Props> = ({
    form,
    chart
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const panelContent = (
        <DrawerPanelContent>
            <DrawerHead>
                { form }
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
                    <DrawerContent style={{ minHeight: 500 }} panelContent={panelContent}>
                        <DrawerContentBody>
                            { chart }
                        </DrawerContentBody>
                    </DrawerContent>
                </Drawer>
            </CardBody>
        </Card>
    );
};

export default EditorDrawer;
