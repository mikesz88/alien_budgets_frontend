/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../common/endpoints';

class AuthService {
  constructor() {
    this.forgotQuestionList = [];
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
    this.forgotQuestionList = renamedList;
  }

  async getAllForgotQuestions() {
    try {
      const { data: response } = await axios.get(
        Endpoints.getAllForgotQuestions
      );
      this.setForgotQuestionList(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
