import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useMutation } from 'react-query';

export const useMutateAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const reset = () => {
    setEmail('');
    setPassword('');
  };
  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const loginWithGoogleMutation = useMutation(
    async () => {
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'google',
      })
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginWithGoogleMutation,
    loginMutation,
    registerMutation,
  };
};
