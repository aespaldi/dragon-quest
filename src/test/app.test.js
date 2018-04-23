import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import App from '../App';
import reducers from '../reducers';

const createStoreWithMiddleware = createStore(
  reducers,
  compose(
    applyMiddleware(promise))
  )

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={createStoreWithMiddleware} >
        <App />
      </Provider>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
})
