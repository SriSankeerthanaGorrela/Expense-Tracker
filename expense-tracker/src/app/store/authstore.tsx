import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isLoading: boolean;
  user: unknown | null;
  isAuthenicated: boolean;
  isNewuser: boolean;
  login: (userData: any) => void;
  logout: () => void;
  checkAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isNewuser: false,
      isAuthenicated: false,

      login: (userData) => {
        localStorage.setItem("userData", JSON.stringify(userData));
        set({
          user: userData,
          isAuthenicated: true,
          isNewuser: userData?.isNewuser ?? false,
        });
      },

      logout: () => {
        localStorage.removeItem("userData");
        set({ user: null, isAuthenicated: false, isNewuser: false });
      },

      checkAuth: () => {
        try {
          const stored = localStorage.getItem("userData");
          if (stored) {
            const userData = JSON.parse(stored);
            set({
              user: userData,
              isAuthenicated: true,
              isLoading: false,
              isNewuser: userData?.isNewuser ?? false,
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          set({ isLoading: false });
        }
      },
    }),
    { name: "auth-storage" }
  )
);
