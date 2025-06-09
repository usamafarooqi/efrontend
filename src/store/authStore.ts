import apiClient from '@/lib/apiClient';
import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      
      login: async (email, password) => {
        try {
          const response = await apiClient.post("auth/login", {
            email,
            password
          });

          const { token, user } = response.data;
          localStorage.setItem('token', token); // Store token in localStorage
          
          set({ 
            token,
            user: { name: user.name, email: user.email }
          });
        } catch (error) {
          throw new Error('Login failed');
        }
      },

      signup: async (name, email, password) => {
        try {
          const response = await axios.post("auth/signup", {
            name,
            email,
            password
          });
          
          const { token, user } = response.data;
          localStorage.setItem('token', token); // Store token in localStorage
          
          set({ 
            token,
            user: { name: user.name, email: user.email }
          });
        } catch (error) {
          throw new Error('Signup failed');
        }
      },

      logout: () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        set({ token: null, user: null });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
