import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/navigation';
import { Navbar } from '@/components/navbar';

export function Layout() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main className="pt-16 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      <Navigation />
    </div>
  );
}