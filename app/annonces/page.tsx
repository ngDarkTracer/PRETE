'use client';

import { Bell, AlertCircle, Calendar, Info, CheckCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { marquerLue, marquerToutesLues } from '@/store/slices/annoncesSlice';
import { formatDate } from '@/utils/formatters';
import { ANNONCE_CATEGORIE_LABELS, PRIORITE_COLORS } from '@/utils/constants';
import Badge from '@/components/ui/Badge';

const prioriteIcons = {
  haute: AlertCircle,
  normale: Calendar,
  info: Info,
};

const prioriteIconColors = {
  haute: 'text-red-500',
  normale: 'text-blue-500',
  info: 'text-gray-400',
};

export default function AnnoncesPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.annonces);
  const nonLues = items.filter((a) => !a.lue).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a5c]">Annonces & Communications</h1>
          <p className="text-gray-500 text-sm mt-1">
            {nonLues > 0
              ? `${nonLues} annonce${nonLues > 1 ? 's' : ''} non lue${nonLues > 1 ? 's' : ''}`
              : 'Toutes les annonces ont été lues'}
          </p>
        </div>
        {nonLues > 0 && (
          <button
            onClick={() => dispatch(marquerToutesLues())}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Tout marquer comme lu
          </button>
        )}
      </div>

      {/* Annonces list */}
      <div className="flex flex-col gap-4">
        {items.map((annonce) => {
          const Icon = prioriteIcons[annonce.priorite];
          return (
            <div
              key={annonce.id}
              className={`bg-white rounded-xl border p-6 transition-all ${
                !annonce.lue
                  ? 'border-[#1a3a5c]/30 shadow-sm'
                  : 'border-gray-200 opacity-75'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 mt-0.5 ${prioriteIconColors[annonce.priorite]}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[#1a3a5c]">{annonce.titre}</h3>
                      {!annonce.lue && (
                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <Badge
                      className={`${PRIORITE_COLORS[annonce.priorite]} border flex-shrink-0`}
                      variant="outline"
                    >
                      {ANNONCE_CATEGORIE_LABELS[annonce.categorie]}
                    </Badge>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {annonce.contenu}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {formatDate(annonce.datePublication)}
                    </span>
                    {!annonce.lue && (
                      <button
                        onClick={() => dispatch(marquerLue(annonce.id))}
                        className="text-xs font-medium text-[#1a3a5c] hover:underline"
                      >
                        Marquer comme lu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Bell className="w-12 h-12 mb-3 opacity-30" />
          <p className="font-medium">Aucune annonce disponible</p>
        </div>
      )}
    </div>
  );
}
