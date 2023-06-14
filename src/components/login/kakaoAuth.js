const CLIENT_ID = '111b5867f4dff0156fb3f17736d40f3e';
// const REDIRECT_URI = 'http://localhost:3000/user/signin/kakao';
// const REDIRECT_URI = 'https://finalproject-12-fe.vercel.app/user/signin/kakao';
// const REDIRECT_URI = 'https://www.odimedi.site/user/signin/kakao';
const REDIRECT_URI = 'http://localhost:3000/user/signin/kakao';

// const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default KAKAO_AUTH_URL;
