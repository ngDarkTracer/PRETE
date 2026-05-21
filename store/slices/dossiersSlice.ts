import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DossierStatus = 'brouillon' | 'soumis' | 'en_cours' | 'approuve' | 'rejete';

export interface Dossier {
  id: string;
  titre: string;
  porteur: string;
  email: string;
  description: string;
  montant: number;
  statut: DossierStatus;
  dateCreation: string;
  dateMiseAJour: string;
  documents: string[];
}

interface DossiersState {
  items: Dossier[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
  filter: DossierStatus | 'tous';
}

const initialState: DossiersState = {
  items: [
    {
      id: 'D-2024-001',
      titre: 'Projet Énergies Renouvelables Régional',
      porteur: 'ONG Énergie Verte',
      email: 'contact@energieverte.org',
      description: 'Installation de panneaux solaires dans 50 villages ruraux.',
      montant: 250000000,
      statut: 'en_cours',
      dateCreation: '2024-01-15',
      dateMiseAJour: '2024-03-10',
      documents: ['plan_projet.pdf', 'budget.xlsx'],
    },
    {
      id: 'D-2024-002',
      titre: 'Digitalisation des Services Municipaux',
      porteur: 'Mairie de Douala 3',
      email: 'mairie.d3@douala.cm',
      description: 'Plateforme numérique pour les services administratifs.',
      montant: 80000000,
      statut: 'approuve',
      dateCreation: '2024-02-01',
      dateMiseAJour: '2024-03-15',
      documents: ['cahier_charges.pdf'],
    },
    {
      id: 'D-2024-003',
      titre: 'Formation Professionnelle Jeunes',
      porteur: 'Association Avenir',
      email: 'info@avenir.org',
      description: 'Programme de formation pour 500 jeunes dans les métiers du numérique.',
      montant: 45000000,
      statut: 'soumis',
      dateCreation: '2024-03-01',
      dateMiseAJour: '2024-03-01',
      documents: ['projet.pdf', 'cv_equipe.pdf'],
    },
  ],
  selectedId: null,
  loading: false,
  error: null,
  filter: 'tous',
};

const dossiersSlice = createSlice({
  name: 'dossiers',
  initialState,
  reducers: {
    addDossier(state, action: PayloadAction<Omit<Dossier, 'id' | 'dateCreation' | 'dateMiseAJour'>>) {
      const now = new Date().toISOString().split('T')[0];
      state.items.push({
        ...action.payload,
        id: `D-${Date.now()}`,
        dateCreation: now,
        dateMiseAJour: now,
      });
    },
    updateStatut(state, action: PayloadAction<{ id: string; statut: DossierStatus }>) {
      const dossier = state.items.find((d) => d.id === action.payload.id);
      if (dossier) {
        dossier.statut = action.payload.statut;
        dossier.dateMiseAJour = new Date().toISOString().split('T')[0];
      }
    },
    selectDossier(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
    setFilter(state, action: PayloadAction<DossierStatus | 'tous'>) {
      state.filter = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { addDossier, updateStatut, selectDossier, setFilter, setLoading, setError } = dossiersSlice.actions;
export default dossiersSlice.reducer;
