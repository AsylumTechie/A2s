import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { companyInfo, navLinks } from '../data/siteData';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-lg">
      <div className="hidden border-b border-brand-100 bg-brand-50 md:block">
        <div className="container-custom flex items-center justify-between px-4 py-2 text-xs text-slate-600 sm:px-6 lg:px-8">
          <TopBarLinks />
          <span>{companyInfo.udyam}</span>
        </div>
      </div>

      <nav className="container-custom flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-lg font-bold text-white shadow-lg shadow-brand-600/30">
            A2
          </div>
          <div>
            <p className="font-display text-lg font-bold text-slate-900">A2S</p>
            <p className="hidden text-xs text-slate-500 sm:block">eCom Solutions</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary !py-2.5 !px-5">
            Start a Project
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function TopBarLinks() {
  return (
    <div className="flex items-center gap-6">
      <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-1.5 hover:text-brand-600">
        <Phone size={14} />
        {companyInfo.phone}
      </a>
      <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-1.5 hover:text-brand-600">
        <Mail size={14} />
        {companyInfo.email}
      </a>
    </div>
  );
}
