export default function PageHeader({ title, subtitle, badge }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-brand-800 py-20 md:py-28">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent-500 blur-3xl" />
      </div>
      <div className="container-custom relative px-4 text-center sm:px-6 lg:px-8">
        {badge && (
          <span className="mb-4 inline-block rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-200">
            {badge}
          </span>
        )}
        <h1 className="font-display text-3xl font-bold text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">{subtitle}</p>}
      </div>
    </section>
  );
}
