
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

interface ProfileData {
    uid: string;
    name: string;
    email: string;
    department: string;
    class: string;
    section: string;
    coursesCompleted: number;
    coursesOngoing: number;
    avatarUrl: string;
    avatarFallback: string;
    avatarHint: string;
}

interface AuthContextType {
  user: User | null;
  profile: ProfileData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
});

const defaultProfileData = (user: User): ProfileData => ({
    uid: user.uid,
    name: user.displayName || 'Stacy Lerner',
    email: user.email || '',
    department: 'Computer Science',
    class: 'Senior Year',
    section: 'A',
    coursesCompleted: 12,
    coursesOngoing: 5,
    avatarUrl: 'https://placehold.co/200x200.png',
    avatarFallback: user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U',
    avatarHint: 'profile picture'
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const unsubProfile = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfile({
              uid: user.uid,
              name: data.name || user.displayName || 'Stacy Lerner',
              email: user.email || '',
              department: data.department || 'Computer Science',
              class: data.class || 'Senior Year',
              section: data.section || 'A',
              coursesCompleted: data.coursesCompleted ?? 12,
              coursesOngoing: data.coursesOngoing ?? 5,
              avatarUrl: data.avatarUrl || 'https://placehold.co/200x200.png',
              avatarFallback: data.name ? data.name.charAt(0).toUpperCase() : (user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'),
              avatarHint: data.avatarHint || 'profile picture'
            });
          } else {
            // Profile doesn't exist yet, use default data
            setProfile(defaultProfileData(user));
          }
          setLoading(false);
        }, (error) => {
          console.error("Failed to fetch user profile, using defaults:", error);
          setProfile(defaultProfileData(user));
          setLoading(false);
        });
        return () => unsubProfile();
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      <AuthGuard>{children}</AuthGuard>
    </AuthContext.Provider>
  );
};

function AuthGuard({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isAuthPage = pathname === '/login' || pathname === '/signup';

    useEffect(() => {
        if (loading) {
            return; // Don't do anything while loading.
        }

        if (!user && !isAuthPage) {
            router.push('/login');
        } else if (user && isAuthPage) {
            router.push('/dashboard');
        }
    }, [user, loading, router, pathname, isAuthPage]);

    // If we are on an auth page, show it immediately.
    // The useEffect above will handle redirection if the user is already logged in.
    if (isAuthPage) {
        return <>{children}</>;
    }

    // If we are on a protected page and still loading, show a spinner.
    // But allow the auth pages to render instantly.
    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    // If loading is finished and we are on a protected route,
    // let the useEffect handle the redirect if not logged in.
    // If logged in, show the children.
    if (!user) {
        // This will be a brief flicker before the redirect happens.
        // Or we can show the loader until redirect is complete.
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    return <>{children}</>;
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
