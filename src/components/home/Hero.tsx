import Link from 'next/link';
import { ArrowRight, Shield, Search, FileCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1a3a5c] via-[#1e4470] to-[#0f2a45] text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-blue-100 text-xs font-medium mb-6 backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5" />
              Plateforme officielle & sécurisée
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Plateforme{' '}
              <span className="text-[#f59e0b]">PRETE</span>
              <br />
              <span className="text-blue-200 text-3xl md:text-4xl font-semibold">
                Transparence & Gestion des Financements
              </span>
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
              Outil central au service de la transparence, de l&apos;information publique
              et de la gestion opérationnelle du mécanisme de financement des projets.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/dossiers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f59e0b] text-[#1a3a5c] font-semibold rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
              >
                Soumettre un dossier
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/documents"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white font-medium rounded-xl hover:bg-white/25 transition-colors backdrop-blur-sm border border-white/20"
              >
                <Search className="w-4 h-4" />
                Consulter les ressources
              </Link>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Shield,
                title: 'Espace Information',
                desc: 'Accédez aux informations officielles, calendriers et documents de référence.',
                color: 'bg-blue-500/20',
              },
              {
                icon: FileCheck,
                title: 'Gestion Digitale',
                desc: 'Soumettez et suivez vos dossiers en temps réel depuis votre espace.',
                color: 'bg-amber-500/20',
              },
              {
                icon: Search,
                title: 'Traçabilité Totale',
                desc: 'Historique complet des actions et documents pour chaque dossier.',
                color: 'bg-emerald-500/20',
              },
              {
                icon: ArrowRight,
                title: 'Reporting',
                desc: 'Production automatique de rapports périodiques sur l\'avancement.',
                color: 'bg-purple-500/20',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className={`${color} backdrop-blur-sm border border-white/15 rounded-xl p-5`}
              >
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1.5">{title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
