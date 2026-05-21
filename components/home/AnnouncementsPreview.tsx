'use client';

import Link from 'next/link';
import { ArrowRight, AlertCircle, Info, Calendar } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { formatDate } from '@/utils/formatters';
import { ANNONCE_CATEGORIE_LABELS, PRIORITE_COLORS } from '@/utils/constants';
import Badge from '@/components/ui/Badge';

const prioriteIcons = {
  haute: AlertCircle,
  normale: Calendar,
  info: Info,
};

export default function AnnouncementsPreview() {
  const annonces = useAppSelector((s) => s.annonces.items.slice(0, 3));

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1a3a5c]">Annonces & Communications</h2>
            <p className="text-gray-500 text-sm mt-1">Informations officielles et mises à jour</p>
          </div>
          <Link
            href="/annonces"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#1a3a5c] hover:text-blue-700 transition-colors"
          >
            Voir toutes les annonces
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {annonces.map((annonce) => {
            const Icon = prioriteIcons[annonce.priorite];
            return (
              <div
                key={annonce.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <Badge className={`${PRIORITE_COLORS[annonce.priorite]} border`} variant="outline">
                    {ANNONCE_CATEGORIE_LABELS[annonce.categorie]}
                  </Badge>
                  {!annonce.lue && (
                    <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>

                <div className="flex items-start gap-2.5">
                  <Icon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-[#1a3a5c] text-sm leading-snug">
                    {annonce.titre}
                  </h3>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {annonce.contenu}
                </p>

                <p className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100">
                  {formatDate(annonce.datePublication)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/annonces" className="text-sm font-medium text-[#1a3a5c] hover:underline">
            Voir toutes les annonces →
          </Link>
        </div>
      </div>
    </section>
  );
}
