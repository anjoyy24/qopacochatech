'use client'; // Necesario por los hooks y la interactividad

import { useState } from 'react';
import { Trash2, Recycle, Truck, Navigation, X, Clock, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation'; // 👈 cambio clave

type FilterType = 'contenedores' | 'reciclaje' | 'camiones';

interface Marker {
  id: string;
  type: FilterType;
  lat: number;
  lng: number;
  status?: 'disponible' | 'lleno';
  address?: string;
  fillLevel?: number;
  route?: string;
  schedule?: string;
}

const mockMarkers: Marker[] = [
  { id: '1', type: 'contenedores', lat: -17.393, lng: -66.157, status: 'disponible', address: 'Av. Oquendo #234', fillLevel: 30 },
  { id: '2', type: 'contenedores', lat: -17.395, lng: -66.159, status: 'lleno', address: 'C. Nataniel Aguirre #445', fillLevel: 95 },
  { id: '3', type: 'contenedores', lat: -17.397, lng: -66.155, status: 'disponible', address: 'Av. América #789', fillLevel: 45 },
  { id: '4', type: 'reciclaje', lat: -17.394, lng: -66.154, address: 'Mercado Calatayud', fillLevel: 0 },
  { id: '5', type: 'reciclaje', lat: -17.399, lng: -66.160, address: 'Plaza Colón', fillLevel: 0 },
  { id: '6', type: 'camiones', lat: -17.396, lng: -66.158, route: 'Ruta Centro', schedule: '08:00 - 12:00' },
  { id: '7', type: 'camiones', lat: -17.392, lng: -66.156, route: 'Ruta Norte', schedule: '14:00 - 18:00' },
];

export default function MapView() {
  const router = useRouter(); // 👈 en lugar de useNavigate
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['contenedores', 'reciclaje', 'camiones']);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredMarkers = mockMarkers.filter(marker =>
    activeFilters.includes(marker.type)
  );

  const getMarkerColor = (marker: Marker) => {
    if (marker.type === 'contenedores') {
      return marker.status === 'disponible' ? 'bg-emerald-500' : 'bg-red-500';
    }
    if (marker.type === 'reciclaje') return 'bg-blue-500';
    return 'bg-purple-500';
  };

  const getMarkerIcon = (type: FilterType) => {
    if (type === 'contenedores') return Trash2;
    if (type === 'reciclaje') return Recycle;
    return Truck;
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="max-w-md mx-auto h-[calc(100vh-176px)]">
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => toggleFilter('contenedores')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                activeFilters.includes('contenedores')
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Contenedores
            </button>
            <button
              onClick={() => toggleFilter('reciclaje')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                activeFilters.includes('reciclaje')
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              <Recycle className="w-4 h-4" />
              Reciclaje
            </button>
            <button
              onClick={() => toggleFilter('camiones')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                activeFilters.includes('camiones')
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              <Truck className="w-4 h-4" />
              Camiones
            </button>
          </div>
        </div>

        <div className="relative bg-gray-200 mx-4 rounded-2xl overflow-hidden shadow-lg" style={{ height: 'calc(100% - 60px)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
              <Navigation className="w-5 h-5 text-gray-600" />
            </div>

            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {filteredMarkers.map((marker) => {
              const Icon = getMarkerIcon(marker.type);
              const position = {
                top: `${((marker.lat + 17.4) * 1000) % 80 + 10}%`,
                left: `${((marker.lng + 66.2) * 1000) % 80 + 10}%`,
              };

              return (
                <button
                  key={marker.id}
                  onClick={() => setSelectedMarker(marker)}
                  className={`absolute ${getMarkerColor(marker)} text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform`}
                  style={position}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>

          {selectedMarker && (
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-4 animate-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800">
                  {selectedMarker.type === 'contenedores' && 'Contenedor de Basura'}
                  {selectedMarker.type === 'reciclaje' && 'Punto de Reciclaje'}
                  {selectedMarker.type === 'camiones' && 'Camión Recolector'}
                </h3>
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedMarker.type === 'contenedores' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{selectedMarker.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">Estado:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedMarker.status === 'disponible'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedMarker.status === 'disponible' ? '✓ Disponible' : '✗ Lleno'}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Nivel de llenado</span>
                      <span>{selectedMarker.fillLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          selectedMarker.fillLevel! > 80 ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${selectedMarker.fillLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMarker.type === 'reciclaje' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{selectedMarker.address}</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 mt-3">
                    <p className="text-sm font-medium text-blue-900 mb-2">Materiales aceptados:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Papel', 'Plástico', 'Vidrio', 'Metal'].map(material => (
                        <span key={material} className="bg-white px-2 py-1 rounded-md text-xs text-blue-700 border border-blue-200">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                    <Clock className="w-4 h-4" />
                    <span>Lun - Sáb: 8:00 - 18:00</span>
                  </div>
                </div>
              )}

              {selectedMarker.type === 'camiones' && (
                <div className="space-y-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-purple-900">{selectedMarker.route}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-purple-700">
                      <Clock className="w-4 h-4" />
                      <span>{selectedMarker.schedule}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Calles principales:</p>
                    <p className="text-sm text-gray-800">Av. Oquendo, C. Nataniel Aguirre, Av. América</p>
                  </div>
                  <button
                    onClick={() => router.push('/detalle-ruta')} // 👈 router.push
                    className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors"
                  >
                    Ver ruta completa
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}