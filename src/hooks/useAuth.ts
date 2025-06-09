import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const { user, token, login, signup, logout } = useAuthStore();

  const isAuthenticated = !!token;

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      return true;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    try {
      await signup(name, email, password);
      return true;
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    signup: handleSignup,
    logout
  };
};