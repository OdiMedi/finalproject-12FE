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
export { getReview, getBookmark, unregister };
