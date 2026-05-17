'use client'; // Necesario por si luego agregamos interacción

import { FileText, Lightbulb, Droplet, Flame, Shield } from 'lucide-react';

const servicios = [
  {
    categoria: 'TRÁMITES',
    icon: FileText,
    color: 'from-blue-400 to-blue-600',
    items: ['SEGIP', 'Registro Civil', 'Catastro']
  },
  {
    categoria: 'LUZ',
    icon: Lightbulb,
    color: 'from-yellow-400 to-orange-500',
    items: ['ELFEC', 'Consulta de consumo']
  },
  {
    categoria: 'GAS',
    icon: Flame,
    color: 'from-red-400 to-red-600',
    items: ['YPFB', 'Solicitud de conexión']
  },
  {
    categoria: 'AGUA',
    icon: Droplet,
    color: 'from-cyan-400 to-blue-500',
    items: ['SEMAPA', 'Estado de cuenta']
  },
  {
    categoria: 'SEGUROS',
    icon: Shield,
    color: 'from-purple-400 to-purple-600',
    items: ['Seguro Obligatorio', 'SOAT']
  }
];

export default function Informacion() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Información y Servicios</h1>
          <p className="text-gray-600">Accede a servicios y trámites</p>
        </div>

        <div className="space-y-4">
          {servicios.map((servicio) => {
            const Icon = servicio.icon;
            return (
              <div
                key={servicio.categoria}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${servicio.color} p-4 flex items-center gap-3`}>
                  <Icon className="w-6 h-6 text-white" />
                  <h2 className="text-lg font-bold text-white">{servicio.categoria}</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {servicio.items.map((item) => (
                      <button
                        key={item}
                        className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700 font-medium">{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <h3 className="font-bold text-emerald-800 mb-1">Centro de Ayuda</h3>
              <p className="text-sm text-emerald-700">
                ¿Necesitas ayuda? Contacta con soporte o consulta nuestra sección de preguntas frecuentes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}