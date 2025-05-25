import { useState } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const useGoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setError(null);
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    user,
    error,
    signInWithGoogle,
    logout
  };
}; 