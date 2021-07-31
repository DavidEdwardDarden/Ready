import { React, useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { deleteQuestion, GetAllQuestionsByFirebaseUserId } from "../../modules/quizManager";
import { useHistory } from "react-router";
import "firebase/auth";
import firebase from "firebase/app";
import "../Home.css";


export const Question = ({  question, deletefunction}) => {
  const [questionList, setQuestionList] = useState([]);

  const history = useHistory()

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
 
  getQList();

}, []);

    

    // //!  click ->  DELETE BUTTON ---------------------------------------
    // const handledeletequestion = (evt) => {
    //     evt.preventDefault() 
    //     var result = window.confirm(`Are you sure you want to delete this question?`);
    //     if (result) {
    //         deleteQuestion(question.id).then(getQList)
            
    //     }
    // }

  return (
   

<Card>
<CardBody className="centermyquestions">



              <div  key={question.id * Math.random() + Math.random}>
                {" "}
                <div>{question?.questionContent}</div>{" "}
              </div>
       

{/* <label style={{width: "10em"}}>{category.name} </label> */}
<button className="centermyquestionsE" onClick={()=> history.push(`/question/edit/${question.id}`)} style={{width: "5em",marginLeft:".5rem"}}>Edit</button>
<button className="centermyquestionsD" onClick={()=>deletefunction(question.id)} style={{width: "5em",marginLeft:".5rem"}}>Delete</button>
   
</CardBody>
</Card>
  );
};
//when you are exporting a single thing do this:
// export default Category; <--- at the very bottom of the page
//otherwise export up top