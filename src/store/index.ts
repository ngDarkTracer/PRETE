import { configureStore } from '@reduxjs/toolkit';
import dossiersReducer from './slices/dossiersSlice';
import documentsReducer from './slices/documentsSlice';
import annoncesReducer from './slices/annoncesSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    dossiers: dossiersReducer,
    documents: documentsReducer,
    annonces: annoncesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
