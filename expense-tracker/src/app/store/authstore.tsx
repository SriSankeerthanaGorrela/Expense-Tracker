import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isLoading: boolean;
  user: unknown | null;
  isAuthenicated: boolean;
  login: (userData: unknown) => void;
  logout: () => void;
  checkAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isAuthenicated: false,

      // 🔹 Login: Save to localStorage and update Zustand
      login: (userData) => {
        localStorage.setItem("userData", JSON.stringify(userData)); // ✅ consistent key
        set({ user: userData, isAuthenicated: true });
      },

      // 🔹 Logout: Clear data
      logout: () => {
        localStorage.removeItem("userData");
        set({ user: null, isAuthenicated: false });
      },

      // 🔹 Check if user exists in localStorage
      checkAuth: () => {
        try {
          const stored = localStorage.getItem("userData");
          if (stored) {
            const userData = JSON.parse(stored);
            set({ user: userData, isAuthenicated: true, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
