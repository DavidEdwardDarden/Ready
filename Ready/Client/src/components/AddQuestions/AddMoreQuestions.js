import { React, useState, useEffect} from "react";
// import thing from "../images/ReadyLogo.jpg";
import thing2 from "../images/crown.png";
import thing3 from "../images/pattern2.png";
import "../Home.css";
import { useHistory, useParams } from "react-router-dom";
import { Form, FormGroup, Button, Container } from "reactstrap";
import { getQuestionById } from "../../modules/quizManager";
import { addQuestion } from "../../modules/quizManager";
import { getAllCategories } from '../../modules/categoryManager';
import "firebase/auth";
import firebase from "firebase/app"


const AddQuestions = () => {
    const [question, setQuestion] = useState({});
    const [category, setCategory] = useState("");
    const [ categoryList, setCategoryList ] = useState([]);
    const [ IsLoading, setIsLoading ] = useState(false);
    const [FirebaseUserProfileId, setFirebaseUserProfileId] = useState("");
    const [CategoryId, setCategoryId] = useState(0);
    // const [s,setS] = useState(0)

    const history = useHistory();

    //! HANDLE ALERT MESSAGE
const handleAlertMessage = () => {
    
    alert("Question Submitted..Add another question or Press Exit")
 
};

    //! CATEGORY        DROPDOWN SELECTION
    const handleDropdownChange = (e) => {
        e.preventDefault()
        let selectedVal = e.target.value;
        setCategory(selectedVal);
      };
      
      //! CATEGORY    DROPDOWN SELECTION (other part)
      const handleClickSaveEntry = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let newCategory = { ...category };
      //I just changed categoryId to CategoryId below
        newCategory.CategoryId = category;
        if (category === '') {
          alert("Please select a category")
        } 
      }
      
   


//-----------------------------------------------------------------------------
  
 
 


//! USER INPUT FIELDS
  const handleInputChange = (evt) => {
    const submittedQuestion = { ...question };
    let selectedValue = evt.target.value
    submittedQuestion[evt.target.id] = selectedValue
    setQuestion(submittedQuestion)
};




 //!  SET STATE ---------------------------------------
useEffect(() => {
  handleAlertMessage()
    getAllCategories()
    .then(res => {
      setCategoryList(res)
    })
    setFirebaseUserProfileId(firebase.auth().currentUser.uid)
    // getQuestionById(Id).then(setQuestion)
   
}, []);

  

//!  click ->  SAVE BUTTON ---------------------------------------
const handleSaveEvent = (evt) => {
   
    evt.preventDefault();
    if (question.QuestionContent === "" || question.AnswerContent === "" ||category === '') {
        window.alert("Please fill in all fields and select a category.")
    } else {


       

        //I need to set the question.CategoryId equal to category.id
        // question.CategoryId = category.id
        // setQuestion(question.CategoryId)

      question.CategoryId=parseInt(category)
        setQuestion(question.CategoryId)

        addQuestion(question) 
            .then(() => window.location.reload());
    };
};


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
        <div>AddMorePage</div>
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
                        />
                </FormGroup>
                <FormGroup>
                    <label>Answer</label>
                    <input type="text"
                        id="answerContent"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        />
                </FormGroup>
            </Form>

            <fieldset>
        <div className='post-form'>
          <div className='category-dropdown'>

            <label htmlFor="categories" className="centermebutton5">Choose a Category </label>
            <select value={ category } className="centermebutton4" name="categories" onChange={ handleDropdownChange }>
              <option value={ category} selected>Please Select a Category</option>
              { categoryList.map(c => (
                <option
                  htmlFor={ c.name }
                  key={ c.id * Math.random() }
                  value={ c.id }
                onSelect={ handleClickSaveEntry }
                >
                  { c.name }
                </option>
              ))
              }
            </select>
          </div>
        </div>
      </fieldset>

            <Button className="article-btn"
                onClick={handleSaveEvent}>
                Save
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

//when you are exporting a single thing do this:
// export default AddQuestions; <--- at the very bottom of the page
//otherwise export up top
export default AddQuestions;
