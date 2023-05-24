const CLIENT_ID = '7463ed7e96bc168b9023480e535add90';
const REDIRECT_URI = 'http://localhost:3000/user/signin/kakao';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default KAKAO_AUTH_URL;
