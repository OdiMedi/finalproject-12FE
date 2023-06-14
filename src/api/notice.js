import api from './axios';

const getNoticeList = async props => {
  try {
    const response = await api.get(`/api/board?page=${props}&size=8`);

    const isAdmin = response?.headers.get('Admincheck');
    console.log('isAdmin', response?.headers);
    const responseData = { response, isAdmin };
    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getNoticeDetail = async props => {
  try {
    const response = await api.get(`/api/board/${props}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const saveNotice = async props => {
  try {
    const response = await api.post(`/api/board`, {
      title: props.title,
      content: props.content,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);

    throw error.response.data;
  }
};

const editNotice = async props => {
  try {
    const response = await api.put(`/api/board/${props.id}`, {
      title: props.title,
      content: props.content,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);

    throw error.response.data;
  }
};
const deleteNotice = async props => {
  try {
    const response = await api.delete(`/api/board/${props}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getNoticeList, getNoticeDetail, saveNotice, editNotice, deleteNotice };
