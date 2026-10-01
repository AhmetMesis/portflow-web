import { fetchApi } from '@/lib/api';
import AddBerthForm from '@/components/features/AddBerthForm';
import DockShipForm from '@/components/features/DockShipForm';
import { Anchor } from 'lucide-react';

export default async function BerthsPage() {
  let berths = [];
  let availableShips = [];
  
  try {
    const berthRes = await fetchApi('/berths');
    berths = Array.isArray(berthRes.data) ? berthRes.data : (berthRes.data?.data || []);
    
    const shipRes = await fetchApi('/ships?status=AT_SEA');
    availableShips = Array.isArray(shipRes.data) ? shipRes.data : (shipRes.data?.data || []);
  } catch (error) {
    console.error("Veriler çekilemedi", error);
  }

  const getStatusColor = (status: string) => {
    if (status === 'AVAILABLE') return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (status === 'OCCUPIED') return 'bg-indigo-50 text-indigo-800 border-indigo-200';
    return 'bg-red-50 text-red-800 border-red-200'; // MAINTENANCE
  };

  const getStatusBadge = (status: string) => {
    if (status === 'AVAILABLE') return <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md">MÜSAİT</span>;
    if (status === 'OCCUPIED') return <span className="text-[10px] font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md">DOLU</span>;
    return <span className="text-[10px] font-bold px-2 py-1 bg-red-100 text-red-700 rounded-md">BAKIMDA</span>;
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <Anchor className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Rıhtım Operasyonları</h1>
          <p className="text-slate-500 text-sm">Liman rıhtımlarını ve gemi yanaştırma işlemlerini yönetin</p>
        </div>
      </div>
      
      <AddBerthForm />

      <h2 className="text-xl font-bold text-slate-800 mb-6 mt-10 border-b border-slate-200 pb-3">Mevcut Rıhtımlar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {berths.length === 0 ? (
          <p className="text-slate-500 col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center">Kayıtlı rıhtım bulunamadı.</p>
        ) : (
          berths.map((berth: any) => {
            const dockedShip = berth.ships?.find((s: any) => s.status === 'DOCKED');

            return (
              <div key={berth.id} className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden flex flex-col transition hover:shadow-md">
                <div className={`p-5 border-b flex justify-between items-start ${getStatusColor(berth.status)}`}>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{berth.name}</h3>
                    <p className="text-xs font-medium opacity-80 mt-1">{berth.portName} Limanı</p>
                  </div>
                  {getStatusBadge(berth.status)}
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-between bg-slate-50/50">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm text-center">
                      <p className="text-xs text-slate-500 font-semibold mb-1">Kapasite</p>
                      <p className="font-bold text-slate-700">{berth.maxCapacity} <span className="text-xs font-normal">Ton</span></p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm text-center">
                      <p className="text-xs text-slate-500 font-semibold mb-1">Derinlik</p>
                      <p className="font-bold text-slate-700">{berth.depth} <span className="text-xs font-normal">Metre</span></p>
                    </div>
                  </div>
                  
                  <DockShipForm 
                    berthId={berth.id} 
                    berthStatus={berth.status} 
                    dockedShip={dockedShip} 
                    availableShips={availableShips} 
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
