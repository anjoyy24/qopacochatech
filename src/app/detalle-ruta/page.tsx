// app/detalle-ruta/page.tsx
'use client';

import { ArrowLeft, MapPin, Clock, Truck, Navigation } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DetalleRuta() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-24 pb-20">
      <div className="max-w-md mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">RUTA "Centro Norte"</h1>
              <p className="text-sm text-gray-500">Camión #REF-042</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-emerald-50 rounded-lg p-3">
              <p className="text-xs text-emerald-700 mb-1">Estado</p>
              <p className="font-bold text-emerald-600">En ruta</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-blue-700 mb-1">Progreso</p>
              <p className="font-bold text-blue-600">65%</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Horario de recorrido</p>
                <p className="text-sm text-gray-600">08:00 AM - 11:30 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Zona de cobertura</p>
                <p className="text-sm text-gray-600">Centro - San Pedro</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Recorrido de la Ruta</h3>

          <div className="relative bg-gray-100 rounded-xl p-6 h-64 mb-4">
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
              <pattern id="grid-detail" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-detail)" />
            </svg>

            <svg className="absolute inset-4" viewBox="0 0 300 200">
              <path
                d="M 30 170 L 30 140 L 60 140 L 60 100 L 120 100 L 120 60 L 180 60 L 180 100 L 240 100 L 240 60 L 270 60"
                fill="none"
                stroke="#9333ea"
                strokeWidth="4"
                strokeDasharray="8 4"
                className="animate-pulse"
              />

              <circle cx="30" cy="170" r="8" fill="#22c55e" stroke="white" strokeWidth="2" />
              <circle cx="270" cy="60" r="8" fill="#ef4444" stroke="white" strokeWidth="2" />

              <g transform="translate(180, 96)">
                <rect x="-10" y="-8" width="20" height="16" fill="#9333ea" rx="4" />
                <path d="M -4 -2 L 4 -2 L 0 4 Z" fill="white" />
              </g>
            </svg>

            <div className="absolute bottom-4 right-4 bg-white rounded-lg px-3 py-2 shadow-md">
              <Navigation className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5" />
              <div>
                <p className="font-medium text-gray-800">Punto de Inicio</p>
                <p className="text-sm text-gray-600">Av. Oquendo esq. C. Junín</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pl-6">
              <div className="w-px h-8 bg-purple-300" />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full mt-1.5" />
              <div>
                <p className="font-medium text-gray-800">Ubicación Actual</p>
                <p className="text-sm text-gray-600">Av. América altura Plaza Colón</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pl-6">
              <div className="w-px h-8 bg-purple-300" />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5" />
              <div>
                <p className="font-medium text-gray-800">Punto Final</p>
                <p className="text-sm text-gray-600">Plaza 14 de Septiembre</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3">Calles Principales</h3>
          <div className="space-y-2">
            {[
              'Av. Oquendo',
              'C. Nataniel Aguirre',
              'Av. América',
              'C. España',
              'Plaza 14 de Septiembre'
            ].map((calle, index) => (
              <div
                key={calle}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
              >
                <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-gray-700">{calle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}