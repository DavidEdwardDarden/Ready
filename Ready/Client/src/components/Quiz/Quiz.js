import { React, useEffect, useState } from "react";
import thing from "../images/ReadyLogo.jpg";
import thing2 from "../images/crown.png";
import thing3 from "../images/pattern2.png";
import "../Home.css";
import { useHistory, useParams } from "react-router-dom";
import { getAllQuestionsByCategoryId } from "../../modules/quizManager";

const Quiz = () => {
  const { CategoryId } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  let [x, setX] = useState(0);
  const history = useHistory();

  //!  QUESTION ARRAY  ---------------------------------------
  const getQList = () => {
    getAllQuestionsByCategoryId(CategoryId).then((results) => {
      setQuestionList(results);

    });
  };

  //!  SET STATE  ---------------------------------------
  useEffect(() => {
    getQList();
  }, []);

  //!  click ->  EXIT BUTTON ---------------------------------------
  const handleClickEvent = (e) => {
    e.preventDefault();
    setIsLoading(true);
    history.push(`/`);
  };

  //!  click ->  GOT IT BUTTON ---------------------------------------
  const handleClickEventGotIt = (e) => {
    e.preventDefault();
    setIsLoading(true);

    //HERE I NEED TO CHANGED THE "LEARNED" VALUE
    //OF THIS SPECIFIC QUESTION FROM "0" TO "1"

    //    (HERE)

    //ask a new question
    handleQuestionClickEvent(e);
  };


//!  UPDATE FUNCTION (CALL INSIDE CLICK EVENTS)---------------------------------------
  const updateQuestion=() =>{
    setX(x+1)
    setShowAnswer(false)
  }


//!  click ->  NOT YET BUTTON ---------------------------------------
    const handleClickEventNotYet = (e) => {
//ALREADY ON QUESTION 1 BEFORE YOU CLICK THE QUESTION
let count=1;
count= count + 1;
if(count < questionList.count)
updateQuestion()

  };
  

//!  click ->  ON THE CARD  ---------------------------------------
  const handleQuestionClickEvent = (e) => {

    setShowAnswer(!showAnswer)
   
  };


  //!  WELCOME TO THE DOM!  ---------------------------------------
  return (
    <>
      <div className="orange">
        <img src={thing2} className="centermequizcrown" alt="user img2" />
        <img src={thing} className="centermequiz" alt="user img" />
        <img src={thing3} className="centerme7" alt="user img3" />

        <button onClick={handleClickEvent} className="centermeexitbutton">
          Exit
        </button>

        <button
          onClick={handleClickEventGotIt}
          className="centermebuttonproceed1"
        >
          GOT IT
        </button>

        <button
          onClick={handleClickEventNotYet}
          className="centermebuttonproceed2"
        >
          NOT YET
        </button>

        <section onClick={handleQuestionClickEvent} className="questioncard">
        
            <div> {!showAnswer &&<div>{questionList[x]?.questionContent}</div>} </div>
            <div> {showAnswer &&<div>{questionList[x]?.answerContent}</div>} </div>

        </section>
      </div>
    </>
  );
};

export default Quiz;
