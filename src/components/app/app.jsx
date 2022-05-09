import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Main from "../main/main";
import Basket from "../basket/basket";
import NotPage from "../not-page/not-page";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/basket" component={Basket}/>
        <Route component={NotPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
