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

  async getAvatarList() {
    try {
      const { data: response } = await axios.get(Endpoints.urlGetAvatars);
      this.setAvatarList(response.data);
    } catch (error) {
      throw error;
    }
  }
}

export default AvatarService;
