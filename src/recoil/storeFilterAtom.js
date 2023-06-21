import { atom } from 'recoil';

const storeFilterAtom = atom({
  key: 'storeFilter',
  default: {
    name: '',
    gu: '',
    open: false,
    holidayBusiness: false,
    nightBusiness: false,
    currentLatitude: '',
    currentLongitude: '',
    page: 0,
    selectedButton: '',
    selectedOption: { value: '', label: '' },
  },
});
export default storeFilterAtom;
