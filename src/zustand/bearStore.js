import { create } from 'zustand';

const initialState = {
  userData: {},
};

const useUserStore = create(set => ({
  ...initialState,
  setData: data => {
    set(state => ({ userData: data }));
  },
}));

export default useUserStore;
