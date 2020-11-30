import React, { FunctionComponent, useState } from 'react';
import CSS from 'csstype';
import {
    Select,
    SelectOption,
    SelectVariant
} from '@patternfly/react-core';
import { FormOption } from '../../types'

const inStyle: CSS.Properties = {
    width: '25%',
    float: 'left'
};

const CustomSelect: FunctionComponent<FormOption> = ({
    value,
    setValue,
    options,
    placeholder,
    name
}) => {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div style={inStyle}>
            <Select
                variant={SelectVariant.single}
                placeholderText={placeholder}
                aria-label={name}
                onToggle={() => {
                    setIsOpen(!isOpen);
                }}
                onSelect={(_event, selection) => {
                    setValue(selection.toString());
                    setIsOpen(!isOpen);
                }}
                selections={value}
                isOpen={isOpen}
            >
                {
                    options && options.map(({ key, value: label, description }) =>
                        (<SelectOption
                            key={key}
                            value={key}
                            description={description || ''}
                        >
                            { label }
                        </SelectOption>)
                    )
                }
            </Select>
        </div>
    );
};

export default CustomSelect;
