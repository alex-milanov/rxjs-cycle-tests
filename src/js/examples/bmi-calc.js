
import Rx from 'rx';

import { button, div, label, input, h2 } from '@cycle/dom';

let bmiCalcApp = (sources) => {

  let weight$ = sources.DOM.select('.weight').events('input').map(ev => ev.target.value).startWith(70);
  let height$ = sources.DOM.select('.height').events('input').map(ev => ev.target.value).startWith(170);

  let state$ = Rx.Observable.combineLatest(
    weight$, height$, (weight, height) => ({
      weight,
      height,
      bmi: Math.round( weight / Math.pow(height * 0.01, 2))
    })
  )

  return {
    DOM: state$.map( state =>
      div([
        div([
          label(`Weight ${state.weight}kg`),
          input('.weight',{ type: 'range', min: 40, max: 150, value: state.weight})
        ]),
        div([
          label(`Height ${state.height}cm`),
          input('.height',{ type: 'range', min: 140, max: 220, value: state.height})
        ]),
        h2(`BMI is ${state.bmi}`)
      ])
    )
  };
}

export default bmiCalcApp;
