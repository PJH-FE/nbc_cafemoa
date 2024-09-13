import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const initialState = {
  formData: {
    id: '',
    password: '',
    nickname: '',
  },
};

const useUserStore = create(
  immer(set => ({
    ...initialState,
    setData: data => {
      set(state => ({ userData: data }));
    },
  })),
);
const useUserStore = create(set => ({
  ...initialState,
  setData: data => {
    set(state => ({
      formData: { ...state.formData, ...data },
    }));
  },
}));

export default useUserStore;
