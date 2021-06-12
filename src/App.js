import React from "react";
import {Switch,Route} from 'react-router-dom';
import Home from "./Pages/Home";
import Starred from "./Pages/Starred";
import Show from "./Pages/show";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>

        <Route exact path='/starred'>
          <Starred/>
        </Route>

        <Route exact path='/show/:id'>
          <Show/>
        </Route>

        <Route>
          Not found
        </Route>

      </Switch>
    </div>
  )
}

export default App;
