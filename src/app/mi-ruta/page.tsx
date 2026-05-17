'use client'; // Necesario por el hook y la interactividad

import { Clock, MapPin, Calendar, Navigation, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation'; // 👈 cambio clave

export default function MiRuta() {
  const router = useRouter(); // 👈 en lugar de useNavigate

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mi Ruta de Recolección</h1>
          <p className="text-gray-600">Zona: Centro - Barrio San Pedro</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Ruta "Centro Norte"</h2>
                <p className="text-sm text-gray-500">Camión #REF-042</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              Activa
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">Días de Recolección</p>
                <p className="text-sm text-gray-600">Lunes, Miércoles y Viernes</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">Horario</p>
                <p className="text-sm text-gray-600">08:00 AM - 11:30 AM</p>
                <p className="text-xs text-orange-600 mt-1">⏰ Próxima recolección: Mañana 8:30 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">Calles del Recorrido</p>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>• Av. Oquendo</li>
                  <li>• C. Nataniel Aguirre</li>
                  <li>• Av. América</li>
                  <li>• Plaza 14 de Septiembre</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/detalle-ruta')} // 👈 router.push
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            Ver mapa de la ruta
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📍</span>
            Información de tu zona
          </h3>

          <div className="space-y-3">
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-emerald-800">Barrio</span>
                <span className="text-sm text-emerald-600">San Pedro</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-emerald-800">Calle</span>
                <span className="text-sm text-emerald-600">Av. Oquendo #1234</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-xs text-blue-800 mt-1">Días por semana</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-xs text-purple-800 mt-1">Puntualidad</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">💡 Tip:</span> Saca tu basura antes de las 8:00 AM los días de recolección para asegurar que sea recogida.
          </p>
        </div>
      </div>
    </div>
  );
}