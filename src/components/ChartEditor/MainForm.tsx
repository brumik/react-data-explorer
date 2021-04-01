import React, {
    FunctionComponent
} from 'react';
import { ChartSchemaElement } from '../Chart/types';
import { FormApiProps } from './types';

interface Props {
    schema: ChartSchemaElement[],
    id: number,
    apis: FormApiProps[]
}

const MainForm: FunctionComponent<Props> = ({
    schema,
    id,
    apis
}) => {
    // eslint-disable-next-line no-console
    console.log(schema, id, apis);
    return (
        <span>
            <span>Source: </span>
            {/* <Select
                        variant={'single'}
                        aria-label="Source"
                        onToggle={() => setIsSourceOpen(!isSourceOpen)}
                        onSelect={(_, selection) => {
                            setSource(selection);
                            setIsSourceOpen(false);
                        }}
                        selections={source}
                        isOpen={isSourceOpen}
                        aria-labelledby={'foo'}
                        isDisabled={false}
                        direction={'down'}
                    >
                        {sources}
                    </Select>
                    <span>Chart type: </span>
                    <Select
                        variant={'single'}
                        aria-label="Source"
                        onToggle={() => setIsChartTypeOpen(!isChartTypeOpen)}
                        onSelect={(_, selection) => {
                            setChartType(selection);
                            setIsChartTypeOpen(false);
                        }}
                        selections={chartType}
                        isOpen={isChartTypeOpen}
                        aria-labelledby={'foo'}
                        isDisabled={false}
                        direction={'down'}
                    >
                        {chartTypes}
                    </Select>
                    <span>Group by: </span>
                    <Select
                        variant={'single'}
                        aria-label="Group-by"
                        onToggle={() => setIsGroupByOpen(!isGroupByOpen)}
                        onSelect={() => { }}
                        selections={null}
                        isOpen={isGroupByOpen}
                        aria-labelledby={'foo'}
                        isDisabled={false}
                        direction={'down'}
                    >
                        {groupBy}
                    </Select>
                    <span>Attributes</span>
                    <div style={{ maxHeight: '300px' }}>
                        {attributes.map(a => (
                            <Checkbox
                                label={a.key}
                                value={a.key}
                                isChecked={selectedAttrs.includes(a.key)}
                                onChange={handleAttrsChange}
                                aria-label={a.key}
                                id={a.key}
                                key={a.key}
                                name={a.key}
                            />
                        ))}
                    </div> */}
        </span>
    )
}

export default MainForm;