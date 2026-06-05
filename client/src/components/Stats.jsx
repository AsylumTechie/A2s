import { useEffect, useState } from 'react';
import { FolderCheck, Smile, Percent, Users } from 'lucide-react';
import { getStats } from '../api/client';
import { statsData } from '../data/siteData';

const iconMap = {
  projects: FolderCheck,
  happyClients: Smile,
  clientSatisfaction: Percent,
  teamMembers: Users,
};

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data.data))
      .catch(() => setStats(null));
  }, []);

  const items = statsData.map((item) => ({
    label: item.label,
    value: stats?.[item.key] ?? item.value,
    suffix: item.suffix,
    icon: iconMap[item.key] || Users,
  }));

  return (
    <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 py-16">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="text-center text-white">
              <item.icon className="mx-auto mb-3 h-8 w-8 text-brand-200" />
              <p className="font-display text-3xl font-bold md:text-4xl">
                {item.value}
                {item.suffix}
              </p>
              <p className="mt-1 text-sm text-brand-100">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
