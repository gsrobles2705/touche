import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google sign-in error:', err);
      // Firebase error codes: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
      let message = 'Error al iniciar sesión. Intenta de nuevo.';
      if (err.code === 'auth/popup-closed-by-user') {
        message = 'Ventana de inicio cerrada antes de completar el inicio.';
      } else if (err.code === 'auth/unauthorized-domain') {
        message = '⚠️ Dominio no autorizado en Firebase. Verifica "Authorized domains" en Firebase Console.';
      } else if (err.code === 'auth/network-request-failed') {
        message = 'Error de red. Comprueba tu conexión.';
      }
      setAuthError(message);
    }
  }, []);

  const signOut = useCallback(async () => {
    setAuthError(null);
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Sign-out error:', err);
      setAuthError('Error al cerrar sesión.');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, authError, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}