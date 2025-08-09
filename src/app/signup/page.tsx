
'use client';

import Link from 'next/link';
import { GraduationCap, UserPlus, Mail, Lock, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useTransition } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
        toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
        return;
    }

    startTransition(async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Redirect immediately and let profile creation happen in the background.
            toast({ title: "Success", description: "Account created successfully!" });
            router.push('/dashboard');

            // These will run in the background without blocking the UI.
            await updateProfile(user, { displayName: name });
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                department: 'Not Set',
                class: 'Not Set',
                section: 'Not Set',
                coursesCompleted: 0,
                coursesOngoing: 5,
                avatarUrl: 'https://placehold.co/200x200.png',
                avatarFallback: name ? name.charAt(0).toUpperCase() : 'U',
                avatarHint: 'profile picture'
            });

        } catch (error: any) {
            toast({ title: "Authentication Error", description: error.message, variant: "destructive" });
        }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-headline font-bold text-foreground">Create an Account</h1>
            <p className="text-muted-foreground mt-2">Join Nexus Learn today!</p>
        </div>
      <Card className="shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="name" type="text" placeholder="Stacy Lerner" required className="pl-10" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" required className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" required className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full !mt-8" size="lg" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
                 Sign Up
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
