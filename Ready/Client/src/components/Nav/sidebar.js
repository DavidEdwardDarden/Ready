/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { slide as Menu } from "react-burger-menu";
import firebase from "firebase/app";
import "firebase/auth";

export default props => {


const shutdoor = ()=>{
  firebase.auth().signOut()
}


  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" href="/">
        HOME
      </a>

      <a className="menu-item" href="/myquestions" >
        MY QUESTIONS
      </a>

      <a className="menu-item" href="/addquestions">
        ADD QUESTIONS
      </a>

      <a className="menu-item" href="/login" onClick={shutdoor}>
        LOGOUT
      </a>

    </Menu>
  );
};

// The anchor tag in HTML is used to navigate to different web pages using an href attribute. 
// This href attribute contains the URL or path to the destination page. It may be a relative 
// URL or an absolute URL. In React, relative URLs should always be handled by the link tag 
// provided by the React Router, and pure anchor tags should only be used for absolute paths. 
// You can also think of relative URLs as in-app navigation, for example navigating to a 
// particular route of the app and absolute paths as external links. The prevailing logic 
// behind rendering optional href can be conveniently extended to the < link> as well, and 
// in fact, any other JSX element or component.

//HERE I AM USING ANCHOR TAGS FOR ABSOLUTE PATHS
