
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/dashboard');
    }, [router]);
    
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
