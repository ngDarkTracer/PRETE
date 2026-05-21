'use client';

import { FileSearch } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategorieActive, Document } from '@/store/slices/documentsSlice';
import DocumentCard from '@/components/documents/DocumentCard';
import { CATEGORIE_LABELS } from '@/utils/constants';

const categories: { label: string; value: Document['categorie'] | 'tous' }[] = [
  { label: 'Tous', value: 'tous' },
  { label: 'Guides', value: 'guide' },
  { label: 'Formulaires', value: 'formulaire' },
  { label: 'Rapports', value: 'rapport' },
  { label: 'Cadre légal', value: 'cadre_legal' },
];

export default function DocumentsPage() {
  const dispatch = useAppDispatch();
  const { items, categorieActive } = useAppSelector((s) => s.documents);

  const docsFiltres =
    categorieActive === 'tous' ? items : items.filter((d) => d.categorie === categorieActive);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a3a5c]">Documents de référence</h1>
        <p className="text-gray-500 text-sm mt-1">
          Guides, formulaires, rapports et textes légaux disponibles en téléchargement
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => dispatch(setCategorieActive(value))}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categorieActive === value
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Documents grid */}
      {docsFiltres.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FileSearch className="w-12 h-12 mb-3 opacity-30" />
          <p className="font-medium">Aucun document dans cette catégorie</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {docsFiltres.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
