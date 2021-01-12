import React, { FunctionComponent } from 'react';
import { TextInput } from '@patternfly/react-core';
import { useDispatch } from 'react-redux';
import {
    ChartKind,
    ChartWrapper
} from '../Chart/types';
import { useTypedSelector } from '../../store/';
import { updateWrapper } from '../../store/charts/actions';
import ChartEditor from './ChartEditor';

interface Props {
    wrapperId: number
}

const WrapperEditor: FunctionComponent<Props> = ({ wrapperId }) => {
    const dispatch = useDispatch();

    const wrapper = useTypedSelector(store => store.charts.find(
        ({ id, kind }) => id === wrapperId && kind === ChartKind.wrapper
    ) as ChartWrapper);

    return (
        <React.Fragment>
            <span>Label X:</span>
            <TextInput
                style={{ width: '20%' }}
                value={wrapper.xAxis.label}
                type="text"
                onChange={(value) => {
                    dispatch(updateWrapper({
                        ...wrapper,
                        xAxis: {
                            ...wrapper.xAxis,
                            label: value
                        }
                    }))
                }}
                aria-label="Chart x label"
            />
            <span>Label Y:</span>
            <TextInput
                style={{ width: '20%' }}
                value={wrapper.yAxis.label}
                type="text"
                onChange={(value) => {
                    dispatch(updateWrapper({
                        ...wrapper,
                        yAxis: {
                            ...wrapper.yAxis,
                            label: value
                        }
                    }))
                }}
                aria-label="Chart x label"
            />
            <span>Height:</span>
            <TextInput
                style={{ width: '20%' }}
                value={wrapper.props.height}
                type="number"
                min={150}
                max={500}
                onChange={(value) => {
                    dispatch(updateWrapper({
                        ...wrapper,
                        props: {
                            ...wrapper.props,
                            height: parseInt(value, 10) || 150
                        }
                    }))
                }}
                aria-label="Chart x label"
            />
            <h3>Chart options</h3>
            { wrapper.children.map(id =>
                <ChartEditor key={id} chartId={id} />
            )}
        </React.Fragment>
    );
};

export default WrapperEditor;
