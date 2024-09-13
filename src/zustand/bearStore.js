import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const initialState = {
  userData: {},
};

const useUserStore = create(
  immer(set => ({
    ...initialState,
    setData: data => {
      set(state => ({ userData: data }));
    },
  })),
);

export default useUserStore;
