import React, {useState, useMemo} from 'react'

import {Router, Route, Switch } from "react-router-dom";
import Header from "../layouts/Header";
import Home from "../layouts/Home";
import New from "../layouts/New";
import Track from "../layouts/Track";
import Goal from "../components/Goal";
import {GoalContext} from "../context/GoalContext"
import history from "../history";

export default function AppRouter() {
    const [goals, setGoals] = useState(null);
    const providerValue = useMemo(() => ({goals, setGoals}), [goals, setGoals]);
    return (
        <Router history={history}>
        <div>
          <Header />
          <div style={{ padding: "0 15%" }}>
            <Switch>
            <GoalContext.Provider value={providerValue}>
              <Route path="/" exact component={Home} />
              <Route path="/habits/new" exact component={New} />
              <Route path="/habits/track" exact component={Track} />
              <Route path="/goal/:id" exact component={Goal}/>
            </GoalContext.Provider>
            </Switch>
          </div>
        </div>
      </Router>
    )
}
