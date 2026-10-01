'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/actions/auth.actions';
import { Anchor, Ship, Box, FileText, LogOut, LayoutDashboard } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Ana Sayfa', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Gemiler', href: '/dashboard/ships', icon: Ship },
    { name: 'Rıhtımlar', href: '/dashboard/berths', icon: Anchor },
    { name: 'Yük (Cargo)', href: '/dashboard/cargo', icon: Box },
    { name: 'Belgeler', href: '/dashboard/documents', icon: FileText },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-slate-300 min-h-screen flex flex-col font-sans">
      <div className="h-20 flex items-center px-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Anchor className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">PortFlow</h2>
            <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold">Liman Yönetimi</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Operasyonlar</p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <form action={logoutAction}>
          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500 hover:text-white text-slate-300 py-3 rounded-xl transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sistemden Çıkış</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
