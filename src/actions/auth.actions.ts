'use server';

import { fetchApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.success && res.data.access_token) {
      // 1. Token'ı güvenli (HttpOnly) cookie olarak kaydet
      const cookieStore = await cookies();
      cookieStore.set('token', res.data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 gün
      });
    }
  } catch (error: any) {
    // UI'da göstermek için hatayı geri dön
    return { error: error.message };
  }

  // 2. Başarılıysa dashboard'a yönlendir (try-catch dışında olmalı)
  redirect('/dashboard');
}

export async function registerAction(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const fullName = formData.get('fullName');
  const role = formData.get('role');

  try {
    await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName, role }),
    });
  } catch (error: any) {
    return { error: error.message };
  }

  // Başarılıysa login'e yönlendir
  redirect('/login');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login');
}
