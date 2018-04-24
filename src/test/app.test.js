import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import enzyme, { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import ConnectedApp from '../App';
import reducers from '../reducers';
import { App } from '../App';

enzyme.configure({ adapter: new Adapter() });

const createStoreWithMiddleware = createStore(
  reducers,
  compose(
    applyMiddleware(promise))
  );

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={createStoreWithMiddleware} >
        <ConnectedApp />
      </Provider>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
})

describe('App', () => {

  const wrapper = shallow(< App />);

  it('should be selectable by class "App"', () => {
    expect(wrapper.is('.App')).toBe(true);
  });

  
})
