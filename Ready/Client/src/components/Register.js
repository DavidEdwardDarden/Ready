import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { register } from "../modules/authManager";
import {GetAllQuestionsByFirebaseUserId, addQuestion} from "../modules/quizManager";
import "firebase/auth";
import firebase from "firebase/app";
// import "../Home.css";

export default function Register() {
  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // const [questionList, setQuestionList] = useState([]);




//  //!  SET STATE ---------------------------------------
//  useEffect(() => {
//   getQList();
//   addCoreQuestions();
// }, []);



// //!  QUESTION ARRAY  ---------------------------------------
// const getQList = () => {
//   GetAllQuestionsByFirebaseUserId("34p6LLy3cYbugAO2sf5pCRcw12r1").then(
//     (results) => {
//       setQuestionList(results);
//     }
//   );
// };

// //! ASSIGN CORE QUESTIONS --------------------------------------
// const addCoreQuestions = () => {
//   questionList.map(question =>addQuestion(question))
// }

// //!--------------------------------------------------------------



  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
  };

  return (
    <div className="container-registration">
      <Form onSubmit={registerClick}>
        <fieldset>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Register</Button>
          </FormGroup>
          <em>
            Return to Login? <Link to="login">Login</Link>
          </em>
        </fieldset>
      </Form>
    </div>
  );
}
