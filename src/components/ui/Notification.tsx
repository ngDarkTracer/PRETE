'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { masquerNotification } from '@/store/slices/uiSlice';

const icons = {
  succes: CheckCircle,
  erreur: XCircle,
  info: Info,
};

const styles = {
  succes: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  erreur: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export default function Notification() {
  const dispatch = useAppDispatch();
  const { notificationVisible, notificationMessage, notificationType } = useAppSelector(
    (s) => s.ui
  );

  useEffect(() => {
    if (notificationVisible) {
      const t = setTimeout(() => dispatch(masquerNotification()), 4000);
      return () => clearTimeout(t);
    }
  }, [notificationVisible, dispatch]);

  if (!notificationVisible) return null;

  const Icon = icons[notificationType];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm ${styles[notificationType]}`}
    >
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{notificationMessage}</p>
      <button onClick={() => dispatch(masquerNotification())} className="ml-2 opacity-60 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
