'use client'; // Necesario porque el componente es interactivo (aunque no tenga hooks aún)

import { User, Mail, Award, Settings, LogOut } from 'lucide-react';

export default function Usuario() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pt-24 pb-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <User className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-1">USER3283278</h2>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Mail className="w-4 h-4" />
              <span className="text-sm">user382@gmail.com</span>
            </div>

            <div className="w-full bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 text-center border-2 border-amber-300">
              <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <div className="text-5xl font-bold text-amber-700 mb-1">77</div>
              <div className="text-sm font-medium text-amber-800">Puntos Acumulados</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Estadísticas</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">12</div>
              <div className="text-xs text-emerald-800 mt-1">Escaneos realizados</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">5.2kg</div>
              <div className="text-xs text-blue-800 mt-1">Reciclado este mes</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-xs text-purple-800 mt-1">Días activo</div>
            </div>
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-teal-600">3</div>
              <div className="text-xs text-teal-800 mt-1">Nivel actual</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <h3 className="font-bold text-gray-800 p-6 pb-4">Logros Recientes</h3>

          <div className="px-6 pb-6 space-y-3">
            <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3">
              <div className="text-2xl">🏆</div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">Primer Escaneo</p>
                <p className="text-xs text-gray-600">Completado hace 8 días</p>
              </div>
              <span className="text-emerald-600 font-bold text-sm">+10</span>
            </div>

            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3">
              <div className="text-2xl">⭐</div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">Eco Guerrero</p>
                <p className="text-xs text-gray-600">10+ reciclajes</p>
              </div>
              <span className="text-blue-600 font-bold text-sm">+25</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-3 hover:shadow-lg transition-shadow">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-800">Configuración</span>
          </button>

          <button className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-3 hover:shadow-lg transition-shadow text-red-600">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}