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


const Victory = () => {
  const { CategoryId } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  let [x, setX] = useState(0);
  const history = useHistory();

  //!  click ->  EXIT BUTTON ---------------------------------------
  const handleClickEvent = (e) => {
    e.preventDefault();
    setIsLoading(true);
    history.push(`/`);
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

    

        <section  className="questioncard">
        
            <div className="centermeqanda"> YOU ARE A VICTORIOUS! </div>
           

        </section>
      </div>
    </>
  );
};

export default Victory;
