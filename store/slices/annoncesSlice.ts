import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AnnoncePriorite = 'haute' | 'normale' | 'info';

export interface Annonce {
  id: string;
  titre: string;
  contenu: string;
  datePublication: string;
  priorite: AnnoncePriorite;
  categorie: 'appel_projets' | 'calendrier' | 'mise_a_jour' | 'communique';
  lue: boolean;
}

interface AnnoncesState {
  items: Annonce[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnoncesState = {
  items: [
    {
      id: '1',
      titre: 'Appel à projets - Session 2024 ouverte',
      contenu:
        'Le mécanisme PRETE lance sa 3ème session d\'appel à projets. Les porteurs de projets sont invités à soumettre leurs dossiers du 1er mars au 30 avril 2024.',
      datePublication: '2024-03-01',
      priorite: 'haute',
      categorie: 'appel_projets',
      lue: false,
    },
    {
      id: '2',
      titre: 'Calendrier des comités de sélection 2024',
      contenu:
        'Les comités de sélection se tiendront les 15 mai, 15 juillet et 15 octobre 2024. Les porteurs de projets retenus seront convoqués au moins 15 jours avant chaque session.',
      datePublication: '2024-02-15',
      priorite: 'normale',
      categorie: 'calendrier',
      lue: false,
    },
    {
      id: '3',
      titre: 'Mise à jour du formulaire de candidature',
      contenu:
        'Le formulaire de candidature a été mis à jour. Veuillez utiliser la nouvelle version disponible dans la section Documents.',
      datePublication: '2024-02-20',
      priorite: 'normale',
      categorie: 'mise_a_jour',
      lue: true,
    },
    {
      id: '4',
      titre: 'Communiqué : Résultats de la session 2023',
      contenu:
        '12 projets ont été approuvés lors de la session 2023 pour un montant total de 850 millions FCFA. Félicitations aux porteurs de projets sélectionnés.',
      datePublication: '2024-01-30',
      priorite: 'info',
      categorie: 'communique',
      lue: true,
    },
  ],
  loading: false,
  error: null,
};

const annoncesSlice = createSlice({
  name: 'annonces',
  initialState,
  reducers: {
    marquerLue(state, action: PayloadAction<string>) {
      const annonce = state.items.find((a) => a.id === action.payload);
      if (annonce) annonce.lue = true;
    },
    marquerToutesLues(state) {
      state.items.forEach((a) => (a.lue = true));
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { marquerLue, marquerToutesLues, setLoading, setError } = annoncesSlice.actions;
export default annoncesSlice.reducer;
