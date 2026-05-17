'use client';

import { QrCode, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Reciclaje() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-end mb-6">
          <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">♻</span>
            </div>
            <span className="font-semibold text-emerald-600">77 Puntos</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/qopa')}
            className="w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                <QrCode className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-1">ESCANEO</h2>
                <p className="text-sm text-gray-600">Escanea códigos QR y gana puntos</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => alert('Próximamente: Pasarela de pagos')}
            className="w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-1">PAGOS DE SERVICIOS</h2>
                <p className="text-sm text-gray-600">Paga tus servicios fácilmente</p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Canjea tus puntos</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Descuento 10%</p>
                <p className="text-xs text-gray-600">Servicios públicos</p>
              </div>
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                50 pts
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Descuento 15%</p>
                <p className="text-xs text-gray-600">Trámites municipales</p>
              </div>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                75 pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}