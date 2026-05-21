import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Document {
  id: string;
  titre: string;
  categorie: 'guide' | 'formulaire' | 'rapport' | 'cadre_legal';
  description: string;
  datePublication: string;
  taille: string;
  url: string;
}

interface DocumentsState {
  items: Document[];
  loading: boolean;
  error: string | null;
  categorieActive: Document['categorie'] | 'tous';
}

const initialState: DocumentsState = {
  items: [
    {
      id: '1',
      titre: 'Guide de soumission des dossiers',
      categorie: 'guide',
      description: 'Manuel complet pour la préparation et soumission des dossiers de financement.',
      datePublication: '2024-01-10',
      taille: '2.4 MB',
      url: '/docs/guide-soumission.pdf',
    },
    {
      id: '2',
      titre: 'Formulaire de candidature PRETE',
      categorie: 'formulaire',
      description: 'Formulaire officiel de candidature au mécanisme PRETE.',
      datePublication: '2024-01-10',
      taille: '450 KB',
      url: '/docs/formulaire-candidature.pdf',
    },
    {
      id: '3',
      titre: 'Rapport annuel 2023',
      categorie: 'rapport',
      description: 'Rapport de performance et de résultats du mécanisme PRETE pour 2023.',
      datePublication: '2024-02-28',
      taille: '8.1 MB',
      url: '/docs/rapport-2023.pdf',
    },
    {
      id: '4',
      titre: 'Cadre juridique et réglementaire',
      categorie: 'cadre_legal',
      description: 'Textes de loi et décrets encadrant le mécanisme PRETE.',
      datePublication: '2023-12-15',
      taille: '1.2 MB',
      url: '/docs/cadre-legal.pdf',
    },
    {
      id: '5',
      titre: 'Guide de suivi et évaluation',
      categorie: 'guide',
      description: 'Procédures de suivi, évaluation et reporting des projets financés.',
      datePublication: '2024-01-20',
      taille: '3.1 MB',
      url: '/docs/guide-suivi.pdf',
    },
  ],
  loading: false,
  error: null,
  categorieActive: 'tous',
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setCategorieActive(state, action: PayloadAction<Document['categorie'] | 'tous'>) {
      state.categorieActive = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCategorieActive, setLoading, setError } = documentsSlice.actions;
export default documentsSlice.reducer;
