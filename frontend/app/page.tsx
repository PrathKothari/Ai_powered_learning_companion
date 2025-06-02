'use client';

import DashboardWrapper from '../components/DashboardWrapper';
console.log('typeof DashboardWrapper:', typeof DashboardWrapper);
export default function HomePage() {
  return (
    <main className="p-4">
      <DashboardWrapper />
    </main>
  );
}
