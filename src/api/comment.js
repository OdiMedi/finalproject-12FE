import api from './axios';

const saveComment = async props => {
  try {
    const response = await api.post(`/api/comment/${props.storeId}`, {
      contents: props.contents,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const commentUpdate = async props => {
  try {
    const response = await api.put(
      `/api/comment/${props.storeId}/${props.commentId}`,
      {
        contents: props.contents,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getComment = async props => {
  try {
    const response = await api.get(`/api/comment/${props}`);
    return response.data;
  } catch (error) {
    console.log(error.response);

    throw error.response.data;
  }
};

export { commentUpdate, getComment, saveComment };
