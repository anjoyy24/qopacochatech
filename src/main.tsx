import type { Metadata } from 'next';
import './theme.css'; // o './styles/index.css' según tu ruta
// Si tienes otros estilos globales, impórtalos aquí.

export const metadata: Metadata = {
  title: 'Qopa Cocha Tech',
  description: 'Gestión Inteligente de Residuos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}