/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../constants/endpoints';

class AvatarService {
  constructor() {
    this.avatarList = [];
  }

  setAvatarList(newAvatarList) {
    this.avatarList = newAvatarList;
  }

  async getAvatarList(page) {
    const limit = 10;
    const currentPage = page || 1;
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getAvatars}?limit=${limit}&page=${currentPage}`
      );
      this.setAvatarList(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getRandomAvatar() {
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getAvatars}?limit=100`
      );
      const findRandomIndex = Math.floor(Math.random() * 100);

      return response.data[findRandomIndex];
    } catch (error) {
      throw error;
    }
  }

  async getRandomAdjective() {
    try {
      const { data: response } = await axios.get(Endpoints.getAvatarAdjective);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AvatarService;
