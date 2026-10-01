'use client';

import { useActionState, useEffect, useRef } from 'react';
import { createDocumentAction } from '@/actions/document.actions';
import { FilePlus } from 'lucide-react';

export default function AddDocumentForm({ ships, cargos }: { ships: any[], cargos: any[] }) {
  const [state, formAction, isPending] = useActionState(createDocumentAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <FilePlus className="text-indigo-600 w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Yeni Belge Yükle</h2>
      </div>
      
      <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Belge Başlığı</label>
          <input name="title" type="text" placeholder="Örn: X Gemisi Sağlık Sertifikası" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Belge Türü</label>
          <select name="type" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
            <option value="MANIFEST">Manifesto (MANIFEST)</option>
            <option value="CUSTOMS">Gümrük Belgesi (CUSTOMS)</option>
            <option value="HEALTH">Sağlık Sertifikası (HEALTH)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">İlgili Gemi (Opsiyonel)</label>
          <select name="shipId" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
            <option value="">Gemi Seçiniz...</option>
            {ships.map(ship => (
              <option key={ship.id} value={ship.id}>{ship.name}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">İlgili Yük (Opsiyonel)</label>
          <select name="cargoId" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
            <option value="">Yük Seçiniz...</option>
            {cargos.map(cargo => (
              <option key={cargo.id} value={cargo.id}>{cargo.description}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Dosya URL (S3 / Storage Linki)</label>
          <input name="fileUrl" type="url" placeholder="https://..." required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Son Geçerlilik Tarihi (Opsiyonel)</label>
          <input name="expiresAt" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>

        <div className="md:col-span-4 flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
          <div className="text-sm font-medium">
            {state?.error && <span className="text-red-500 bg-red-50 px-3 py-1 rounded-md">{state.error}</span>}
            {state?.success && <span className="text-green-600 bg-green-50 px-3 py-1 rounded-md">{state.message}</span>}
          </div>
          
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md shadow-indigo-200 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isPending ? 'Yükleniyor...' : 'Sisteme Ekle'}
          </button>
        </div>
      </form>
    </div>
  );
}
