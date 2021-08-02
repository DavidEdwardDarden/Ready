import { React, useEffect, useState } from "react";
import thing from "../images/ReadyLogo.jpg";
import thing2 from "../images/crown.png";
import thing3 from "../images/pattern2.png";
import "../Home.css";
import { useHistory } from "react-router-dom";
import {GetAllQuestionsByFirebaseUserId} from "../../modules/quizManager";
import "firebase/auth";
import firebase from "firebase/app";
import { Question } from "./MyQuestionCard";
import { deleteQuestion} from "../../modules/quizManager";

const MyQuestions = () => {
  const [questionList, setQuestionList] = useState([]);
  const [isLoading ,setIsLoading] = useState(false);
  const history = useHistory();

  //!  QUESTION ARRAY  ---------------------------------------
  const getQList = () => {
    GetAllQuestionsByFirebaseUserId(firebase.auth().currentUser.uid).then(
      (results) => {
        setQuestionList(results);
      }
    );
  };

  //!  SET STATE  ---------------------------------------
  useEffect(() => {
    //   setFirebaseUserId(firebase.auth().currentUser.uid)
    getQList();

    //   setIsLoading(true);
  }, []);

  //!  click ->  EXIT BUTTON ---------------------------------------
  const handleClickEvent = (e) => {
    e.preventDefault();
    setIsLoading(true);
    history.push(`/`);
  };

    //!  click ->  DELETE BUTTON ---------------------------------------
    const handledeletequestion = ( Id) => {
        // evt.preventDefault() 
        var result = window.confirm(`Are you sure you want to delete this question?`);
        if (result) {
            // console.log(result)
            deleteQuestion(Id).then(getQList)
            
        }
    }

  //!  SET STATE  ---------------------------------------
  useEffect(() => {
    //   setFirebaseUserId(firebase.auth().currentUser.uid)
    getQList();

    //   setIsLoading(true);
  }, []);

  //!  WELCOME TO THE DOM!  ---------------------------------------
  return (
    <>
      <div className="orange">
        <img src={thing2} className="centermequizcrown" alt="user img2" />
        <img src={thing} className="centermequiz" alt="user img" />
        <img src={thing3} className="centerme7" alt="user img3" />

        <div className="centermeqanda"> YOUR QUESTIONS: </div>

        {questionList.map((question) => (
          <div>
            {/* <section key={question.id * Math.random() + Math.random}>
              <div className="centermyquestions">
                {" "}
                <div>{question?.questionContent}</div>{" "}
              </div>
            </section> */}

            <Question question={question} deletefunction={handledeletequestion} key={question.id * Math.random()} />
          </div>
        ))}



        <button onClick={handleClickEvent} className="centermeexitbuttonx">
          Exit
        </button>
      </div>
    </>
  );
};

export default MyQuestions;
