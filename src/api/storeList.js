import api from './axios';

const storeAllList = async () => {
  try {
    const response = await api.get('api/store');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const storeFilterList = async props => {
  console.log('props', props);

  try {
    const response = await api.get(
      `api/store/search?storeName=${props.name}&gu=${props.gu}&open=${props.open}&holidayBusiness=${props.holidayBusiness}&nightBusiness=${props.nightBusiness}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { storeAllList, storeFilterList };
