import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import { rootReducer } from '../../src/';
const store = createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware)
);

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    document.getElementById('root')
);
