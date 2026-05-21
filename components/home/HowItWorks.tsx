import { FileText, Upload, Clock, Award } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: FileText,
    title: 'Préparez votre dossier',
    desc: 'Consultez le guide de soumission et rassemblez les documents requis selon le type de projet.',
  },
  {
    num: '02',
    icon: Upload,
    title: 'Soumettez en ligne',
    desc: 'Complétez le formulaire de candidature et déposez vos pièces justificatives sur la plateforme.',
  },
  {
    num: '03',
    icon: Clock,
    title: 'Suivi en temps réel',
    desc: 'Suivez l\'avancement de votre dossier et recevez des notifications à chaque étape.',
  },
  {
    num: '04',
    icon: Award,
    title: 'Décision et financement',
    desc: 'Le comité examine votre dossier et vous notifie de la décision officielle de financement.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-[#1a3a5c]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-[#1a3a5c]">Comment ça fonctionne ?</h2>
          <p className="text-gray-500 text-sm mt-2">
            Processus simplifié de soumission et de traitement des dossiers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="relative bg-white rounded-xl border border-gray-200 p-6">
              <span className="text-4xl font-black text-[#1a3a5c]/10 absolute top-4 right-4">
                {num}
              </span>
              <div className="w-11 h-11 bg-[#1a3a5c] rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-[#1a3a5c] mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
