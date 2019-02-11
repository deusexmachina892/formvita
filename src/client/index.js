import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './main.css';
import { render } from 'react-dom';
import { Providers } from 'react-redux';

import App from './App';

const appModule =  <App />

render(
    appModule,
    document.querySelector('#root')
)