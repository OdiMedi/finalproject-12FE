import api from './axios';

// const ForeignStoreFilterList = async props => {
//   try {
//     const response = await api.get(
//       `api/store/foreign/search?radius=1&page=${props.page}&size=20&latitude=${props.currentLatitude}&longitude=${props.currentLongitude}&storeName=${props.name}&gu=${props.gu}&open=${props.open}&holidayBusiness=${props.holidayBusiness}&nightBusiness=${props.nightBusiness}&english=${props.english}&chinese=${props.chinese}&japanese=${props.japanese}`
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
const ForeignStoreFilterList = async props => {
  try {
    const response = await api.get(
      `/testFor?radius=1&page=${props.page}&size=20&latitude=${props.currentLatitude}&longitude=${props.currentLongitude}&storeName=${props.name}&gu=${props.gu}&open=${props.open}&holidayBusiness=${props.holidayBusiness}&nightBusiness=${props.nightBusiness}&english=${props.english}&chinese=${props.chinese}&japanese=${props.japanese}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ForeignStoreDetail = async props => {
  try {
    const response = await api.get(`api/store/foreign/${props}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { ForeignStoreFilterList, ForeignStoreDetail };
