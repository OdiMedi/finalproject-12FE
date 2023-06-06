import api from './axios';

const storeAllList = async () => {
  try {
    const response = await api.get('api/store');
    console.log('storeAll::::', response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 메인페이지 필터, 검색 조회
const storeFilterList = async props => {
  console.log('props', props);

  try {
    const response = await api.get(
      `api/store/search?radius=1&latitude=${props.currentLatitude}&longitude=${props.currentLongitude}&storeName=${props.name}&gu=${props.gu}&open=${props.open}&holidayBusiness=${props.holidayBusiness}&nightBusiness=${props.nightBusiness}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// // 메인페이지 필터, 검색 조회
// const storeFilterList = async props => {
//   console.log('props', props);
//   try {
//     const response = await api.get(
//       `/api/store/location?radius=5&latitude=${props.currentLatitude}&longitude=${props.currentLongitude}`
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

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

export { storeAllList, storeFilterList, inquiryStoreDetail };
