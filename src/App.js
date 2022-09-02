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
import RegisterAdultPart1 from './features/Adult/RegisterPart1';
import RegisterAdultPart2 from './features/Adult/RegisterPart2';
import StudentLogin from './features/Student/Login';
import RegisterStudentPart1 from './features/Student/RegisterPart1';
import RegisterStudentPart2 from './features/Student/RegisterPart2';
import GuestUser from './features/GuestUser';
import AvatarService from './services/avatarService';
import StudentService from './services/studentService';
import ClassCodeService from './services/classCodeService';
import AuthService from './services/authService';

const avatarService = new AvatarService();
const classCodeService = new ClassCodeService();
const authService = new AuthService();
export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    // bookService,
    avatarService,
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
  const { authService: service } = useContext(UserContext);

  // Testing
  // const isLoggedIn = false;
  if (!service.isLoggedIn) {
    return <Navigate {...props} to="/" state={{ from: location }} replace />;
  }

  return children;
};

const Part1RegisterRequire = ({ user, children, ...props }) => {
  const location = useLocation();
  const { authService: service } = useContext(UserContext);

  if (!service[`${user}RegisterPart1`]) {
    return (
      <Navigate
        {...props}
        to={`/register/${user}/part1`}
        state={{ from: location }}
        replace
      />
    );
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
            element={
              <Part1RegisterRequire user="student">
                <RegisterStudentPart2 />
              </Part1RegisterRequire>
            }
            exact
          />
          <Route
            path="/register/adult/part1"
            element={<RegisterAdultPart1 />}
            exact
          />
          <Route
            path="/register/adult/part2"
            element={
              <Part1RegisterRequire user="adult">
                <RegisterAdultPart2 />
              </Part1RegisterRequire>
            }
            exact
          />
          {/* <Route path="/register/adult" element={<RegisterAdult />} exact /> */}
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
