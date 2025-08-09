
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        // Use onSnapshot to listen for real-time updates
        const unsubProfile = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfile({
              uid: user.uid,
              name: data.name || 'Stacy Lerner',
              email: user.email || '',
              department: data.department || 'Computer Science',
              class: data.class || 'Senior Year',
              section: data.section || 'A',
              coursesCompleted: data.coursesCompleted ?? 12,
              coursesOngoing: data.coursesOngoing ?? 5,
              avatarUrl: 'https://placehold.co/200x200.png',
              avatarFallback: data.name ? data.name.charAt(0).toUpperCase() : 'SL',
              avatarHint: 'profile picture'
            });
          } else {
            setProfile(null);
          }
          setLoading(false); // Stop loading once we have a profile or know it doesn't exist.
        }, (error) => {
          console.error("Failed to fetch user profile:", error);
          setProfile(null);
          setLoading(false);
        });
        return () => unsubProfile(); // Cleanup the profile listener
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

    useEffect(() => {
        if (loading) {
            return; // Don't do anything while loading auth state initially.
        }

        const isAuthPage = pathname === '/login' || pathname === '/signup';

        if (!user && !isAuthPage) {
            router.push('/login');
        } else if (user && isAuthPage) {
            router.push('/dashboard');
        }
    }, [user, loading, router, pathname]);

    const isAuthPage = pathname === '/login' || pathname === '/signup';

    // While loading, if we're not on an auth page, show a loader. 
    // Otherwise, render the auth page immediately.
    if (loading && !isAuthPage) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    // If not loading, or if we are loading but on an auth page, render children.
    // The redirect logic inside useEffect will handle routing them to the correct page.
    return <>{children}</>;
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
