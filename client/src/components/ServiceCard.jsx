import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.Globe;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm card-hover"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={24} />
      </div>
      <h3 className="font-display text-lg font-semibold text-slate-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{service.shortDescription}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
        Learn more <ArrowRight size={16} />
      </span>
    </Link>
  );
}
