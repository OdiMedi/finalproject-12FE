import api from './axios';

const sendVerificationCodeByEmail = async props => {
  try {
    const response = await api.post(`/user/signup/email`, {
      email: props,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);

    throw error.response.data;
  }
};

const confirmationNumber = async props => {
  try {
    const response = await api.post(`/user/signup/email/valid`, {
      email: props.email,
      validNumber: props.validNumber,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error.response.data;
  }
};

export { sendVerificationCodeByEmail, confirmationNumber };
