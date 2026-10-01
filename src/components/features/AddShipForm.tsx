'use client';

import { useActionState, useEffect, useRef } from 'react';
import { createShipAction } from '@/actions/ship.actions';
import { Plus } from 'lucide-react';

export default function AddShipForm() {
  const [state, formAction, isPending] = useActionState(createShipAction, null);
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
          <Plus className="text-indigo-600 w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Sisteme Gemi Ekle</h2>
      </div>
      
      <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gemi Adı</label>
          <input name="name" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">IMO Numarası</label>
          <input name="imoNumber" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Bayrak (Ülke)</label>
          <input name="flag" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gemi Tipi</label>
          <select name="type" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
            <option value="CONTAINER">Konteyner (CONTAINER)</option>
            <option value="TANKER">Tanker (TANKER)</option>
            <option value="BULK">Dökme Yük (BULK)</option>
            <option value="RO_RO">Araç Taşıyıcı (RO_RO)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Brüt Tonaj</label>
          <input name="grossTonnage" type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Uzunluk (Metre)</label>
          <input name="length" type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>

        <div className="md:col-span-3 flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
          <div className="text-sm font-medium">
            {state?.error && <span className="text-red-500 bg-red-50 px-3 py-1 rounded-md">{state.error}</span>}
            {state?.success && <span className="text-green-600 bg-green-50 px-3 py-1 rounded-md">{state.message}</span>}
          </div>
          
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md shadow-indigo-200 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isPending ? 'Kaydediliyor...' : 'Gemiyi Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
