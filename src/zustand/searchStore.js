import { create } from 'zustand';

const useSearchStore = create(set => ({
  searchKeyword: '',
  setSearchKeyword: state => set({ searchKeyword: state }),
}));

export default useSearchStore;
