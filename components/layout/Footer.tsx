import Link from 'next/link';
import { FileText, Mail, Phone, MapPin } from 'lucide-react';
import { APP_NAME } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="bg-[#1a3a5c] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-lg leading-none">{APP_NAME}</p>
                <p className="text-blue-200 text-[11px] leading-none">Plateforme Nationale</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              Outil central au service de la transparence, de l&apos;information publique
              et de la gestion opérationnelle du mécanisme de financement.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/dossiers', label: 'Mes Dossiers' },
                { href: '/documents', label: 'Documents' },
                { href: '/annonces', label: 'Annonces' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-blue-200 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>contact@prete.gouv</span>
              </li>
              <li className="flex items-start gap-2.5 text-blue-200 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+237 699 000 000</span>
              </li>
              <li className="flex items-start gap-2.5 text-blue-200 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>BP 1234, Yaoundé, Cameroun</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-blue-200 text-xs">
            © {new Date().getFullYear()} Plateforme PRETE. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-blue-200 hover:text-white text-xs transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-blue-200 hover:text-white text-xs transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
