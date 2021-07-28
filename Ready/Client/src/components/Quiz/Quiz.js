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


  const setUpQL=()=>{
    // let updatedQList = questionList.splice(x+1,1);
    let updatedQList = [];

    for(let i=0;i<questionList.length;i++){
     if(i!== x){
         updatedQList.push(questionList[i])
     }
     
    }

   setQuestionList(updatedQList);
}



  //!  click ->  GOT IT BUTTON ---------------------------------------
  const handleClickEventGotIt = (e) => {
    e.preventDefault();
    setIsLoading(true);


setUpQL();

    //ask a new question
    if(x+2 <=  questionList.length){
        updateQuestion2()
        }
        else{
            setX(0)
        }

        if(questionList.length-1===0){
            history.push(`/Victory`);
         }

  };


//!  UPDATE FUNCTION (CALL INSIDE CLICK EVENTS)---------------------------------------
  const updateQuestion=() =>{
    setX(x+1)
    setShowAnswer(false)
  }

  const updateQuestion2=() =>{
      setX(x)
    setShowAnswer(false)
  }


//!  click ->  NOT YET BUTTON ---------------------------------------
    const handleClickEventNotYet = (e) => {
//ALREADY ON QUESTION 1 BEFORE YOU CLICK THE QUESTION

if(x+2 <=  questionList.length){
updateQuestion()
}
else{
    setX(0)
}
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
        
            <div className="centermeqanda"> {!showAnswer &&<div>{questionList[x]?.questionContent}</div>} </div>
            <div className="centermeqanda"> {showAnswer &&<div>{questionList[x]?.answerContent}</div>} </div>

        </section>
      </div>
    </>
  );
};

export default Quiz;
