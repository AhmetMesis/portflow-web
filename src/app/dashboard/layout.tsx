import Sidebar from '@/components/ui/Sidebar';
import { Bell, User } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Üst Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <h1 className="text-xl font-bold text-slate-800">Operasyon Merkezi</h1>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-indigo-600 transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-semibold text-slate-700">Yetkili Personel</p>
                <p className="text-slate-400 text-xs">ADMIN</p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Ana İçerik */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
