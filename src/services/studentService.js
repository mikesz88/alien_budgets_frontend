/* eslint-disable no-unused-vars */
import axios from 'axios';
import Endpoints from '../common/endpoints';

class StudentService {
  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastInitial = '';
    this.forgotPasswordQuestion = '';
    this.forgotPasswordAnswer = '';
    this.classCode = '';
    this.username = '';
    this.avatar = '';
    this.avatarBackground = '';
    this.avatarAdjective = '';
    this.isLoggedIn = false;
  }

  registerUserPart1(userData) {
    const {
      firstName,
      lastInitial,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
      classCode,
    } = userData;

    this.firstName = firstName;
    this.lastInitial = lastInitial;
    this.forgotPasswordQuestion = forgotPasswordQuestion;
    this.forgotPasswordAnswer = forgotPasswordAnswer;
    this.classCode = classCode;
  }

  setIsLoggedIn(loggedIn) {
    this.isLoggedIn = loggedIn;
  }

  setUserData(userData) {
    const {
      _id,
      firstName,
      lastInitial,
      forgotPasswordQuestion,
      classCode,
      username,
      avatar,
      avatarBackground,
    } = userData;

    this.id = _id;
    this.firstName = firstName;
    this.lastInitial = lastInitial;
    this.forgotPasswordQuestion = forgotPasswordQuestion;
    this.classCode = classCode;
    this.username = username;
    this.avatar = avatar;
    this.avatarBackground = avatarBackground;
  }
}

export default StudentService;
