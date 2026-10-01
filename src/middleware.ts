import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Kullanıcının tarayıcısındaki (Cookie) token'ı al
  const token = request.cookies.get('token')?.value;

  // 2. Korumalı Sayfalara (Dashboard) Erişmeye Çalışıyorsa:
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Token yoksa zorla Login sayfasına yönlendir!
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Zaten giriş yapmışsa (Token varsa) ve Login/Register'a girmeye çalışıyorsa:
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
    if (token) {
      // Gerek yok, zaten girişli. Dashboard'a geri yolla!
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Her şey yolundaysa normal akışa devam et
  return NextResponse.next();
}

// Middleware'in sadece belirli URL'lerde (optimizasyon için) çalışmasını sağlar
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
