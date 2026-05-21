export const STATUT_LABELS: Record<string, string> = {
  brouillon: 'Brouillon',
  soumis: 'Soumis',
  en_cours: 'En cours d\'examen',
  approuve: 'Approuvé',
  rejete: 'Rejeté',
};

export const STATUT_COLORS: Record<string, string> = {
  brouillon: 'bg-gray-100 text-gray-700',
  soumis: 'bg-blue-100 text-blue-700',
  en_cours: 'bg-amber-100 text-amber-700',
  approuve: 'bg-emerald-100 text-emerald-700',
  rejete: 'bg-red-100 text-red-700',
};

export const CATEGORIE_LABELS: Record<string, string> = {
  guide: 'Guide',
  formulaire: 'Formulaire',
  rapport: 'Rapport',
  cadre_legal: 'Cadre légal',
};

export const PRIORITE_COLORS: Record<string, string> = {
  haute: 'bg-red-100 text-red-700 border-red-200',
  normale: 'bg-blue-100 text-blue-700 border-blue-200',
  info: 'bg-gray-100 text-gray-600 border-gray-200',
};

export const ANNONCE_CATEGORIE_LABELS: Record<string, string> = {
  appel_projets: 'Appel à projets',
  calendrier: 'Calendrier',
  mise_a_jour: 'Mise à jour',
  communique: 'Communiqué',
};

export const APP_NAME = 'PRETE';
export const APP_DESCRIPTION =
  'Plateforme de Ressources et de Transparence pour les Entreprises';
