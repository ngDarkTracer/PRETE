'use client';

import { FolderOpen, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function StatsSection() {
  const dossiers = useAppSelector((s) => s.dossiers.items);
  const approuves = dossiers.filter((d) => d.statut === 'approuve').length;
  const totalMontant = dossiers
    .filter((d) => d.statut === 'approuve')
    .reduce((sum, d) => sum + d.montant, 0);

  const stats = [
    {
      icon: FolderOpen,
      value: dossiers.length.toString(),
      label: 'Dossiers soumis',
      bg: 'bg-blue-50',
      color: 'text-[#1a3a5c]',
    },
    {
      icon: CheckCircle,
      value: approuves.toString(),
      label: 'Projets approuvés',
      bg: 'bg-emerald-50',
      color: 'text-emerald-600',
    },
    {
      icon: TrendingUp,
      value: `${(totalMontant / 1_000_000).toFixed(0)} M`,
      label: 'FCFA engagés',
      bg: 'bg-amber-50',
      color: 'text-amber-600',
    },
    {
      icon: Users,
      value: '3',
      label: 'Sessions ouvertes',
      bg: 'bg-purple-50',
      color: 'text-purple-600',
    },
  ];

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label, bg, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
