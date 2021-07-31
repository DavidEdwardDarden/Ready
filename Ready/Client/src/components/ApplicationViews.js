import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import "./Nav/sidebar.css";
import SideBar from "./Nav/sidebar";
import Quiz from "./Quiz/Quiz"
import Victory from "./Quiz/Victory"
import MyQuestions from "./MyQuestions/MyQuestions"
import EditQuestion from "./EditQuestion/EditQuestion"
import AddQuestions from "./AddQuestions/AddQuestions"

export default function ApplicationViews({ isLoggedIn }) {
  // console.log(isLoggedIn)
  return (
    <main>
      <Switch>

        
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
          {isLoggedIn ?<SideBar /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/Quiz/:CategoryId(\d+)/:FirebaseUserProfileId" > 
       {isLoggedIn ? <Quiz /> : <Redirect to="/login" />}
       {isLoggedIn ?<SideBar /> : <Redirect to="/login" />}
     </Route>

     <Route exact path="/Victory" >
       {isLoggedIn ? <Victory /> : <Redirect to="/login" />}
       {isLoggedIn ?<SideBar /> : <Redirect to="/login" />}
     </Route>

     <Route exact path="/myquestions" >
       {isLoggedIn ? <MyQuestions /> : <Redirect to="/login" />}
       {isLoggedIn ?<SideBar /> : <Redirect to="/login" />}
     </Route>

     <Route exact path="/addquestions" >
       {isLoggedIn ? <AddQuestions /> : <Redirect to="/login" />}
       {isLoggedIn ?<SideBar /> : <Redirect to="/login" />}
     </Route>

     {/* `/question/edit/${question.id}` */}
     <Route exact path="/question/edit/:Id(\d+)" >
       {isLoggedIn ? <EditQuestion /> : <Redirect to="/login" />}
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
