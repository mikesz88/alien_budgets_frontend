/* eslint-disable import/no-cycle */
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
import AdultLogin from './features/Adult/Login';
import StudentLogin from './features/Student/Login';
import RegisterAdult from './features/Adult/Register';
import GuestUser from './features/GuestUser';
import AvatarService from './services/avatarService';
import StudentService from './services/studentService';
import ClassCodeService from './services/classCodeService';
import RegisterStudentPart2 from './features/Student/RegisterPart2';
import RegisterStudentPart1 from './features/Student/RegisterPart1';

const avatarService = new AvatarService();
const studentService = new StudentService();
const classCodeService = new ClassCodeService();
export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    // authService,
    // bookService,
    avatarService,
    studentService,
    classCodeService,
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
          <Route
            path="/register/student/part1"
            element={<RegisterStudentPart1 />}
            exact
          />
          <Route
            path="/register/student/part2"
            element={<RegisterStudentPart2 />}
            exact
          />
          <Route path="/register/adult" element={<RegisterAdult />} exact />
          <Route path="/login/adult" element={<AdultLogin />} exact />
          <Route path="/guestUser" element={<GuestUser />} exact />
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
