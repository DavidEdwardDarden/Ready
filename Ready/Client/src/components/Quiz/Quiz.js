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

const Quiz = () => {
  let y = -1;
  const { CategoryId } = useParams();
  const [question, setQuestion] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const getQList = () =>{

    // console.log("Look here")
    getAllQuestionsByCategoryId(CategoryId).then((results) => {
        setQuestionList(results)

        // console.log(results,"Look here")
  })}
  
  
  //The Effect Hook ("useEffect") lets you perform side effects in function components:
  //fetch list of all categories for dropdown
  useEffect(() => {
   getQList()
  }, []);

  const handleClickEvent = (e) => {
    e.preventDefault();
    setIsLoading(true);

    history.push(`/`);
  };

  const handleClickEventGotIt = (e) => {
    e.preventDefault();
    setIsLoading(true);

    //HERE I NEED TO CHANGED THE "LEARNED" VALUE
    //OF THIS SPECIFIC QUESTION FROM "0" TO "1"

    //    (HERE)

    //ask a new question
    handleQuestionClickEvent(e);
  };

  const handleClickEventNotYet = (e) => {
    e.preventDefault();
    setIsLoading(true);

    //ask a new question
    handleQuestionClickEvent(e);
  };

  const handleQuestionClickEvent = (e) => {
    e.preventDefault();
    setIsLoading(true);

    y++;

    return <div>`${questionList[y].AnswerContent}`</div>;
  };

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
          {/* functions are not valid as react children */}
          <div> {<div>{questionList[0]?.questionContent}</div>} </div>
        </section>
      </div>
    </>
  );
};

export default Quiz;
