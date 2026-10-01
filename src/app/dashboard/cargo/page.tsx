import { fetchApi } from '@/lib/api';
import AddCargoForm from '@/components/features/AddCargoForm';
import { Package } from 'lucide-react';

export default async function CargoPage() {
  let cargos = [];
  let ships = [];
  
  try {
    const cargoRes = await fetchApi('/cargo');
    cargos = Array.isArray(cargoRes.data) ? cargoRes.data : (cargoRes.data?.data || []);
    
    const shipRes = await fetchApi('/ships');
    ships = Array.isArray(shipRes.data) ? shipRes.data : (shipRes.data?.data || []);
  } catch (error) {
    console.error("Yükler çekilemedi", error);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-amber-200">Bekliyor</span>;
      case 'LOADED': return <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-emerald-200">Yüklendi</span>;
      case 'DISCHARGED': return <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-200">Boşaltıldı</span>;
      default: return <span>{status}</span>;
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <Package className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Yük (Cargo) Yönetimi</h1>
          <p className="text-slate-500 text-sm">Limandaki yük operasyonlarını takip edin</p>
        </div>
      </div>
      
      <AddCargoForm ships={ships} />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">İçerik Açıklaması</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Ağırlık / Tip</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Gemi (Manifesto)</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Operasyon Durumu</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {cargos.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">Henüz kayıtlı yük bulunmuyor.</td>
              </tr>
            ) : (
              cargos.map((cargo: any) => (
                <tr key={cargo.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">{cargo.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-700">{cargo.weight} Ton</span>
                    <span className="text-xs text-slate-400 block mt-0.5">{cargo.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cargo.ship ? (
                      <span className="text-indigo-600 font-medium">{cargo.ship.name}</span>
                    ) : (
                      <span className="text-slate-400">Atanmadı</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(cargo.status)}
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
