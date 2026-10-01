import { fetchApi } from '@/lib/api';
import { Ship, Anchor, Package, FileText, Activity, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  // Verileri çekip istatistik üreteceğiz
  let ships = [];
  let berths = [];
  let cargos = [];
  let documents = [];

  try {
    const [shipRes, berthRes, cargoRes, docRes] = await Promise.all([
      fetchApi('/ships'),
      fetchApi('/berths'),
      fetchApi('/cargo'),
      fetchApi('/documents')
    ]);

    ships = Array.isArray(shipRes.data) ? shipRes.data : (shipRes.data?.data || []);
    berths = Array.isArray(berthRes.data) ? berthRes.data : (berthRes.data?.data || []);
    cargos = Array.isArray(cargoRes.data) ? cargoRes.data : (cargoRes.data?.data || []);
    documents = Array.isArray(docRes.data) ? docRes.data : (docRes.data?.data || []);
  } catch (error) {
    console.error("Dashboard verileri çekilemedi", error);
  }

  // İstatistik hesaplamaları
  const dockedShips = ships.filter((s: any) => s.status === 'DOCKED').length;
  const availableBerths = berths.filter((b: any) => b.status === 'AVAILABLE').length;
  const pendingDocs = documents.filter((d: any) => d.status === 'PENDING').length;
  const totalCargoWeight = cargos.reduce((sum: number, c: any) => sum + (c.weight || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sisteme Hoş Geldiniz</h1>
          <p className="text-slate-500 text-sm mt-1">Limanınızın genel durumunu buradan anlık olarak izleyebilirsiniz.</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 border border-indigo-100">
          <Activity className="w-4 h-4" /> Sistem Aktif
        </div>
      </div>

      {/* Metrik Kartları (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between group hover:border-indigo-300 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Toplam Gemi</p>
              <h3 className="text-3xl font-bold text-slate-800">{ships.length}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
              <Ship className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4 flex items-center gap-1">
            <span className="text-emerald-600 font-semibold">{dockedShips} gemi</span> rıhtımda
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between group hover:border-emerald-300 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Müsait Rıhtım</p>
              <h3 className="text-3xl font-bold text-slate-800">{availableBerths} <span className="text-lg text-slate-400 font-medium">/ {berths.length}</span></h3>
            </div>
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
              <Anchor className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4 flex items-center gap-1">
            <span className="text-indigo-600 font-semibold">{berths.length - availableBerths} rıhtım</span> şu an dolu
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between group hover:border-amber-300 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Toplam İşlem Hacmi</p>
              <h3 className="text-3xl font-bold text-slate-800">{totalCargoWeight.toLocaleString()} <span className="text-lg font-medium text-slate-400">Ton</span></h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4 flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-emerald-500" /> <span className="text-slate-600">Sistemdeki tüm yükler</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between group hover:border-rose-300 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Bekleyen Belgeler</p>
              <h3 className="text-3xl font-bold text-slate-800">{pendingDocs}</h3>
            </div>
            <div className="bg-rose-100 p-3 rounded-xl text-rose-600 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4 flex items-center gap-1">
            Toplam <span className="font-semibold text-slate-700">{documents.length}</span> belge kayıtlı
          </p>
        </div>

      </div>

      {/* Hızlı Kısayollar */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Hızlı Kısayollar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/ships" className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl shadow-sm shadow-indigo-200 flex items-center justify-between transition-colors">
            <span className="font-semibold">Yeni Gemi Ekle</span>
            <Ship className="w-5 h-5 opacity-70" />
          </Link>
          <Link href="/dashboard/berths" className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl shadow-sm shadow-emerald-200 flex items-center justify-between transition-colors">
            <span className="font-semibold">Rıhtım Operasyonları</span>
            <Anchor className="w-5 h-5 opacity-70" />
          </Link>
          <Link href="/dashboard/cargo" className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-xl shadow-sm shadow-amber-200 flex items-center justify-between transition-colors">
            <span className="font-semibold">Manifesto Gir</span>
            <Package className="w-5 h-5 opacity-70" />
          </Link>
        </div>
      </div>
    </div>
  );
}
