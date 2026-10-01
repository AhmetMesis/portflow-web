'use client';

import { useState, useTransition } from 'react';
import { dockShipAction, undockShipAction } from '@/actions/berth.actions';
import { Ship, Waves, Anchor } from 'lucide-react';

interface DockShipFormProps {
  berthId: number;
  berthStatus: string;
  dockedShip?: any;
  availableShips: any[];
}

export default function DockShipForm({ berthId, berthStatus, dockedShip, availableShips }: DockShipFormProps) {
  const [selectedShip, setSelectedShip] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleDock = () => {
    if (!selectedShip) return;
    setError('');
    
    startTransition(async () => {
      const res = await dockShipAction(berthId, parseInt(selectedShip, 10));
      if (!res.success) {
        setError(res.error || 'Yanaştırma başarısız oldu.');
      } else {
        setSelectedShip('');
      }
    });
  };

  const handleUndock = () => {
    if (!dockedShip) return;
    setError('');
    
    startTransition(async () => {
      const res = await undockShipAction(berthId, dockedShip.id);
      if (!res.success) {
        setError(res.error || 'Ayrılma başarısız oldu.');
      }
    });
  };

  if (berthStatus === 'OCCUPIED' && dockedShip) {
    return (
      <div className="mt-4 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Ship className="w-4 h-4 text-indigo-600" />
          <h4 className="font-semibold text-indigo-900 text-sm">Bağlı Gemi</h4>
        </div>
        <div className="bg-white p-3 rounded-lg border border-indigo-50 mb-3 shadow-sm">
          <p className="text-sm font-bold text-slate-800">{dockedShip.name}</p>
          <p className="text-xs text-slate-500 mt-1">{dockedShip.type} • {dockedShip.grossTonnage} Ton</p>
        </div>
        
        {error && <p className="text-xs text-red-600 mt-2 bg-red-50 p-2 rounded">{error}</p>}
        
        <button 
          onClick={handleUndock}
          disabled={isPending}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white text-sm py-2.5 rounded-lg transition-all font-medium disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
        >
          <Waves className="w-4 h-4" />
          {isPending ? 'Ayrılıyor...' : 'Denize Uğurla (Undock)'}
        </button>
      </div>
    );
  }

  if (berthStatus === 'AVAILABLE') {
    return (
      <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <h4 className="font-semibold text-slate-700 text-sm mb-3">Gemi Yanaştır</h4>
        <select 
          value={selectedShip} 
          onChange={(e) => setSelectedShip(e.target.value)}
          className="w-full text-sm border-slate-200 rounded-lg px-3 py-2.5 mb-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition border"
        >
          <option value="">Gemi Seçiniz...</option>
          {availableShips.map(ship => (
            <option key={ship.id} value={ship.id}>
              {ship.name} ({ship.grossTonnage} Ton)
            </option>
          ))}
        </select>
        
        {error && <p className="text-xs text-red-600 mt-1 mb-2 bg-red-50 p-2 rounded">{error}</p>}

        <button 
          onClick={handleDock}
          disabled={isPending || !selectedShip}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2.5 rounded-lg transition-all font-medium disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm shadow-indigo-200"
        >
          <Anchor className="w-4 h-4" />
          {isPending ? 'Yanaştırılıyor...' : 'Rıhtıma Bağla (Dock)'}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-center justify-center font-medium">
      Rıhtım Bakımda (MAINTENANCE)
    </div>
  );
}
