import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import Header from "../layouts/Header";
import Home from "../layouts/Home";
import New from "../layouts/New"
import Track from "../layouts/Track"

import history from "../history";

const App = () => {
    return (
    <div className="">
      <Router history={history}>
        <div>
          <Header />
          <div style={{padding: "0 15%"}}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/habits/new" exact component={New} />
            <Route path="/habits/track" exact component={Track} />
          </Switch>
          </div>
        </div>
      </Router>
    </div>
    );
}

export default App;
