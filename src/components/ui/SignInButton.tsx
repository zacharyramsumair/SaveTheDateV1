'use client'

import { signIn } from 'next-auth/react';
import { FC, useState } from 'react';
import { Button } from './Button';
import { toast } from './Toast';

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await signIn('google');
    } catch (error) {
      toast({
        title: 'Error signing in',
        message: 'Please try again later.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading} className='hidden  md:flex'>
      Sign in
    </Button>
  );
};

export default SignInButton;
