import { cookies } from 'next/headers';

const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  // Next.js Server üzerinden cookie'leri okuyoruz
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    // Backend'deki GlobalExceptionFilter'ın formatına göre hatayı fırlatıyoruz
    throw new Error(data.error || 'Bir hata oluştu');
  }

  return data; // { success: true, data: ... } dönecek
}
