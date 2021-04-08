import {
    Select,
    SelectOption,
    SelectVariant
} from '@patternfly/react-core';
import React, {
    FunctionComponent, useState
} from 'react';

interface Props {
    selected: string | string[],
    onChange: (value: string | string[]) => void,
    options: {
        key: string,
        value: string | number | boolean
    }[],
    isSingle?: boolean
}

const CustomSelect: FunctionComponent<Props> = ({
    selected,
    onChange,
    options,
    isSingle = true
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleInArray = (arr: string[], item: string): string[] =>
        arr.includes(item)
            ? arr.filter(i => i !== item)
            : [...arr, item];

    return (
        <Select
            variant={isSingle ? SelectVariant.single : SelectVariant.checkbox}
            onToggle={() => setIsOpen(!isOpen)}
            onSelect={(_, selection) => {
                onChange(isSingle
                    ? selection as string
                    : toggleInArray(
                        selected as string[],
                        selection as string
                    ));

                // Close if it is a single select
                if (isSingle) {
                    setIsOpen(false)
                }
            }}
            selections={selected}
            isOpen={isOpen}
            direction={'down'}
        >
            {options?.map(({ key, value }) =>
                <SelectOption key={key} value={key}>{value}</SelectOption>
            )}
        </Select>
    )
};

export default CustomSelect;