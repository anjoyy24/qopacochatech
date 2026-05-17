import type { Metadata } from 'next';
import { Header } from '../src/app/components/Header';
import { BottomNav } from '../src/app/components/BottomNav';
import { AuthProvider } from '../src/context/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'QOPA - Gestión de Residuos',
  description: 'Aplicación móvil para gestión inteligente de residuos y reciclaje urbano',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <AuthProvider>
          <Header />
          <main className="pt-28 pb-20 max-w-md mx-auto">
            {children}
          </main>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}



