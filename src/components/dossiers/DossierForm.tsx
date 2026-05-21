'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addDossier } from '@/store/slices/dossiersSlice';
import { fermerModal } from '@/store/slices/uiSlice';
import { afficherNotification } from '@/store/slices/uiSlice';
import { validerDossier } from '@/utils/validators';

const initialForm = {
  titre: '',
  porteur: '',
  email: '',
  description: '',
  montant: '',
};

export default function DossierForm() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(initialForm);
  const [erreurs, setErreurs] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erreurs[name]) setErreurs((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, montant: Number(form.montant) };
    const result = validerDossier(data);

    if (!result.valide) {
      setErreurs(result.erreurs);
      return;
    }

    dispatch(
      addDossier({
        ...data,
        montant: Number(form.montant),
        statut: 'soumis',
        documents: [],
      })
    );
    dispatch(fermerModal());
    dispatch(
      afficherNotification({
        message: 'Votre dossier a été soumis avec succès !',
        type: 'succes',
      })
    );
    setForm(initialForm);
  };

  const fields = [
    { name: 'titre', label: 'Titre du projet', type: 'text', placeholder: 'Ex: Projet Énergies Renouvelables' },
    { name: 'porteur', label: 'Porteur du projet', type: 'text', placeholder: 'Nom de l\'organisation ou personne' },
    { name: 'email', label: 'Adresse email', type: 'email', placeholder: 'contact@organisation.org' },
    { name: 'montant', label: 'Montant demandé (FCFA)', type: 'number', placeholder: 'Ex: 5000000' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-[#1a3a5c]">Soumettre un dossier</h2>
            <p className="text-gray-400 text-xs mt-0.5">Remplissez le formulaire ci-dessous</p>
          </div>
          <button
            onClick={() => dispatch(fermerModal())}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {fields.map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 ${
                  erreurs[name]
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 focus:border-[#1a3a5c]'
                }`}
              />
              {erreurs[name] && (
                <p className="text-red-500 text-xs mt-1">{erreurs[name]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description du projet
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Décrivez votre projet, ses objectifs et son impact attendu..."
              rows={4}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 resize-none ${
                erreurs.description
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-200 focus:border-[#1a3a5c]'
              }`}
            />
            {erreurs.description && (
              <p className="text-red-500 text-xs mt-1">{erreurs.description}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => dispatch(fermerModal())}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a3a5c] text-white text-sm font-medium rounded-lg hover:bg-[#122a45] transition-colors"
            >
              <Send className="w-4 h-4" />
              Soumettre le dossier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
