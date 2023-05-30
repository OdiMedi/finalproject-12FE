// import axios from 'axios';

import api from './axios';

// const API_URL = process.env.REACT_APP_SERVER_URL;
// const api = axios.create({
//   baseURL: API_URL,
// });

const storeAllList = async () => {
  try {
    const response = await api.get('api/store');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default storeAllList;
