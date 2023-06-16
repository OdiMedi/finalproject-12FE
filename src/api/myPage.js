import Cookies from 'js-cookie';
import api from './axios';

const getBookmark = async () => {
  const response = await api.get('/api/bookmark');
  return response;
};

const getReview = async () => {
  const response = await api.get(`/api/comment/myComment`);
  return response;
};

const unregister = async () => {
  try {
    const authorizationCookie = Cookies.get('authorization');
    await api.delete('user/signout', {
      headers: {
        authorization: authorizationCookie,
      },
    });
    Cookies.remove('accesstoken');
    Cookies.remove('refreshtoken');
    Cookies.remove('authorization');
    localStorage.removeItem('email');
    localStorage.removeItem('nickname');
    // navigate('/');
  } catch (error) {
    console.log('withdrawal::::::', error);
  }
};
const updateNickBtn = async props => {
  try {
    const response = await api.post(`user/change/nickname`, {
      newName: props,
    });
    localStorage.setItem('nickname', response.data.nickname);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const editProfileImg = async props => {
  try {
    const response = await api.post(`/user/change/profile`, props);
    localStorage.setItem('ProfileImg', response.data.file);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const editPassword = async props => {
  try {
    const response = await api.post(`/user/change/password`, {
      newPassword: props,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export {
  getReview,
  getBookmark,
  unregister,
  updateNickBtn,
  editProfileImg,
  editPassword,
};
