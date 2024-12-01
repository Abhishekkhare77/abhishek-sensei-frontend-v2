"use client";
import { login } from '@/api/login';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

const Page = () => {
  const { toast } = useToast()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(
    {
      mutationFn: login,
      onSuccess: (data) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.access_token);
        }
        router.push('/dashboard');
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Login failed 🚫",
          description: "Please check your email and password and try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        console.error('Login failed:', error.response?.data || error.message);
      },
    });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };


  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] bg-gradient-to-br from-secondary via-background to-secondary shadow-lg p-2">
        <CardHeader>
          <CardTitle >Log in to your account</CardTitle>
          <CardDescription className="text-primary-foreground/50">Welcome back! Please enter your details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-primary-foreground">Email</Label>
                <Input id="email" placeholder="Enter your email address."
                  {...register('email', { required: 'Email is required.' })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-primary-foreground">Password</Label>
                <Input id="password" placeholder="Enter your password."
                  {...register('password', { required: 'Password is required.' })}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
            </div>
            <div className='flex w-full justify-end pt-2'>
              <Link href={"/forgot-password"} className='hover:underline text-primary-foreground/50'>Forgot Password?</Link>
            </div>
            <Button type="submit" className="w-full mt-4">
              {mutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className='flex items-center justify-between w-full font-semibold tracking-tight'>
            <div className='text-primary-foreground/50'>Don&apos;t have an account?</div>
            <div className='text-primary hover:underline cursor-pointer' onClick={() => router.push('/register')}>Sign up</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page
