/* eslint-disable no-unused-vars */
import React, { useState, createContext, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import theme from './theme';
import Hero from './features/Hero';
import Student from './features/Student';
import Adult from './features/Adult';
import AdultLogin from './features/Adult/login';
import StudentLogin from './features/Student/login';

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    // authService,
    // bookService,
    updateService: () => setContextServices({ ...contextServices }),
  };

  const [contextServices, setContextServices] = useState(context);

  return (
    <UserContext.Provider value={contextServices}>
      {children}
    </UserContext.Provider>
  );
};

const PrivateRoute = ({ children, ...props }) => {
  const location = useLocation();
  const context = useContext(UserContext);

  // Testing
  const isLoggedIn = false;
  if (/* !context.authService.isLoggedIn */ !isLoggedIn) {
    return <Navigate {...props} to="/" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} exact />
          <Route path="/login/student" element={<StudentLogin />} exact />
          <Route path="/login/adult" element={<AdultLogin />} exact />
          <Route
            path="/student"
            element={
              <PrivateRoute>
                <Student />
              </PrivateRoute>
            }
            exact
          />
          <Route
            path="/adult"
            element={
              <PrivateRoute>
                <Adult />
              </PrivateRoute>
            }
            exact
          />
        </Routes>
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
