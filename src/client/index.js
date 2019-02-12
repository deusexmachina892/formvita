import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './main.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers/store';

import App from './App';

const appModule =  <Provider  store={store}><App /></Provider>

render(
    appModule,
    document.querySelector('#root')
)