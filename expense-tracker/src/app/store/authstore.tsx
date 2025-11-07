import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserData = {
  uid?: string;
  email?: string;
  name?: string;
  isNewuser?: boolean;
  [key: string]: any; // for other optional fields
};

type AuthStore = {
  isLoading: boolean;
  user: UserData | null;
  isAuthenicated: boolean;
  isNewuser: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  checkAuth: () => void;
  setIsNewuser: (value: boolean) => void; // ✅ Added
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

      // ✅ Safely update both Zustand & localStorage
      setIsNewuser: (value) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser: UserData = { ...currentUser, isNewuser: value };

        localStorage.setItem("userData", JSON.stringify(updatedUser));
        set({ user: updatedUser, isNewuser: value });
      },
    }),
    { name: "auth-storage" }
  )
);
