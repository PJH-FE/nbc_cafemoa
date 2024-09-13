import { create } from 'zustand';

const initialState = {
  formData: {
    id: '',
    password: '',
    nickname: '',
  },
};

const useUserStore = create(set => ({
  ...initialState,
  setData: data => {
    set(state => ({
      formData: { ...state.formData, ...data },
    }));
  },
}));

export default useUserStore;
