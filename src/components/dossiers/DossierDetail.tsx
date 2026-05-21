'use client';

import { X, User, Mail, Calendar, DollarSign, FileText, History } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fermerModal } from '@/store/slices/uiSlice';
import { updateStatut, DossierStatus } from '@/store/slices/dossiersSlice';
import { afficherNotification } from '@/store/slices/uiSlice';
import { formatMontant, formatDate } from '@/utils/formatters';
import { STATUT_LABELS, STATUT_COLORS } from '@/utils/constants';
import Badge from '@/components/ui/Badge';

const actionStatuts: { label: string; statut: DossierStatus; style: string }[] = [
  { label: 'Marquer En cours', statut: 'en_cours', style: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  { label: 'Approuver', statut: 'approuve', style: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
  { label: 'Rejeter', statut: 'rejete', style: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
];

export default function DossierDetail() {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector((s) => s.dossiers.selectedId);
  const dossier = useAppSelector((s) =>
    s.dossiers.items.find((d) => d.id === selectedId)
  );

  if (!dossier) return null;

  const handleStatut = (statut: DossierStatus) => {
    dispatch(updateStatut({ id: dossier.id, statut }));
    dispatch(
      afficherNotification({
        message: `Statut mis à jour : ${STATUT_LABELS[statut]}`,
        type: 'succes',
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#1a3a5c]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-[#1a3a5c]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1a3a5c]">{dossier.titre}</h2>
              <p className="text-gray-400 text-xs mt-0.5">{dossier.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={STATUT_COLORS[dossier.statut]}>{STATUT_LABELS[dossier.statut]}</Badge>
            <button
              onClick={() => dispatch(fermerModal())}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: User, label: 'Porteur', value: dossier.porteur },
              { icon: Mail, label: 'Email', value: dossier.email },
              { icon: DollarSign, label: 'Montant demandé', value: formatMontant(dossier.montant) },
              { icon: Calendar, label: 'Date de soumission', value: formatDate(dossier.dateCreation) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                </div>
                <p className="text-sm font-semibold text-[#1a3a5c]">{value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-medium text-gray-400 mb-2">Description</p>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
              {dossier.description}
            </p>
          </div>

          {/* Timeline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-gray-400" />
              <p className="text-xs font-medium text-gray-400">Dernière mise à jour</p>
            </div>
            <p className="text-sm text-gray-600">{formatDate(dossier.dateMiseAJour)}</p>
          </div>

          {/* Actions */}
          <div>
            <p className="text-xs font-medium text-gray-400 mb-3">Changer le statut</p>
            <div className="flex flex-wrap gap-2">
              {actionStatuts.map(({ label, statut, style }) => (
                <button
                  key={statut}
                  onClick={() => handleStatut(statut)}
                  disabled={dossier.statut === statut}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${style}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
