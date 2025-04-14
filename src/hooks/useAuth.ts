import pb from '@/lib/pocketbaseClient';
import { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react';

// User interface
export interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  picture?: string;
}

export interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (provider: string, onLoginComplete?: () => void) => Promise<void>;
  loginWithEmail: (email: string, password: string, onLoginComplete?: () => void) => Promise<void>;
  register: (email: string, password: string, name: string, onRegisterComplete?: () => void) => Promise<void>;
  logout: (onLogoutComplete?: () => void) => void;
  getToken: () => Promise<string | null>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper function to update auth state consistently
  const updateAuthState = (authData: RecordModel | null) => {
    if (pb.authStore.isValid && authData) {
      // Convert PocketBase record to AuthUser format
      let profilePicture = null;
      
      // Generate the complete avatar URL if avatar exists
      if (authData.avatar) {
        profilePicture = `${pb.baseURL}/api/files/_pb_users_auth_/${authData.id}/${authData.avatar}`;
      }

      const userData: AuthUser = {
        id: authData.id,
        name: authData.name,
        email: authData.email,
        picture: profilePicture
      };
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Check for existing auth on mount
  useEffect(() => {
    // Get initial auth state from PocketBase
    updateAuthState(pb.authStore.record);
    setIsLoading(false);
    
    // Listen for PocketBase auth state changes
    pb.authStore.onChange(() => {
      updateAuthState(pb.authStore.record);
    });
  }, []);

  // Login function for OAuth providers
  const login = async (provider: string, onLoginComplete?: () => void) => {
    try {
      let pocketbaseProvider = '';
      
      switch(provider) {
        case 'GitHub':
          pocketbaseProvider = 'github';
          break;
        case 'Google':
          pocketbaseProvider = 'google';
          break;
        default:
          throw new Error('Unknown provider');
      }
      
      const authData = await pb.collection('users').authWithOAuth2({ 
        provider: pocketbaseProvider,
      });

      if (authData?.record) {
        updateAuthState(authData.record);
        
        // Call the callback if provided
        if (onLoginComplete) {
          onLoginComplete();
        }
      }
    } catch (error) {
      console.error('Login failed', error.response);
      throw error;
    }
  };

  // Email login function
  const loginWithEmail = async (email: string, password: string, onLoginComplete?: () => void) => {
    try {
      const authData = await pb.collection('users').authWithPassword(
        email,
        password
      );

      if (authData?.record) {
        updateAuthState(authData.record);
        
        // Call the callback if provided
        if (onLoginComplete) {
          onLoginComplete();
        }
      }
    } catch (error) {
      console.error('Email login failed', error.response);
      throw error;
    }
  };

  // Register new user with email/password
  const register = async (email: string, password: string, name: string, onRegisterComplete?: () => void) => {
    try {
      const data = {
        email,
        password,
        passwordConfirm: password,
        name,
      };
      
      // Create the user record
      const record = await pb.collection('users').create(data);
      
      // After registration, automatically log in
      if (record.id) {
        await loginWithEmail(email, password);
        
        // Call the callback if provided
        if (onRegisterComplete) {
          onRegisterComplete();
        }
      }
    } catch (error) {
      console.error('Registration failed', error.response);
      throw error;
    }
  };

  // Logout function
  const logout = (onLogoutComplete?: () => void) => {
    // Reset our local state
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear PocketBase auth
    pb.authStore.clear();

    // Call the callback if provided
    if (onLogoutComplete) {
      onLogoutComplete();
    }
  };

  // Get access token (using PocketBase token)
  const getToken = async (): Promise<string | null> => {
    try {
      if (!isAuthenticated) return null;
      return pb.authStore.token;
    } catch (error) {
      console.error('Failed to get access token', error);
      return null;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginWithEmail,
    register,
    logout,
    getToken
  };
}