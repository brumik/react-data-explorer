import React from 'react'
import { render } from '@testing-library/react';
import ErrorState from './Chart/Common/ErrorState';

describe('Foo', () => {
    test('should render ErrorState', () => {
        const { container } = render(<ErrorState />)
        expect(container).toMatchSnapshot()
    })
})
