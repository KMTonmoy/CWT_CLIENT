'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Base URL for backend
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cwt-server.vercel.app';

  // Register user with complete data
  const registerUser = async (userData) => {
    setLoading(true);
    try {
      console.log('Starting registration with ALL data:', userData);
      
      // 1. Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      
      const firebaseUser = userCredential.user;
      console.log('Firebase user created:', firebaseUser.uid);
      
      // 2. Update Firebase profile with name
      await updateProfile(firebaseUser, {
        displayName: userData.name,
      });
      console.log('Firebase profile updated');

      // 3. Prepare ALL user data for backend
      const backendUserData = {
        uid: firebaseUser.uid,
        email: userData.email,
        name: userData.name,
        phone: userData.phone || '',
        birthDate: userData.birthDate || null,
        address: userData.address || '',
        postCode: userData.postCode || '',
        role: 'student',
        photoURL: '',
        status: 'active',
        displayName: userData.name,
        // Additional fields for complete profile
        bio: '',
        education: '',
        occupation: '',
        paymentMethod: 'none',
        socialLinks: {
          facebook: '',
          twitter: '',
          linkedin: '',
          github: '',
          portfolio: ''
        },
        notifications: {
          email: true,
          sms: false,
          push: true
        },
        emailVerified: false,
        phoneVerified: false,
        lastLogin: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };

      console.log('Sending COMPLETE data to backend:', backendUserData);

      // 4. Send ALL data to backend
      const response = await axios.post(`${BASE_URL}/api/users/register`, backendUserData);
      console.log('Backend response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed in backend');
      }

      // 5. Update local state
      setUser(firebaseUser);
      setLoading(false);
      
      // 6. Redirect to dashboard
      router.push('/dashboard');
      
      return { 
        success: true, 
        message: 'Registration successful!',
        user: firebaseUser,
        userData: backendUserData
      };
    } catch (error) {
      console.error('Registration error details:', error);
      setLoading(false);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please login instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password (at least 6 characters).';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update last login time in backend
      await updateUserLastLogin(firebaseUser.uid);
      
      setUser(firebaseUser);
      router.push('/dashboard');
      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('Error signing in:', error);
      
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Sync user with backend (might need to update with Google data)
      await syncUserWithBackend(firebaseUser);
      
      setUser(firebaseUser);
      router.push('/dashboard');
      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw new Error('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to update user last login
  const updateUserLastLogin = async (uid) => {
    try {
      const updateData = {
        lastLogin: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      
      await axios.patch(`${BASE_URL}/api/users/uid/${uid}`, updateData);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  };

  // Helper function to sync user with backend
  const syncUserWithBackend = async (firebaseUser) => {
    try {
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
        role: 'student',
        status: 'active',
        lastLogin: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };

      const response = await axios.post(`${BASE_URL}/api/users`, userData);
      console.log('User synced with backend:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error syncing user with backend:', error);
      return null;
    }
  };

  // Check if user exists in backend
  const checkUserInBackend = async (uid) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/uid/${uid}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('User not found in backend (404) - this is normal for new users');
        return null;
      }
      console.error('Error checking user in backend:', error);
      return null;
    }
  };

  // Save user to backend on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          console.log('Auth state changed, checking user:', currentUser.email);
          
          // Check if user exists in backend
          const backendUser = await checkUserInBackend(currentUser.uid);
          
          if (!backendUser) {
            console.log('User not in backend, syncing basic info...');
            // Create user in backend if not exists (basic info only)
            await syncUserWithBackend(currentUser);
          } else {
            console.log('User already exists in backend');
            // Update last login time
            await updateUserLastLogin(currentUser.uid);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
        }
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;