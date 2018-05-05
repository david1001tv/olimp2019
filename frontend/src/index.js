import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import 'regenerator-runtime/runtime';
import validate from 'validate.js';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

validate.options = { fullMessages: false };

ReactDOM.render(<Router><App /></Router>, document.getElementById('mount-point'));
