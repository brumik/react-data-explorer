import React, { FunctionComponent } from 'react';
import { Card, CardTitle, CardBody } from '@patternfly/react-core';
import Select from './Select';
import { FormOption } from '../../types';

interface PropType {
    fields: FormOption[],
}

const Form: FunctionComponent<PropType> = ({ fields }) => {
    return (
        <Card>
            <CardTitle>Options</CardTitle>
            <CardBody>
                { fields.map((item, idx) => <Select key={idx} {...item} />) }
            </CardBody>
        </Card>
    );
};

export default Form;
