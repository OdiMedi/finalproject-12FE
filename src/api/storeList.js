import api from './axios';

const storeFilterList = async props => {
  try {
    const response = await api.get(
      `/test?radius=1&page=${props.page}&size=20&latitude=${props.currentLatitude}&longitude=${props.currentLongitude}&storeName=${props.name}&gu=${props.gu}&open=${props.open}&holidayBusiness=${props.holidayBusiness}&nightBusiness=${props.nightBusiness}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 상세페이지 조회
const inquiryStoreDetail = async props => {
  try {
    const response = await api.get(`api/store/${props}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { storeFilterList, inquiryStoreDetail };
