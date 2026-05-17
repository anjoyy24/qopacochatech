// components/BottomNav.tsx
'use client';

import { Home, Recycle, Info, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { path: '/', label: 'HOME', icon: Home },
    { path: '/reciclaje', label: 'Reciclaje', icon: Recycle },
    { path: '/informacion', label: 'Información', icon: Info },
    { path: '/usuario', label: 'USER', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-emerald-600'
                  : 'text-gray-500 hover:text-emerald-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}