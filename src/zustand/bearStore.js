import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initialState = {
  formData: {
    id: '',
    password: '',
    nickname: '',
  },
  userInfo: null,
};

const useUserStore = create(
  persist(
    set => ({
      ...initialState,
      setData: data => {
        set(
          produce(state => ({
            formData: { ...state.formData, ...data },
          })),
        );
      },
      setUserInfo: data => {
        set(
          produce(state => {
            state.userInfo = data;
          }),
        );
      },
      removeUserInfo: () => {
        set(
          produce(state => {
            state.userInfo = null;
            state.formData = { ...initialState.formData };
          }),
        );
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserStore;
