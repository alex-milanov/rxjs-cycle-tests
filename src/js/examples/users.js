
import Rx from 'rx';

import { button, br, a, h1, table, tr, td, th, tbody, thead, div } from '@cycle/dom';

let usersApp = (sources) => {
  const USERS_URL = 'http://jsonplaceholder.typicode.com/users';

  // fetchUsers(dom) -> usersRequest(http) -> usersResponse(http) -> displayUsers(dom)
  let fetchUsers$ = sources.DOM.select('#fetch-users').events('click');
  let usersRequest$ = fetchUsers$.map(()=>({ url: USERS_URL }));
  let usersResponse$ = sources.HTTP.filter((r$) => r$.request.url === USERS_URL).switch();
  let displayUsers$ = usersResponse$.map((res) => res.body).startWith(null);

  let fieldsList = ['name','email','website'];

  return {
    DOM: displayUsers$.map( (users) =>
      div('.container',[
        br(),
        button('.btn#fetch-users', 'Fetch users'),
        table('.table', [
          thead(
            tr( fieldsList.map(field =>
              th( field )
            ))
          ),
          tbody(
            (!users) ? '' : users.map( user =>
              tr( fieldsList.map(field =>
                td( user[field] )
              ))
            )
          )
        ])
      ])
    ),
    HTTP: usersRequest$
  }
}

export default usersApp;
