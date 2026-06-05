import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitInquiry } from '../api/client';
import { serviceCategories } from '../data/siteData';

export default function InquiryForm({ defaultCategory = '' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceCategory: defaultCategory,
    serviceName: '',
    planType: '',
    message: '',
  });
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
      await submitInquiry(form);
      setStatus({ type: 'success', message: 'Inquiry submitted! Our team will contact you shortly.' });
      setForm({
        name: '',
        email: '',
        phone: '',
        serviceCategory: defaultCategory,
        serviceName: '',
        planType: '',
        message: '',
      });
    } catch {
      setStatus({ type: 'error', message: 'Submission failed. Please try again.' });
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
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
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
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
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
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Service Category *</label>
          <select
            name="serviceCategory"
            value={form.serviceCategory}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="">Select category</option>
            {serviceCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          placeholder="Describe your requirements..."
        />
      </div>

      {status.message && (
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {status.message}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Submitting...' : 'Submit Inquiry'}
        <Send size={16} />
      </button>
    </form>
  );
}
