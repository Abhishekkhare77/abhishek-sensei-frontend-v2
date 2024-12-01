"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { signup } from '@/api/register';
import { useSession } from 'next-auth/react';
import { fetchYouTubeData } from '@/utils/fetchYoutubeData';

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const [category, setCategory] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(
    {
      mutationFn: signup,
      onSuccess: (data) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.access_token);
        }
        router.push('/');
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Sign up failed 🚫',
          description: 'Please check your credentials and try again.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        console.error('Sign up failed', error.response?.data || error.message);
      },
    }
  );

  const onSubmit = async (formData) => {
    try {
      const youtubeData = await fetchYouTubeData(session.accessToken);
      console.log('YouTube Data:', youtubeData);

      const payload = {
        ...formData,
        youtube_channel_data: youtubeData,
        channel_category: category,
      };

      mutation.mutate(payload);
    } catch (error) {
      console.error('Error fetching YouTube data', error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] bg-gradient-to-br from-secondary via-background to-secondary shadow-lg p-2">
        <CardHeader>
          <CardTitle >Register new account</CardTitle>
          <CardDescription className="text-primary-foreground/50">Fill the details to register your account.</CardDescription>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="channel_link" className="text-primary-foreground">YouTube Channel Link</Label>
                <Input id="channel_link" placeholder="Enter your YouTube channel link."
                  {...register('channel_link', { required: 'Channel Link is required.' })}
                />
                {errors.channel_link && <p className="text-red-500">{errors.channel_link.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="channel_category" className="text-primary-foreground">YouTube Channel Category</Label>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Channel Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="howto">How-to & Style</SelectItem>
                    <SelectItem value="people">People & Blogs</SelectItem>
                    <SelectItem value="nonprofits">Nonprofits & Activism</SelectItem>
                    <SelectItem value="film">Film & Animation</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                  </SelectContent>
                </Select>
                {errors.channel_category && <p className="text-red-500">{errors.channel_category.message}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              {mutation.isPending ? 'Signing up...' : 'Sign up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex items-center justify-between w-full font-semibold tracking-tight">
            <div className="text-gray-400">Already have an account?</div>
            <div className="text-red-500 hover:underline cursor-pointer" onClick={() => router.push('/login')}>Login</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
