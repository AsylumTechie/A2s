import { getServices, getServiceBySlug } from './client';
import { demoServices } from '../data/demoServices';

const slugAliases = {
  'ecommerce-product-listing': 'ecommerce-account-management',
};

function isValidServiceList(data) {
  return Array.isArray(data) && data.length > 0 && data[0]?.title;
}

function filterDemoServices(params = {}) {
  let list = [...demoServices];
  if (params.category) {
    list = list.filter((s) => s.category === params.category);
  }
  if (params.featured === 'true' || params.featured === true) {
    list = list.filter((s) => s.isFeatured);
  }
  return list;
}

export async function loadServices(params = {}) {
  try {
    const res = await getServices(params);
    const data = res?.data?.data;
    if (isValidServiceList(data)) {
      return data;
    }
  } catch {
    // API unreachable or returned invalid data
  }
  return filterDemoServices(params);
}

export async function loadServiceBySlug(slug) {
  const resolvedSlug = slugAliases[slug] || slug;
  try {
    const res = await getServiceBySlug(resolvedSlug);
    if (res?.data?.data?.slug) {
      return res.data.data;
    }
  } catch {
    // fall through to demo data
  }
  return demoServices.find((s) => s.slug === resolvedSlug) || null;
}
