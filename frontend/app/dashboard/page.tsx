'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardWrapper from '../../components/DashboardWrapper';

export default function DashboardPage() {
  const router = useRouter(); // You'll need this if you uncomment the redirect
  const [loading, setLoading] = useState(false); // Start with false, we're not loading initially
  const [isClient, setIsClient] = useState(false); // Start with false, set to true in useEffect

  useEffect(() => {
    // Safe way to check localStorage only on the client
    setIsClient(true);

    //  Comment this out *only* if you want to *completely* bypass authentication for testing
    // const token = localStorage.getItem('authToken');
    // if (!token) {
    //   router.replace('/login');
    // } else {
    //   setLoading(false);
    // }

    // For now, to *always* show the dashboard (without auth), just set loading to false here:
     setLoading(false);

  }, [router]);

  if (!isClient || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return <DashboardWrapper />;
}