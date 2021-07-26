import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import "./Nav/sidebar.css";
import SideBar from "./Nav/sidebar";
import Quiz from "./Quiz/Quiz"

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>

        
        <Route path="/" exact>
       
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
          {isLoggedIn ?<SideBar /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/Quiz/:CategoryId(\d+)" >
       
       {isLoggedIn ? <Quiz /> : <Redirect to="/login" />}
       {isLoggedIn ?<SideBar /> : <Redirect to="/login" />}
     </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
{/* 
        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/add">
          {isLoggedIn ? <AddNewCategory /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/edit/:id">
          {isLoggedIn ? <CategoryEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/:id" exact>
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/:id/add">
          {isLoggedIn ? <AddNewComment /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/edit/:id">
          {isLoggedIn ? <EditComment /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/add">
          {isLoggedIn ? <AddNewTag /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/edit/:id">
          {isLoggedIn ? <TagEditForm /> : <Redirect to="/login" />}
        </Route> */}
      </Switch>
    </main>
  );
}
