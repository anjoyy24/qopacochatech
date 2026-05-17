'use client'; // Necesario porque usamos hooks e interactividad

import { MapPin, Navigation, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation'; // 👈 cambio clave

export default function Home() {
  const router = useRouter(); // 👈 en lugar de useNavigate

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pt-24 pb-20 px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-4">
            <Sparkles className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Gestión Inteligente de Residuos
          </h1>
          <p className="text-gray-600">
            Conectando tu ciudad con el reciclaje
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/qopa')} // 👈 router.push
            className="w-full bg-white border-2 border-emerald-500 text-emerald-600 font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl hover:bg-emerald-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="w-8 h-8" />
              <span className="text-lg">QOPA</span>
              <span className="text-sm text-gray-500">Escanea y gana puntos</span>
            </div>
          </button>

          <button
            onClick={() => router.push('/mapa')}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-8 h-8" />
              <span className="text-lg">VER MAPA</span>
              <span className="text-sm opacity-90">Contenedores y rutas</span>
            </div>
          </button>

          <button
            onClick={() => router.push('/mi-ruta')}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-2">
              <Navigation className="w-8 h-8" />
              <span className="text-lg">MI RUTA</span>
              <span className="text-sm opacity-90">Horarios de recolección</span>
            </div>
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-emerald-600">150+</div>
            <div className="text-xs text-gray-600 mt-1">Contenedores</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-blue-600">45</div>
            <div className="text-xs text-gray-600 mt-1">Puntos Reciclaje</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-teal-600">12</div>
            <div className="text-xs text-gray-600 mt-1">Rutas Activas</div>
          </div>
        </div>
      </div>
    </div>
  );
}