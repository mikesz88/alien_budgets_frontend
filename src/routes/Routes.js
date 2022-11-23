/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import {
  Routes as RouteWrapper,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Hero from '../features/Hero';
import StudentDashboard from '../features/Student/AlienDashboard';
import AdultDashboard from '../features/Adult/Dashboard';
import AdultLogin from '../features/Adult/Login';
import RegisterAdultPart1 from '../features/Adult/RegisterPart1';
import RegisterAdultPart2 from '../features/Adult/RegisterPart2';
import StudentLogin from '../features/Student/Login';
import RegisterStudentPart1 from '../features/Student/RegisterPart1';
import RegisterStudentPart2 from '../features/Student/RegisterPart2';
import Challenge from '../features/Challenge';
import FourOhFour from '../features/FourOhFour';
import Unauthorized from '../features/Unauthorized';
import TeacherClasses from '../features/Classes/TeacherClasses';
import CreateClass from '../features/Classes/CreateClass';
import Account from '../features/Account';
import Logout from '../features/Logout';
import DeletedAccount from '../features/DeletedAccount';
import Stats from '../features/Stats';
import Leaderboard from '../features/Classes/Leaderboard';
import ClassDetails from '../features/Classes/TeacherClasses/ClassDetails';
import AccessByForgotPassword from '../features/ForgotPassword/AccessByForgotPassword';
import AccessByEmail from '../features/ForgotPassword/AccessByEmail';
import ResetPasswordByEmail from '../features/ResetPasswordByEmail';
import PrivacyPolicy from '../features/PrivacyPolicy';
import TermsOfService from '../features/TermsOfService';
import Notification from '../components/Notification';
import { SUCCESS, success } from '../common/constants';
import Mobile from '../features/Mobile';
import { useAuthServiceProvider } from '../services/AuthServiceProvider';
import RouteLinks from '../common/routes';

export const PrivateRoute = ({ user, children, ...props }) => {
  const { user: currentUser } = useAuthServiceProvider();
  const location = useLocation();

  if (!currentUser.isLoggedIn && currentUser.role !== user) {
    return (
      <Navigate
        {...props}
        to={RouteLinks.unauthorized}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export const Part1RegisterRequire = ({ user, children, ...props }) => {
  const location = useLocation();
  const { user: currentUser } = useAuthServiceProvider();

  if (!currentUser[`${user}RegisterPart1`]) {
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

const Routes = () => {
  const { foundUser } = useAuthServiceProvider();
  const navigate = useNavigate();
  const location = useLocation();

  const findUser = (token) => {
    foundUser(token)
      .then((res) => {
        if (res.role === 'adult') {
          const { firstName, lastName } = res;
          navigate(RouteLinks.dashboard);
          Notification(
            success,
            SUCCESS,
            `Welcome back ${firstName} ${lastName}!`
          );
        } else {
          const { username } = res;
          Notification(success, SUCCESS, `Welcome back ${username}!`);
          navigate(RouteLinks.studentDashboard);
        }
      })
      .catch(() => Notification('info', 'No user', 'Please login!'));
  };

  const checkMobile = () => {
    const newWidth = window.screen.width;
    if (newWidth < 768 && location.pathname !== '/mobile') {
      navigate('/mobile');
    }
  };

  useEffect(() => {
    const foundToken = localStorage.getItem('token');
    if (foundToken) {
      findUser(foundToken);
    }
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  }, [window.screen.width, location]);

  return (
    <RouteWrapper>
      <Route path={RouteLinks.hero} element={<Hero />} exact />
      <Route path={RouteLinks.studentLogin} element={<StudentLogin />} exact />
      <Route
        path={RouteLinks.registerStudentPart1}
        element={<RegisterStudentPart1 />}
        exact
      />
      <Route
        path={RouteLinks.registerStudentPart2}
        element={
          <Part1RegisterRequire user="student">
            <RegisterStudentPart2 />
          </Part1RegisterRequire>
        }
        exact
      />
      <Route
        path={RouteLinks.registerAdultPart1}
        element={<RegisterAdultPart1 />}
        exact
      />
      <Route
        path={RouteLinks.registerAdultPart2}
        element={
          <Part1RegisterRequire user="adult">
            <RegisterAdultPart2 />
          </Part1RegisterRequire>
        }
        exact
      />
      <Route path={RouteLinks.adultLogin} element={<AdultLogin />} exact />
      <Route
        path={RouteLinks.studentDashboard}
        element={
          <PrivateRoute user="student">
            <StudentDashboard />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path={RouteLinks.dashboard}
        element={
          <PrivateRoute user="adult">
            <AdultDashboard />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path={RouteLinks.challenge}
        element={
          <PrivateRoute user="student">
            <Challenge />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path={`${RouteLinks.teacherClasses}:teacherId`}
        element={
          <PrivateRoute user="adult">
            <TeacherClasses />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path={`${RouteLinks.classDetails}:classId`}
        element={
          <PrivateRoute user="adult">
            <ClassDetails />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path={`${RouteLinks.leaderboard}:class`}
        element={
          <PrivateRoute user="student">
            <Leaderboard />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path={RouteLinks.accessByForgotPassword}
        element={<AccessByForgotPassword />}
        exact
      />
      <Route
        path={`${RouteLinks.resetPasswordByEmail}:resettoken`}
        element={<ResetPasswordByEmail />}
        exact
      />
      <Route
        path={RouteLinks.privacyPolicy}
        element={<PrivacyPolicy />}
        exact
      />
      <Route
        path={RouteLinks.termsOfService}
        element={<TermsOfService />}
        exact
      />
      <Route
        path={RouteLinks.accessByEmail}
        element={<AccessByEmail />}
        exact
      />
      <Route
        path={RouteLinks.createClass}
        element={
          <PrivateRoute user="adult">
            <CreateClass />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path={`${RouteLinks.stats}:user`}
        element={
          <PrivateRoute user="student">
            <Stats />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path={RouteLinks.account}
        element={
          <PrivateRoute user={'student' || 'adult'}>
            <Account />
          </PrivateRoute>
        }
        exact
      />
      <Route path={RouteLinks.logout} element={<Logout />} exact />
      <Route path={RouteLinks.fourOhFour} element={<FourOhFour />} />
      <Route path={RouteLinks.unauthorized} element={<Unauthorized />} exact />
      <Route path={RouteLinks.deleted} element={<DeletedAccount />} exact />
      <Route path={RouteLinks.mobile} element={<Mobile />} exact />
    </RouteWrapper>
  );
};

export default Routes;
