import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
};

import usersApp from './examples/users.js';
import bmiCalcApp from './examples/bmi-calc.js';

Cycle.run(bmiCalcApp, drivers);
