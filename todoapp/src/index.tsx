import './styles/index.scss';

import * as serviceWorker from './serviceWorker';

import App from './App';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <App />
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
