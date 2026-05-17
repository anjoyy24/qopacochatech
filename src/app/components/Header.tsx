// components/Header.tsx (versión con Link)
'use client';

import { Leaf, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Header() {
  const pathname = usePathname();
  const showUserIcon = pathname !== '/usuario';

  const handleLogoClick = () => {
    // Si quieres que el logo navegue al home
    if (pathname !== '/') {
      window.location.href = '/';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md z-50">
      <div className="max-w-md mx-auto flex items-center justify-between h-14 px-4">
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <Leaf className="w-6 h-6" />
          <span className="font-bold text-lg">QOPA</span>
        </div>
        {showUserIcon && (
          <Link
            href="/usuario"
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>
        )}
      </div>
      <div className="bg-teal-400 h-8 flex items-center px-4">
        <span className="text-sm flex items-center gap-2">
          <span className="font-medium">Cochabamba</span>
          <Recycle className="w-4 h-4" />
        </span>
      </div>
    </header>
  );
}

function Recycle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m7 16h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="M12 3v18M3 12h18" />
    </svg>
  );
}