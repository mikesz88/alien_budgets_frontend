/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import Endpoints from '../common/endpoints';
// import User from './userService';

function adultService(User) {
  class AdultService extends User {
    constructor() {
      super();
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.gradeLevel = '';
      this.adultRegisterPart1 = false;
    }

    registerAdultPart1({
      firstName,
      lastName,
      password,
      email,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
    }) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
      this.email = email;
      this.forgotPasswordQuestion = forgotPasswordQuestion;
      this.forgotPasswordAnswer = forgotPasswordAnswer;
      this.adultRegisterPart1 = true;
    }
  }
  return AdultService;
}

export default adultService;
