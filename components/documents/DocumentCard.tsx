import { Download, FileText, BookOpen, ClipboardList, Scale } from 'lucide-react';
import { Document } from '@/store/slices/documentsSlice';
import { formatDate } from '@/utils/formatters';
import { CATEGORIE_LABELS } from '@/utils/constants';
import Badge from '@/components/ui/Badge';

const categorieIcons = {
  guide: BookOpen,
  formulaire: ClipboardList,
  rapport: FileText,
  cadre_legal: Scale,
};

const categorieColors = {
  guide: 'bg-blue-50 text-blue-700',
  formulaire: 'bg-purple-50 text-purple-700',
  rapport: 'bg-amber-50 text-amber-700',
  cadre_legal: 'bg-emerald-50 text-emerald-700',
};

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document: doc }: DocumentCardProps) {
  const Icon = categorieIcons[doc.categorie];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-[#1a3a5c]/30 transition-all flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-[#1a3a5c]/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[#1a3a5c]" />
        </div>
        <div className="flex-1 min-w-0">
          <Badge className={`${categorieColors[doc.categorie]} text-xs mb-1.5`}>
            {CATEGORIE_LABELS[doc.categorie]}
          </Badge>
          <h3 className="font-semibold text-[#1a3a5c] text-sm leading-snug">{doc.titre}</h3>
        </div>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
        {doc.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-400">
          <span>{formatDate(doc.datePublication)}</span>
          <span className="mx-2">·</span>
          <span>{doc.taille}</span>
        </div>
        <a
          href={doc.url}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-medium rounded-lg hover:bg-[#122a45] transition-colors"
          download
        >
          <Download className="w-3.5 h-3.5" />
          Télécharger
        </a>
      </div>
    </div>
  );
}
