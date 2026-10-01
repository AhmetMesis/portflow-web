'use client';

import { useActionState } from 'react';
import { loginAction } from '@/actions/auth.actions';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">PortFlow Giriş</h1>
        
        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">E-Posta</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
              defaultValue="admin@portflow.com"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Parola</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
              defaultValue="123456"
            />
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
            {isPending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Hesabın yok mu? <Link href="/register" className="text-blue-600 hover:underline">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
}
