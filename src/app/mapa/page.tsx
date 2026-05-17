'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Trash2, Recycle, Truck, X, Clock, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

type FilterType = 'contenedores' | 'reciclaje' | 'camiones';

interface MapMarker {
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

const mockMarkers: MapMarker[] = [
  { id: '1', type: 'contenedores', lat: -17.3895, lng: -66.1568, status: 'disponible', address: 'Av. Oquendo #234', fillLevel: 30 },
  { id: '2', type: 'contenedores', lat: -17.3925, lng: -66.1545, status: 'lleno', address: 'C. Nataniel Aguirre #445', fillLevel: 95 },
  { id: '3', type: 'contenedores', lat: -17.3865, lng: -66.1590, status: 'disponible', address: 'Av. América #789', fillLevel: 45 },
  { id: '4', type: 'reciclaje', lat: -17.3915, lng: -66.1540, address: 'Mercado Calatayud', fillLevel: 0 },
  { id: '5', type: 'reciclaje', lat: -17.3950, lng: -66.1520, address: 'Plaza Colón', fillLevel: 0 },
  { id: '6', type: 'camiones', lat: -17.3890, lng: -66.1575, route: 'Ruta Centro', schedule: '08:00 - 12:00' },
  { id: '7', type: 'camiones', lat: -17.3880, lng: -66.1555, route: 'Ruta Norte', schedule: '14:00 - 18:00' },
];

export default function MapView() {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['contenedores', 'reciclaje', 'camiones']);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredMarkers = mockMarkers.filter(marker => activeFilters.includes(marker.type));

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="max-w-md mx-auto h-[calc(100vh-176px)]">
        {/* Filtros */}
        <div className="px-4 pb-3 bg-white border-b">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => toggleFilter('contenedores')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                activeFilters.includes('contenedores')
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 border border-gray-300'
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
                  : 'bg-gray-100 text-gray-700 border border-gray-300'
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
                  : 'bg-gray-100 text-gray-700 border border-gray-300'
              }`}
            >
              <Truck className="w-4 h-4" />
              Camiones
            </button>
          </div>
        </div>

        {/* Mapa */}
        <div className="relative flex-1 rounded-lg overflow-hidden shadow-lg mx-4 my-2">
          {mounted ? (
            <Suspense fallback={<div className="w-full h-full bg-gray-200 flex items-center justify-center">Cargando mapa...</div>}>
              <MapContainer center={[-17.3895, -66.1568]} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {filteredMarkers.map(marker => (
                  <Marker
                    key={marker.id}
                    position={[marker.lat, marker.lng]}
                    eventHandlers={{
                      click: () => setSelectedMarker(marker),
                    }}
                  >
                    <Popup closeButton={false}>{marker.address || marker.route}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Suspense>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 mb-2 mx-auto"></div>
                <p className="text-gray-600">Cargando mapa...</p>
              </div>
            </div>
          )}
        </div>

        {/* Info Card */}
        {selectedMarker && (
          <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-gray-800">
                {selectedMarker.type === 'contenedores' && '🗑️ Contenedor de Basura'}
                {selectedMarker.type === 'reciclaje' && '♻️ Punto de Reciclaje'}
                {selectedMarker.type === 'camiones' && '🚛 Camión Recolector'}
              </h3>
              <button onClick={() => setSelectedMarker(null)} className="text-gray-400 hover:text-gray-600">
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedMarker.status === 'disponible'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
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
                      className={`h-2 rounded-full transition-all ${selectedMarker.fillLevel! > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
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
                <button
                  onClick={() => router.push('/detalle-ruta')}
                  className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors"
                >
                  Ver ruta completa
                </button>
              </div>
            )}
          </div>
        )}

        {/* Leyenda */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 text-xs max-w-40">
          <p className="font-bold mb-2 text-gray-800">Leyenda</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-700">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">Lleno</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Reciclaje</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Camión</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
