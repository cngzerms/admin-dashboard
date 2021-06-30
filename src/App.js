import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Forgot from "./components/Forgot"
import Prophoto from "./components/Prophoto.js"
import Dashboard from "./components/Dashboard.js"
import Orders from "./components/Orders.js"
import Users from "./components/Users.js"
import Product from "./components/Product.js"
import Notification from "./components/Notification.js"
import Profile from "./components/Profile.js"
import Verification from "./components/Verification"
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Switch>
          <Route  path = "/" exact component = { Home }/>
          <Route  path = "/login" exact component = { Login } />
          <Route  path = "/forgot" exact component = { Forgot } />
          <Route  path = "/prophoto" exact component = { Prophoto } />
          <Route  path = "/dashboard" exact component = { Dashboard } />
          <Route  path = "/users" exact component = { Users } />
          <Route  path = "/orders" exact component = { Orders } />
          <Route  path = "/product" exact component = { Product } />
          <Route  path = "/notification" exact component = { Notification } />
          <Route  path = "/verification" exact component = { Verification } />
          <Route  path = "/profile" exact component = { Profile } />
        </Switch>
        </div>
      </Router>
    )
  }
}


export default App;
