import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store';
import { Provider, } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
const store = createStore(rootReducer, applyMiddleware(thunk ,logger));

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
)