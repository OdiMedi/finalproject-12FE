import { atom } from 'recoil';

const ForeignStoreFilterAtom = atom({
  key: 'foreignStoreFilter',
  default: {
    name: '',
    gu: 'part-gu',
    open: false,
    holidayBusiness: false,
    nightBusiness: false,
    english: false,
    chinese: false,
    japanese: false,
    currentLatitude: '',
    currentLongitude: '',
    page: 0,
    selectedButton: '',
    languageSelectedButton: '',
    selectedOption: { value: 'part-gu', label: 'part-gu' },
  },
});
export default ForeignStoreFilterAtom;
