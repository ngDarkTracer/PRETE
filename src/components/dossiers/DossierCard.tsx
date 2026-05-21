'use client';

import { Calendar, User, DollarSign, FileText } from 'lucide-react';
import { Dossier } from '@/store/slices/dossiersSlice';
import { useAppDispatch } from '@/store/hooks';
import { selectDossier } from '@/store/slices/dossiersSlice';
import { ouvrirModal } from '@/store/slices/uiSlice';
import { formatMontant, formatDateCourte } from '@/utils/formatters';
import { STATUT_LABELS, STATUT_COLORS } from '@/utils/constants';
import Badge from '@/components/ui/Badge';

interface DossierCardProps {
  dossier: Dossier;
}

export default function DossierCard({ dossier }: DossierCardProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(selectDossier(dossier.id));
    dispatch(ouvrirModal('detail'));
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-[#1a3a5c]/30 transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-2.5">
          <div className="w-9 h-9 bg-[#1a3a5c]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-[#1a3a5c]" />
          </div>
          <div>
            <p className="font-semibold text-[#1a3a5c] text-sm leading-snug">{dossier.titre}</p>
            <p className="text-xs text-gray-400 mt-0.5">{dossier.id}</p>
          </div>
        </div>
        <Badge className={STATUT_COLORS[dossier.statut]}>
          {STATUT_LABELS[dossier.statut]}
        </Badge>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
        {dossier.description}
      </p>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <User className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{dossier.porteur}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{formatMontant(dossier.montant)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{formatDateCourte(dossier.dateCreation)}</span>
        </div>
      </div>
    </div>
  );
}
