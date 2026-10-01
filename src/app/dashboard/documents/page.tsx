import { fetchApi } from '@/lib/api';
import AddDocumentForm from '@/components/features/AddDocumentForm';
import { Files, ExternalLink } from 'lucide-react';

export default async function DocumentsPage() {
  let documents = [];
  let ships = [];
  let cargos = [];
  
  try {
    const docRes = await fetchApi('/documents');
    documents = Array.isArray(docRes.data) ? docRes.data : (docRes.data?.data || []);
    
    const shipRes = await fetchApi('/ships');
    ships = Array.isArray(shipRes.data) ? shipRes.data : (shipRes.data?.data || []);

    const cargoRes = await fetchApi('/cargo');
    cargos = Array.isArray(cargoRes.data) ? cargoRes.data : (cargoRes.data?.data || []);
  } catch (error) {
    console.error("Belgeler çekilemedi", error);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-amber-200">Onay Bekliyor</span>;
      case 'APPROVED': return <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-emerald-200">Onaylandı</span>;
      case 'REJECTED': return <span className="bg-red-100 text-red-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-red-200">Reddedildi</span>;
      default: return <span>{status}</span>;
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <Files className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bürokrasi ve Belgeler</h1>
          <p className="text-slate-500 text-sm">Gemi ve yüklere ait yasal evrakların yönetimi</p>
        </div>
      </div>
      
      {/* Backend'deki ValidateIf mantığı gereği ya shipId ya cargoId zorunludur. */}
      <AddDocumentForm ships={ships} cargos={cargos} />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Belge Adı / Tip</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">İlişkili Varlık</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Geçerlilik Tarihi</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Durum</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Dosya</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {documents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Henüz kayıtlı belge bulunmuyor.</td>
              </tr>
            ) : (
              documents.map((doc: any) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-800">{doc.title}</span>
                    <span className="text-xs text-slate-400 block mt-0.5">{doc.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {doc.shipId ? (
                      <span className="flex items-center gap-1 text-blue-600"><span className="text-xs bg-blue-100 px-1 rounded">GEMİ</span> ID: {doc.shipId}</span>
                    ) : doc.cargoId ? (
                      <span className="flex items-center gap-1 text-orange-600"><span className="text-xs bg-orange-100 px-1 rounded">YÜK</span> ID: {doc.cargoId}</span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {doc.expiresAt ? new Date(doc.expiresAt).toLocaleDateString('tr-TR') : <span className="text-slate-400">Süresiz</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                      Görüntüle <ExternalLink className="w-3 h-3" />
                    </a>
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
