import { React, useEffect, useState } from "react";
// import { getSubscribedPosts } from "../modules/subscriptManager.js";
// import  Post from "./posts/PostListCard.js"
import thing from "./images/ReadyLogo.jpg";
import thing2 from "./images/crown.png";
import thing3 from "./images/pattern2.png";
import thing4 from "./images/process3.png";
import thing88 from "./images/process2.png";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { getAllCategories } from "../modules/categoryManager";
import "firebase/auth";
import firebase from "firebase/app";
import { GetAllQuestionsByFirebaseUserId } from "../modules/quizManager";

const Home = () => {
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  // const [FirebaseUserProfileId, setFirebaseUserProfileId] = useState("");
  const [questionList, setQuestionList] = useState([]);
  // const [categoryQuestionList, setCategoryQuestionList] = useState([]);

  const history = useHistory();

  //fetch list of all categories for dropdown
  useEffect(() => {
    getAllCategories().then((res) => {
      setCategoryList(res);
    });
    // setFirebaseUserProfileId(firebase.auth().currentUser.uid);
  }, []);

  const handleDropdownChange = (e) => {
    e.preventDefault();

    let selectedVal = e.target.value;
    setCategory(selectedVal);
  };

  const handleClickSaveEntry = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let newCategory = { ...category };

    newCategory.categoryId = category;
    if (category === "") {
      alert("Please select a category");
    }
  };

  // //!  QUESTION ARRAY  ---------------------------------------
  const getQList = () => {
    GetAllQuestionsByFirebaseUserId(firebase.auth().currentUser.uid).then(
      (results) => {
        setQuestionList(results);
      }
    );
  };

  const hasQuestionInCategory = () => {
    //THIS took me 5 hours to get right... all because of that ParseInt
    let brainHurts = questionList.map((question) => question.categoryId);
    if (brainHurts.includes(parseInt(category)) === true) {
      return "Yes";
    } else {
      return "No";
    }
  };

  //  //!  SET STATE  ---------------------------------------
  useEffect(() => {
    getQList();
  }, []);

  const handleClickEvent = (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (category === "") {
      alert("Please select a category");
    } else {
      let tf = hasQuestionInCategory();
      console.log(tf);
      //set as t or f below
      if (tf === "No") {
        alert(
          "You have no questions in this category. Add Some Questions in this category to begin"
        );
      } else {
        history.push(`/Quiz/${category}`);
      }
    }
  };

  return (
    <>
      <div className="orange">
        <img src={thing2} className="centerme3" alt="user img2" />
        <img src={thing} className="centerme" alt="user img" />
        <img src={thing3} className="centerme7" alt="user img3" />
        <img src={thing4} className="centerme8" alt="user img3" />
        <img src={thing88} className="centerme77" alt="user img3" />
        <img src={thing88} className="centerme777" alt="user img3" />
        <img src={thing88} className="centerme7777" alt="user img3" />
        <img src={thing88} className="centerme77777" alt="user img3" />
        <img src={thing88} className="centerme777777" alt="user img3" />
        <img src={thing88} className="centerme7777777" alt="user img3" />
        <img src={thing88} className="centermemore7" alt="user img3" />
        <img src={thing88} className="centermemore77" alt="user img3" />
        <img src={thing2} className="dollarsign1" alt="user img3" />
        <img src={thing2} className="dollarsign2" alt="user img3" />

        <button onClick={handleClickEvent} className="centermebutton">
          Quiz Me
        </button>

        <fieldset>
          <div className="post-form">
            <div className="category-dropdown">
              <label htmlFor="categories" className="centermebutton5">
                Choose a Category{" "}
              </label>
              <select
                value={category}
                className="centermebutton4"
                name="categories"
                onChange={handleDropdownChange}
              >
                <option value={category} selected>
                  Please Select a Category
                </option>
                {categoryList.map((c) => (
                  <option
                    htmlFor={c.name}
                    key={c.id * Math.random()}
                    value={c.id}
                    onSelect={handleClickSaveEntry}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default Home;
