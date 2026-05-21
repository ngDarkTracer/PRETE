import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  modalOuverte: 'soumission' | 'detail' | null;
  notificationVisible: boolean;
  notificationMessage: string;
  notificationType: 'succes' | 'erreur' | 'info';
}

const initialState: UiState = {
  sidebarOpen: false,
  modalOuverte: null,
  notificationVisible: false,
  notificationMessage: '',
  notificationType: 'info',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    ouvrirModal(state, action: PayloadAction<UiState['modalOuverte']>) {
      state.modalOuverte = action.payload;
    },
    fermerModal(state) {
      state.modalOuverte = null;
    },
    afficherNotification(
      state,
      action: PayloadAction<{ message: string; type: UiState['notificationType'] }>
    ) {
      state.notificationVisible = true;
      state.notificationMessage = action.payload.message;
      state.notificationType = action.payload.type;
    },
    masquerNotification(state) {
      state.notificationVisible = false;
    },
  },
});

export const { toggleSidebar, ouvrirModal, fermerModal, afficherNotification, masquerNotification } =
  uiSlice.actions;
export default uiSlice.reducer;
