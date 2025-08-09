import Link from 'next/link';
import { GraduationCap, LogIn, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-headline font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to access your student hub</p>
        </div>
      <Card className="shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" required className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" required className="pl-10" />
              </div>
            </div>
            <Button asChild type="submit" className="w-full !mt-8" size="lg">
              <Link href="/dashboard">
                <LogIn className="mr-2 h-5 w-5" /> Sign In
              </Link>
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
