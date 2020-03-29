import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NewIncident from "./components/NewIncident";

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path ="/" exact component={Login} />
                <Route path ="/register" component={Register} />
                <Route path ="/profile" component={Profile} />
                <Route path ="/incident/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
}

