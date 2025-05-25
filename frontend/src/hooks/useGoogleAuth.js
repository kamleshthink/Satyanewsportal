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
      console.log('Initializing Google Auth Provider...');
      const provider = new GoogleAuthProvider();
      console.log('Opening Google Sign In popup...');
      const result = await signInWithPopup(auth, provider);
      console.log('Google Sign In popup result:', result);
      setUser(result.user);
      setError(null);
      return result.user;
    } catch (error) {
      console.error('Error in signInWithGoogle:', error);
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