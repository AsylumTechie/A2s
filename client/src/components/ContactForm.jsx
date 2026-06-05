import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContact } from '../api/client';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      await submitContact(form);
      setStatus({ type: 'success', message: 'Thank you! We will get back to you soon.' });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not send message. Please try again or call us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            placeholder="+91-XXXXXXXXXX"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            placeholder="How can we help?"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          placeholder="Tell us about your project..."
        />
      </div>

      {status.message && (
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {status.message}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
        {loading ? 'Sending...' : 'Send Message'}
        <Send size={16} />
      </button>
    </form>
  );
}
