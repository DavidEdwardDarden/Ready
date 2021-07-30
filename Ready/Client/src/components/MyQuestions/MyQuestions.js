import { React, useEffect, useState } from "react";
// import { getSubscribedPosts } from "../modules/subscriptManager.js";
// import  Post from "./posts/PostListCard.js"
// import thing from "./images/ReadyLogo.jpg";
import thing from "../images/ReadyLogo.jpg";
import thing2 from "../images/crown.png";
import thing3 from "../images/pattern2.png";
import "../Home.css";
// import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import { useHistory, useParams } from "react-router-dom";
import { getAllQuestionsByCategoryId } from "../../modules/quizManager";
import { GetAllQuestionsByFirebaseUserId } from "../../modules/quizManager";
import "firebase/auth";
import firebase from "firebase/app";

const MyQuestions = () => {
  //   const { CategoryId } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  //   const [FirebaseUserId, setFirebaseUserId] = useState("");

  //!  QUESTION ARRAY  ---------------------------------------
  // useEffect(() => {

  //       setFirebaseUserId(firebase.auth().currentUser.uid)

  //   }, [])

  const getQList = () => {
    // setIsLoading(true);
    // setFirebaseUserId(firebase.auth().currentUser.uid)

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
            <section key={question.id}>
              <div className="centermyquestions">
                {" "}
                <div>{question?.questionContent}</div>{" "}
              </div>
            </section>

            <button onClick={handleClickEvent} className="centermyquestions">
              Delete
            </button>
          </div>
        ))}

        <button onClick={handleClickEvent} className="centermeexitbutton">
          Exit
        </button>
      </div>
    </>
  );
};

export default MyQuestions;
