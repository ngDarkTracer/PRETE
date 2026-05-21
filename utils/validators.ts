export interface ValidationResult {
  valide: boolean;
  erreurs: Record<string, string>;
}

export function validerEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validerDossier(data: {
  titre: string;
  porteur: string;
  email: string;
  description: string;
  montant: number;
}): ValidationResult {
  const erreurs: Record<string, string> = {};

  if (!data.titre.trim() || data.titre.length < 5) {
    erreurs.titre = 'Le titre doit contenir au moins 5 caractères.';
  }
  if (!data.porteur.trim()) {
    erreurs.porteur = 'Le nom du porteur est requis.';
  }
  if (!validerEmail(data.email)) {
    erreurs.email = 'Adresse email invalide.';
  }
  if (!data.description.trim() || data.description.length < 20) {
    erreurs.description = 'La description doit contenir au moins 20 caractères.';
  }
  if (!data.montant || data.montant <= 0) {
    erreurs.montant = 'Le montant demandé doit être supérieur à 0.';
  }

  return { valide: Object.keys(erreurs).length === 0, erreurs };
}
