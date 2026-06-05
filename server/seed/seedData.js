import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';
import Service from '../models/Service.js';

dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

const services = [
  {
    title: 'Front-End Development',
    slug: 'front-end-development',
    category: 'website-development',
    shortDescription: 'Responsive, appealing front-ends that capture your audience.',
    description:
      'Design creative and engaging websites for any screen resolution. Our UI/UX developers focus on appealing front-ends that enhance and capture your client audience.',
    icon: 'Monitor',
    features: ['Responsive design', 'Modern UI/UX', 'Cross-browser compatibility', 'Performance optimized'],
    order: 1,
    isFeatured: true,
  },
  {
    title: 'Back-End Development',
    slug: 'back-end-development',
    category: 'website-development',
    shortDescription: 'Solid, reliable back-end frameworks for smooth performance.',
    description:
      'Drive your website or application with a solid, reliable back-end. Our developers build frameworks optimized for performance and dependability.',
    icon: 'Server',
    features: ['Scalable architecture', 'API integration', 'Database design', 'Security best practices'],
    order: 2,
    isFeatured: true,
  },
  {
    title: 'CMS Development',
    slug: 'cms-development',
    category: 'website-development',
    shortDescription: 'Custom content management systems for easy updates.',
    description:
      'Streamline your content strategy with customized CMS solutions. Easily update, manage, and publish dynamic content.',
    icon: 'FileText',
    features: ['Easy content editing', 'Role-based access', 'Media management', 'SEO-friendly'],
    order: 3,
  },
  {
    title: 'Web App Development',
    slug: 'web-app-development',
    category: 'website-development',
    shortDescription: 'Custom web applications tailored to your business.',
    description:
      'We create custom websites from your vision. Scalable, easy-to-use web app solutions designed for your business needs.',
    icon: 'AppWindow',
    features: ['Custom solutions', 'Scalable apps', 'User-friendly', 'Cloud-ready'],
    order: 4,
    isFeatured: true,
  },
  {
    title: 'UI/UX Web Designing',
    slug: 'ui-ux-web-designing',
    category: 'website-development',
    shortDescription: 'Visually appealing, user-focused designs that convert.',
    description:
      'Improved usability through visually appealing and user-focused designs that enhance engagement and conversion rates.',
    icon: 'Palette',
    features: ['Wireframing', 'Prototyping', 'User research', 'Design systems'],
    order: 5,
  },
  {
    title: 'API Development',
    slug: 'api-development',
    category: 'website-development',
    shortDescription: 'Versatile APIs to connect systems and expand capabilities.',
    description:
      'Combine various systems with API development designed to improve capabilities, interface with services, and ensure versatility.',
    icon: 'Plug',
    features: ['REST & GraphQL', 'Third-party integration', 'Documentation', 'Secure endpoints'],
    order: 6,
  },
  {
    title: 'Search Engine Optimization',
    slug: 'search-engine-optimization',
    category: 'digital-marketing',
    shortDescription: 'Best SEO services in Jaipur for top Google rankings.',
    description:
      'SEO is fundamental to organic growth. Our specialists use the latest technologies to help you claim your desired position on Google.',
    icon: 'Search',
    features: ['Keyword research', 'On-page SEO', 'Technical SEO', 'Analytics reporting'],
    order: 1,
    isFeatured: true,
  },
  {
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    category: 'digital-marketing',
    shortDescription: 'Boost visibility and engagement across social platforms.',
    description:
      'From post creation to paid campaigns and outcome tracking — we intensify your visibility and interactions with target customers.',
    icon: 'Share2',
    features: ['Content creation', 'Campaign management', 'Analytics', 'Community engagement'],
    order: 2,
    isFeatured: true,
  },
  {
    title: 'Performance Marketing',
    slug: 'performance-marketing',
    category: 'digital-marketing',
    shortDescription: 'Data-driven campaigns for maximum ROI.',
    description:
      'Paid media campaigns optimized through data analytics for immediate and efficient conversion to monetary value.',
    icon: 'TrendingUp',
    features: ['PPC campaigns', 'Conversion tracking', 'A/B testing', 'ROI optimization'],
    order: 3,
  },
  {
    title: 'Content Marketing',
    slug: 'content-marketing',
    category: 'digital-marketing',
    shortDescription: 'High-quality blogs, videos, and eBooks aligned with your brand.',
    description:
      'Our writers and SEO specialists develop unique content that strengthens your position and expands your readership.',
    icon: 'PenTool',
    features: ['Blog writing', 'Video content', 'eBooks', 'Content strategy'],
    order: 4,
  },
  {
    title: 'Logo Design',
    slug: 'logo-design',
    category: 'graphic-branding',
    shortDescription: 'Memorable logos that convey your brand beliefs.',
    description:
      'A logo is your brand identity. We deliver logos that are easily remembered, recognized, and influential.',
    icon: 'Sparkles',
    features: ['Multiple concepts', 'Vector formats', 'Brand guidelines', 'Revisions included'],
    order: 1,
    isFeatured: true,
  },
  {
    title: 'Corporate Branding',
    slug: 'corporate-branding',
    category: 'graphic-branding',
    shortDescription: 'Complete brand identity with colors, fonts, and materials.',
    description:
      'Compelling color themes, fonts, slogans, logos and marketing materials that fortify your corporate identity.',
    icon: 'Building2',
    features: ['Brand guidelines', 'Color palettes', 'Typography', 'Marketing collateral'],
    order: 2,
  },
  {
    title: 'E-Commerce Product Listing',
    slug: 'ecommerce-product-listing',
    category: 'ecommerce-setup',
    shortDescription: 'Optimized listings that attract buyers and boost conversions.',
    description:
      'Detailed and attractive marketplace listings considering general and specific requirements to generate more conversion rates.',
    icon: 'Package',
    features: ['Marketplace optimization', 'Rich descriptions', 'Image guidelines', 'Category mapping'],
    order: 1,
    isFeatured: true,
  },
  {
    title: 'E-Commerce SEO',
    slug: 'ecommerce-seo',
    category: 'ecommerce-setup',
    shortDescription: 'Keyword research and listing visibility for more sales.',
    description:
      'Right keywords from research tools give your services a competitive edge, ensuring visibility over competing offers.',
    icon: 'BarChart3',
    features: ['Keyword research', 'Listing optimization', 'Ranking improvement', 'Competitor analysis'],
    order: 2,
  },
  {
    title: 'Brand Registry & Protection',
    slug: 'brand-registry-protection',
    category: 'ecommerce-setup',
    shortDescription: 'Protect your brand from copying and competition.',
    description:
      'From brand registry to category optimization, sponsored ads, order management, and feedback management.',
    icon: 'Shield',
    features: ['Brand registry', 'IP protection', 'Category optimization', 'Monitoring'],
    order: 3,
  },
  {
    title: 'Business Consulting',
    slug: 'business-consulting',
    category: 'business-growth',
    shortDescription: 'Strategic guidance to scale your business.',
    description:
      'We work closely with you to understand goals and create custom strategies that deliver real, measurable results.',
    icon: 'Briefcase',
    features: ['Growth strategy', 'Market analysis', 'Process optimization', 'KPI tracking'],
    order: 1,
    isFeatured: true,
  },
  {
    title: 'Sales Funnels',
    slug: 'sales-funnels',
    category: 'business-growth',
    shortDescription: 'Conversion-optimized funnels for more revenue.',
    description:
      'Build effective sales funnels that guide prospects from awareness to purchase with automation and analytics.',
    icon: 'Filter',
    features: ['Funnel design', 'Landing pages', 'Email sequences', 'Conversion tracking'],
    order: 2,
  },
  {
    title: 'Product Listing on Seller Central',
    slug: 'seller-central-listing',
    category: 'seller-central',
    shortDescription: 'Upload up to 100 listings via loader, flat file, or 1x1 methods.',
    description:
      'Remote assistants use listing loader, flat file formats and 1x1 methods to upload products on your eCommerce seller central account.',
    icon: 'Upload',
    features: ['Up to 100 listings', 'Flat file upload', 'Listing loader', 'Quality checks'],
    order: 1,
    isFeatured: true,
  },
  {
    title: 'Price & Quantity Management',
    slug: 'price-quantity-management',
    category: 'seller-central',
    shortDescription: 'Inventory and pricing updates via Excel and calls.',
    description:
      'Price and quantity updates through excels and calls. Sellers informed of reducing inventory or pricing errors with custom rules.',
    icon: 'IndianRupee',
    features: ['Excel-based updates', 'Inventory alerts', 'Pricing rules', 'Error notifications'],
    order: 2,
  },
  {
    title: 'Negative Feedback Management',
    slug: 'negative-feedback-management',
    category: 'seller-central',
    shortDescription: 'Proactive removal of policy-violating negative feedback.',
    description:
      'Proactive work on removal of negative feedback not per marketplace policies. Notification management and POA when required.',
    icon: 'MessageSquareWarning',
    features: ['Policy review', 'POA submission', 'Notification handling', 'Rating protection'],
    order: 3,
  },
  {
    title: 'A-Z Claim Management',
    slug: 'az-claim-management',
    category: 'seller-central',
    shortDescription: 'Represent cases to close or fund A-Z claims.',
    description:
      'Service provider represents cases against A-Z claims filed by buyers to get them closed or funded by marketplace safe-t claims.',
    icon: 'Scale',
    features: ['Case representation', 'Documentation', 'Safe-t claims', 'Resolution tracking'],
    order: 4,
  },
  {
    title: 'FBA Shipment Creation',
    slug: 'fba-shipment-creation',
    category: 'seller-central',
    shortDescription: 'Shipment creation, CARP appointments, and tracking.',
    description:
      'Assist sellers in creation of shipments, taking CARP appointments and tracking shipments on behalf of the seller.',
    icon: 'Truck',
    features: ['Shipment setup', 'CARP appointments', 'Tracking', 'Label support'],
    order: 5,
  },
  {
    title: 'Sponsored Ads Management',
    slug: 'sponsored-ads-management',
    category: 'seller-central',
    shortDescription: 'Low ACOS campaigns with optimized daily budgets.',
    description:
      'Campaign creation, ad optimization keeping low ACOS and high sales, with bid amounts and daily budgets for targeted visibility.',
    icon: 'Megaphone',
    features: ['Campaign creation', 'ACOS optimization', 'Bid management', 'Performance reports'],
    order: 6,
    isFeatured: true,
  },
  {
    title: 'Buyer-Seller Communication',
    slug: 'buyer-seller-communication',
    category: 'seller-central',
    shortDescription: 'Respond to queries within 24 hours (up to 100 msgs/week).',
    description:
      'Respond to buyer and marketplace queries within 24 hrs per contact response policy to protect from negative ratings.',
    icon: 'MessagesSquare',
    features: ['24hr response', 'Up to 100 msgs/week', 'Template responses', 'Rating protection'],
    order: 7,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log(`Seeded ${services.length} services successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
