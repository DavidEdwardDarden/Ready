import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "/api/question";

export const getAllQuestions = () => {
    return getToken().then((token) => {
     return fetch(`${_apiUrl}/`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
            // console.log(resp,"oooooo")
          return resp.json();
          
        } else {
          throw new Error("An unknown error occurred while trying to get quotes.");
        }
      });
    });
  };



//FirebaseUserId Is supplied in the backend
  export const GetAllQuestionsByFirebaseUserIdandCategoryId = (CategoryId) => {
    return getToken().then((token) => {
     return fetch(`${_apiUrl}/Quiz/${CategoryId}`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
            console.log(resp,"testing GetAllQuestionsByFirebaseUserIdandCategoryId")
          return resp.json();
          
        } else {
          throw new Error("An unknown error occurred while trying to get questions by firebase User Id and Category Id.");
        }
      });
    });
  };

  export const GetAllQuestionsByFirebaseUserId = () => {
    return getToken().then((token) => {
      //Firebase UserId is supplied by the back end API
     return fetch(`${_apiUrl}/MyQuestionsList`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
            // console.log(resp,"testing GetAllQuestionsByFirebaseUserId")
          return resp.json();
          
        } else {
          throw new Error("An unknown error occurred while trying to get My Questions.");
        }
      });
    });
  };


  export const getAllQuestionsByCategoryId = (CategoryId) => {
    return getToken().then((token) => {
     return fetch(`${_apiUrl}/${CategoryId}`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
            console.log(resp,"testing GetAllQuestionsByCategoryId")
          return resp.json();
          
        } else {
          throw new Error("An unknown error occurred while trying to get quotes.");
        }
      });
    });
  };

  export const deleteQuestion = (Id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${Id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            
        })
    });
};

export const getQuestionById = (Id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${Id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            // console.log(res)
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get the comment.");
            }
        });
    });
};
























// export const addCategory = (category) => {
//     return getToken().then((token) => {
//         return fetch(_apiUrl, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(category)
//         }).then(resp => {
//             if (resp.ok) {
//                 return resp.json();
//             } else if (resp.status === 401) {
//                 throw new Error("Unauthorized");
//             } else {
//                 throw new Error("An unknown error occurred while trying to save a new category.");
//             }
//         });
//     });
// };


// export const deleteCategory = (categoryId) => {
//     return getToken().then((token) => {
//         return fetch(`${_apiUrl}/${categoryId}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             },
            
//         })
//     });
// };



// export const editCategory = (category) => {
//     return getToken().then((token) => {
//         return fetch(`${_apiUrl}/${category.id}`, {
//             method: "PUT",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(category)
//         }).then(resp => {
//             if (resp.ok) {
//                 return;
//             } else if (resp.status === 401) {
//                 throw new Error("Unauthorized");
//             } else {
//                 throw new Error("An unknown error occurred while trying to save a new category.");
//             }
//         });
//     });
// };

// export const getCategoryById = (id) => {
//     return getToken().then((token) => {
//         return fetch(`${_apiUrl}/${id}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         }).then(resp => {
//             if (resp.ok) {
//                 return resp.json();
//             } else {
//                 throw new Error("An unknown error occurred while trying to get category.");
//             }
//         });
//     });
// };


// export const CategoryContext = createContext();

// export const CategoryProvider = (props) => {

//     const { getToken } = useContext(UserProfileContext); //every provider needs the token
//     const [categories, setCategories ] = useState([]);

//     const getAllCategories = () => {
//         return getToken()
//             .then((token) =>
//                 fetch('/api/Category', {
//                     method: 'GET',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 })
//             )
//             .then((res) => res.json())
//             .then(setCategories);
//     };

//     const updateCategory = (category) => {
//         return getToken()
//             .then((token) => 
//                 fetch(`/api/Category/${category.id}`,{
//                     method: `PUT`, 
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(category),
//                 })
//             );
//     };

//     const addCategory = (category) => {
//         return getToken()
//             .then((token) => 
//                 fetch(`api/Category`,{
//                     method: 'POST',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(category),
//                 })
//             );
//     };

//     const deleteCategory = (id) => {
//         return getToken()
//             .then((token) => {
//                 fetch(`api/Category/${id}`, {
//                     method: 'DELETE',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 })
//             })
//     };

//     return (
//         <CategoryContext.Provider
//             value={{ categories, getAllCategories, updateCategory, addCategory, deleteCategory }}>
//                 {props.children}
//             </CategoryContext.Provider>
//     )


// }