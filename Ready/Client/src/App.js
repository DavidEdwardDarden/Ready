import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
// import Header from "./components/Nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
// import { UserProfileProvider } from './modules/postUserProfileManager';
// import { ThemeProvider } from 'styled-components';
// import { GlobalStyles } from './components/Nav/global';
// import { theme } from './components/Nav/theme';



// import { Burger } from './components/Nav/Burger/Burger'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <div>
      
     
    <Router>
          <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
    
   </div>
  );
}

export default App;
