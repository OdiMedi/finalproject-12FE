import api from './axios';

const getNoticeList = async props => {
  console.log('어느번호?', props);
  try {
    const response = await api.get(`/api/board?page=${props}&size=8`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getNoticeDetail = async props => {
  try {
    const response = await api.get(`/api/board/${props}`);
    // 공지사항 아이디
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
    // 보드 아이디가 들어가야함.
    const response = await api.post(`/api/board/${props}`, {
      title: props.title,
      content: props.content,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);

    throw error.response.data;
  }
};

export { getNoticeList, getNoticeDetail, saveNotice, editNotice };
