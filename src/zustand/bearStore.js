import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initialState = {
  userInfo: null,
};

const useUserStore = create(
  persist(
    set => ({
      ...initialState,
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
          }),
        );
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => torage,
    },
  ),
);

export default useUserStore;
