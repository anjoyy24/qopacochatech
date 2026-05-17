import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EcoCity - Gestión de Residuos',
  description: 'Aplicación móvil para gestión inteligente de residuos y reciclaje urbano',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

