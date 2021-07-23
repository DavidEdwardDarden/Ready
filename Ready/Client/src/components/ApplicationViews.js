import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        {/* <Route path="/posts/MyPosts" exact>
          <MyPosts />
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/create" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/edit/:id" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userprofile" exact>
        {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
        </Route>
         
        <Route path="/userprofile/:id" exact>
        {isLoggedIn ? <UserCard /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userprofile/edit/:id">
          {isLoggedIn ? <UserProfileForm /> : <Redirect to="/login" />}
        </Route>
          
        <Route path="/posts/tag/:id" exact>
            {isLoggedIn ? <PostTagList /> : <Redirect to="/login" />}
        </Route> */}

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
