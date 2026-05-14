'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CallbackPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);

      setTimeout(() => {
        router.push('/home');
      }, 100);
    }
  }, [params, router]);

  return <p>Connexion en cours...</p>;
}
