"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, CreditCard, FileBarChart2, Settings, HelpCircle, X, Users } from 'lucide-react';

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <nav className={`fixed left-0 top-0 h-full w-[240px] border-r border-slate-700 bg-primary-navy flex flex-col z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="px-6 py-8 border-b border-white/10 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-xl tracking-tight text-white uppercase">SEASHORE</h1>
          <p className="text-[11px] text-white/70 uppercase tracking-wider font-semibold mt-1">ENTERPRISES</p>
        </div>
        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <Link 
              href="/dashboard" 
              className={`flex items-center px-6 py-3 transition-colors ${isActive('/dashboard') ? 'bg-white/10 text-white border-l-4 border-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="mr-3 w-5 h-5" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/projects" 
              className={`flex items-center px-6 py-3 transition-colors ${isActive('/projects') ? 'bg-white/10 text-white border-l-4 border-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              onClick={() => setIsOpen(false)}
            >
              <Building2 className="mr-3 w-5 h-5" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">Projects</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/clients" 
              className={`flex items-center px-6 py-3 transition-colors ${isActive('/clients') ? 'bg-white/10 text-white border-l-4 border-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              onClick={() => setIsOpen(false)}
            >
              <Users className="mr-3 w-5 h-5" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">Clients</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="mt-auto border-t border-white/10 py-4">
        <ul className="space-y-1">
          <li>
            <Link href="#" className="text-white/70 hover:text-white flex items-center px-6 py-3 transition-colors hover:bg-white/5">
              <Settings className="mr-3 w-5 h-5" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">Settings</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="text-white/70 hover:text-white flex items-center px-6 py-3 transition-colors hover:bg-white/5">
              <HelpCircle className="mr-3 w-5 h-5" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">Support</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
