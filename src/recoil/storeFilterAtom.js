import { atom } from 'recoil';

const storeFilterAtom = atom({
  key: 'storeFilter',
  default: {
    name: '',
    gu: '지역구',
    open: false,
    holidayBusiness: false,
    nightBusiness: false,
    currentLatitude: '',
    currentLongitude: '',
    page: 0,
    selectedButton: '',
    selectedOption: { value: '지역구', label: '지역구' },
  },
});
export default storeFilterAtom;
