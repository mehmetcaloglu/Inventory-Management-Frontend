'use client'
import React from 'react'
import { useUserContext } from './context/user';
import { useRouter } from 'next/navigation';

import Login from './login/Login';

export default function Home() {
  const userContext = useUserContext() || { user: undefined };
  const { user } = userContext;
  const router = useRouter();

  // TODO: remove after creating homepage
  if (user) {
    router.push('/items');
  } else {
    router.push('/login');
  }

  return (
    <main>
    </main>
  )
}
