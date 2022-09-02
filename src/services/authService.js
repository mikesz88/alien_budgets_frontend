/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../common/endpoints';
import adultService from './adultService';
import studentService from './studentService';
import User from './userService';

const creator = (differentTypesOfUsers, basicUser) =>
  basicUser(differentTypesOfUsers);
const extender = (...parts) => parts.reduce(creator, User);

class AuthService extends extender(adultService, studentService) {
  constructor() {
    super();
    this.authToken = '';
    this.bearerHeader = {};
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  setBearerHeader(token) {
    this.bearerHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  getBearerHeader() {
    return this.bearerHeader;
  }

  setForgotQuestionList(list) {
    const renamedList = [];
    list.forEach((question) => {
      renamedList.push({
        id: question._id,
        question: question.question,
        createdAt: question.createdAt,
      });
    });
    return renamedList;
  }

  async getAllForgotQuestions() {
    try {
      const { data: response } = await axios.get(
        Endpoints.getAllForgotQuestions
      );
      return this.setForgotQuestionList(response.data);
    } catch (error) {
      throw error;
    }
  }

  async registerStudent(userData) {
    this.registerStudentPart2(userData);
    const body = this.getStudentData();
    body.password = userData.password;
    body.forgotPasswordAnswer = this.forgotPasswordAnswer;
    try {
      const { data: response } = await axios.post(
        Endpoints.registerStudent,
        body
      );
      this.setAuthToken(response.token);
      this.setBearerHeader(response.token);
      this.setIsLoggedIn(true);
      await this.getStudent();
    } catch (error) {
      throw error;
    }
  }

  async getStudent() {
    const headers = this.getBearerHeader();
    try {
      const { data: response } = await axios.get(Endpoints.getLoggedInUser, {
        headers,
      });
      this.forgotPasswordAnswer = '';
      this.setStudentData(response.data);
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
