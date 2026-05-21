'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu, X, FileText, Home, FolderOpen, Megaphone, Download } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { APP_NAME } from '@/utils/constants';

const navLinks = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/dossiers', label: 'Mes Dossiers', icon: FolderOpen },
  { href: '/documents', label: 'Documents', icon: Download },
  { href: '/annonces', label: 'Annonces', icon: Megaphone },
];

export default function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);
  const annoncesNonLues = useAppSelector(
    (s) => s.annonces.items.filter((a) => !a.lue).length
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1a3a5c] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[#1a3a5c] font-bold text-lg leading-none">{APP_NAME}</p>
              <p className="text-gray-400 text-[10px] leading-none">Plateforme Nationale</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-[#1a3a5c] text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-[#1a3a5c]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/annonces"
              className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {annoncesNonLues > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {annoncesNonLues}
                </span>
              )}
            </Link>

            <Link
              href="/dossiers"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#1a3a5c] text-white text-sm font-medium rounded-lg hover:bg-[#122a45] transition-colors"
            >
              <FolderOpen className="w-4 h-4" />
              Soumettre un dossier
            </Link>

            <button
              className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
              onClick={() => dispatch(toggleSidebar())}
              aria-label="Menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {sidebarOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => dispatch(toggleSidebar())}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-[#1a3a5c] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
