import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initialState = {
  userInfo: null,
  isMenuOpen: false,
  activeTab: 0,
};

const useUserStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      setUserInfo: data => {
        set(
          produce(state => {
            state.userInfo = { ...state.userInfo, ...data };
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
      getUserInfo: () => {
        return get().userInfo; // 현재 userInfo 반환
      },

      // 메뉴토글, 메뉴접기, 탭밑줄
      toggleMenu: () => {
        set(state => ({ isMenuOpen: !state.isMenuOpen }));
      },
      closeMenu: () => set({ isMenuOpen: false }),
      setActiveTab: index => set({ activeTab: index }),
      removeTab: () => set({ activeTab: false }),
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserStore;
