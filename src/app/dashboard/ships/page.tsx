import { fetchApi } from '@/lib/api';
import AddShipForm from '@/components/features/AddShipForm';
import { Ship } from 'lucide-react';

export default async function ShipsPage() {
  let ships = [];
  
  try {
    const res = await fetchApi('/ships'); 
    // Backend eğer pagination yapıyorsa veri res.data.data içindedir, yapmıyorsa res.data bir dizidir.
    ships = Array.isArray(res.data) ? res.data : (res.data?.data || []);
  } catch (error) {
    console.error("Gemiler çekilemedi", error);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AT_SEA': return <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-200">Denizde</span>;
      case 'DOCKED': return <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-emerald-200">Rıhtımda</span>;
      case 'ARRIVING': return <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-amber-200">Yanaşıyor</span>;
      case 'DEPARTING': return <span className="bg-orange-100 text-orange-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-orange-200">Ayrılıyor</span>;
      default: return <span>{status}</span>;
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <Ship className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gemi Yönetimi</h1>
          <p className="text-slate-500 text-sm">Sisteme kayıtlı gemileri ve operasyonlarını izleyin</p>
        </div>
      </div>
      
      <AddShipForm />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Gemi Adı</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">IMO Numarası</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Bayrak</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tip / Tonaj</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Durum</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {ships.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Henüz kayıtlı gemi bulunmuyor.</td>
              </tr>
            ) : (
              ships.map((ship: any) => (
                <tr key={ship.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800">{ship.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{ship.imoNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 flex items-center gap-2">
                    <span className="text-lg">{/* İsteğe bağlı bayrak emojisi eklenebilir */}</span> {ship.flag}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-slate-700 font-medium block">{ship.type}</span>
                    <span className="text-xs text-slate-400">{ship.grossTonnage.toLocaleString()} Ton</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(ship.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
