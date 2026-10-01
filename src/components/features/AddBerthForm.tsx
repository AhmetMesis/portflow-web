'use client';

import { useActionState, useEffect, useRef } from 'react';
import { createBerthAction } from '@/actions/berth.actions';
import { Anchor } from 'lucide-react';

export default function AddBerthForm() {
  const [state, formAction, isPending] = useActionState(createBerthAction, null);
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
          <Anchor className="text-indigo-600 w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Sisteme Rıhtım Ekle</h2>
      </div>
      
      <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Rıhtım Adı</label>
          <input name="name" type="text" placeholder="Örn: Rıhtım 1" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Liman (Port)</label>
          <input name="portName" type="text" placeholder="Örn: Ambarlı" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Max Kapasite (Ton)</label>
          <input name="maxCapacity" type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Derinlik (Metre)</label>
          <input name="depth" type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
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
            {isPending ? 'Kaydediliyor...' : 'Rıhtımı Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
