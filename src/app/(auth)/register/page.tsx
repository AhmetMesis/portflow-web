'use client';

import { useActionState } from 'react';
import { registerAction } from '@/actions/auth.actions';
import Link from 'next/link';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">PortFlow Kayıt</h1>
        
        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Ad Soyad</label>
            <input 
              name="fullName" 
              type="text" 
              required 
              className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">E-Posta</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Parola</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Rol</label>
            <select name="role" className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none">
              <option value="VIEWER">İzleyici (Viewer)</option>
              <option value="OPERATOR">Operatör</option>
              <option value="ADMIN">Yönetici (Admin)</option>
            </select>
          </div>

          {state?.error && (
            <div className="rounded bg-red-100 p-2 text-sm text-red-600">
              {state.error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full rounded bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Zaten hesabın var mı? <Link href="/login" className="text-blue-600 hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}
