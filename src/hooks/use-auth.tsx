
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
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
              // In a real app, you might want to create the profile here
              // For now, we'll assume it exists after signup
              setProfile(null);
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            setProfile(null); // Set profile to null on error
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
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
            return; // Don't do anything while loading
        }

        const isAuthPage = pathname === '/login' || pathname === '/signup';

        if (!user && !isAuthPage) {
            router.push('/login');
        } else if (user && isAuthPage) {
            router.push('/dashboard');
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    if (!user && !isAuthPage) {
        // Still loading or about to be redirected, show a loader
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
