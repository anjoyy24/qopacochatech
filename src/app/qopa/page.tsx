'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { QrCode, X, CheckCircle, Sparkles } from 'lucide-react';

const QrReader = dynamic(() => import('react-qr-reader').then(mod => mod.QrReader), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">Cargando cámara...</div>
});

export default function QOPA() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [recentScans, setRecentScans] = useState<Array<{ code: string; points: number; date: string }>>([]);

  const handleScan = (result: any) => {
    if (result?.text) {
      const code = result.text;

      if (!recentScans.find(s => s.code === code)) {
        const earnedPoints = Math.floor(Math.random() * 50) + 10;
        setScannedCode(code);
        setPoints(p => p + earnedPoints);
        setRecentScans(prev => [
          {
            code,
            points: earnedPoints,
            date: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
          },
          ...prev
        ].slice(0, 5));

        setTimeout(() => setScannedCode(null), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pt-24 pb-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">QOPA</h1>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">{points} pts</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {!isScanning ? (
            <button
              onClick={() => setIsScanning(true)}
              className="w-full p-8 flex flex-col items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <QrCode className="w-12 h-12 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold text-gray-800">INICIAR ESCANEO</h2>
                <p className="text-sm text-gray-600 mt-1">Toca para activar la cámara</p>
              </div>
            </button>
          ) : (
            <div className="relative">
              <Suspense fallback={<div className="h-64 bg-gray-200 flex items-center justify-center">Cargando cámara...</div>}>
                <QrReader
                  onResult={handleScan}
                  onError={(error) => console.log('QR Error:', error)}
                  constraints={{ facingMode: 'environment' }}
                  containerStyle={{ width: '100%' }}
                  videoStyle={{ width: '100%', height: 'auto' }}
                />
              </Suspense>
              <button
                onClick={() => setIsScanning(false)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          )}
        </div>

        {scannedCode && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4 mb-6 animate-in slide-in-from-top">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900">¡Código escaneado!</p>
                <p className="text-sm text-emerald-700">{scannedCode}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Historial de escaneos</h3>

          {recentScans.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No hay escaneos aún. ¡Comienza a escanear!</p>
          ) : (
            <div className="space-y-3">
              {recentScans.map((scan, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{scan.date}</p>
                    <p className="text-sm text-gray-700 font-mono">{scan.code.substring(0, 20)}...</p>
                  </div>
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    +{scan.points}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}