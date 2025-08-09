
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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch profile only when user is confirmed
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
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            // Handle error appropriately, maybe sign out user
            // or show a toast notification.
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

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
    // Still show loader while redirecting
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading: !(!loading && user) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
