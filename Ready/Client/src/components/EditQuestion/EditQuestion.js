import { React, useState, useEffect} from "react";
// import thing from "../images/ReadyLogo.jpg";
import thing2 from "../images/crown.png";
import thing3 from "../images/pattern2.png";
import "../Home.css";
import { useHistory, useParams } from "react-router-dom";
import { Form, FormGroup, Button, Container } from "reactstrap";
import { getQuestionById } from "../../modules/quizManager";
import { editQuestion } from "../../modules/editQuestionManager";


const EditQuestion = () => {

  const [ IsLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState({});
//   const [qEdit, setqEdit] = useState("");
  const { Id } = useParams();

  const history = useHistory();


//! USER INPUT FIELDS
  const handleInputChange = (evt) => {
    const editedQuestion = { ...question };
    let selectedValue = evt.target.value
    editedQuestion[evt.target.id] = selectedValue
    setQuestion(editedQuestion)
};


//!  click ->  SAVE BUTTON ---------------------------------------
const handleSaveEvent = (evt) => {
    evt.preventDefault();
    if (question.QuestionContent === "" || question.AnswerContent === "") {
        window.alert("Please fill in all fields")
    } else {
        editQuestion(question)
            .then(() => history.push('/myquestions'));
    };
};


 //!  SET STATE ---------------------------------------
useEffect(() => {
  
    getQuestionById(Id).then(setQuestion)
   
}, [Id]);

  //!  click ->  EXIT BUTTON ---------------------------------------
  const handleClickEvent = (e) => {
    e.preventDefault();
    setIsLoading(true);
    history.push(`/`);
  };

  //! click ->  Cancel BUTTON ---------------------------------------
  const handleCancelSave = (click) => {
    click.preventDefault()
    history.push('/myquestions')
}


  //!  WELCOME TO THE DOM!  ---------------------------------------
  return (
    <>
      <div className="orange">
        <img src={thing2} className="centermequizcrown" alt="user img2" />
        {/* <img src={thing} className="centermequiz" alt="user img" /> */}
        <img src={thing3} className="centerme7" alt="user img3" />

        <button onClick={handleClickEvent} className="centermeexitbutton">
          Exit
        </button>
        {/* <div>{question.QuestionContent}</div> */}
        <Container className="justified-content-center">
            <Form>
            <FormGroup>
                    <label>Question</label>
                    {/* <div>{question.QuestionContent}</div> */}
                    {/* {console.log(question.questionContent)} */}
                    <input type="text"
                        id="questionContent"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={question.questionContent} />
                </FormGroup>
                <FormGroup>
                    <label>Answer</label>
                    <input type="text"
                        id="answerContent"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={question.answerContent} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                onClick={handleSaveEvent}>
                Save Entry
            </Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>
                Cancel
            </Button>
        </Container>
      </div>
    </>
  );
};

export default EditQuestion;
