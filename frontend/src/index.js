import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import 'regenerator-runtime/runtime';
import validate from 'validate.js';
import { BrowserRouter as Router } from 'react-router-dom';

/*
App - в нем храниться все другие элементы и от него мы танцуем 
*/


import App from './App';
// Validate.js предоставляет декларативный способ проверки объектов javascript.
validate.options = { fullMessages: false };

ReactDOM.render(<Router><App /></Router>, document.getElementById('mount-point'));
