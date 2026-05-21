'use client';

import { Plus, Search, Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilter, DossierStatus } from '@/store/slices/dossiersSlice';
import { ouvrirModal } from '@/store/slices/uiSlice';
import DossierCard from '@/components/dossiers/DossierCard';
import DossierForm from '@/components/dossiers/DossierForm';
import DossierDetail from '@/components/dossiers/DossierDetail';
import { STATUT_LABELS } from '@/utils/constants';

const filtres: { label: string; value: DossierStatus | 'tous' }[] = [
  { label: 'Tous', value: 'tous' },
  { label: 'Soumis', value: 'soumis' },
  { label: 'En cours', value: 'en_cours' },
  { label: 'Approuvés', value: 'approuve' },
  { label: 'Rejetés', value: 'rejete' },
];

export default function DossiersPage() {
  const dispatch = useAppDispatch();
  const { items, filter, loading } = useAppSelector((s) => s.dossiers);
  const modalOuverte = useAppSelector((s) => s.ui.modalOuverte);

  const dossiersFiltres =
    filter === 'tous' ? items : items.filter((d) => d.statut === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a5c]">Gestion des Dossiers</h1>
          <p className="text-gray-500 text-sm mt-1">
            {items.length} dossier{items.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <button
          onClick={() => dispatch(ouvrirModal('soumission'))}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a3a5c] text-white text-sm font-medium rounded-xl hover:bg-[#122a45] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nouveau dossier
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
        {filtres.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => dispatch(setFilter(value))}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === value
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {label}
            {value !== 'tous' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({items.filter((d) => d.statut === value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Dossiers grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#1a3a5c] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : dossiersFiltres.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search className="w-12 h-12 mb-3 opacity-30" />
          <p className="font-medium">Aucun dossier trouvé</p>
          <p className="text-sm mt-1">Modifiez le filtre ou soumettez un nouveau dossier</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dossiersFiltres.map((dossier) => (
            <DossierCard key={dossier.id} dossier={dossier} />
          ))}
        </div>
      )}

      {/* Modals */}
      {modalOuverte === 'soumission' && <DossierForm />}
      {modalOuverte === 'detail' && <DossierDetail />}
    </div>
  );
}
