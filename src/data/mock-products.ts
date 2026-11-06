import { ProductWithVariants } from '@/types/database';

export const MOCK_PRODUCTS: ProductWithVariants[] = [
  {
    id: 'prod-001',
    name: 'Air Jordan 1 Retro High OG',
    slug: 'air-jordan-1-retro-high-og',
    brand: 'Jordan',
    description: 'Familiar yet fresh, the iconic Air Jordan 1 is remastered for today\'s sneakerhead culture. Crafted from premium full-grain leather with encapsulated Nike Air cushioning and classic Wings logo.',
    category: 'Retro',
    base_price: 180.00,
    is_active: true,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
    variants: [
      {
        id: 'var-001-chicago-8',
        product_id: 'prod-001',
        size: 'US 8',
        color: 'Lost & Found Chicago',
        color_hex: '#DC2626',
        sku: 'DZ5485-612-8',
        stock_quantity: 4,
        price_override: 210.00,
        image_urls: [
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-001-chicago-85',
        product_id: 'prod-001',
        size: 'US 8.5',
        color: 'Lost & Found Chicago',
        color_hex: '#DC2626',
        sku: 'DZ5485-612-85',
        stock_quantity: 0, // OUT OF STOCK test case
        price_override: 210.00,
        image_urls: [
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-001-chicago-9',
        product_id: 'prod-001',
        size: 'US 9',
        color: 'Lost & Found Chicago',
        color_hex: '#DC2626',
        sku: 'DZ5485-612-9',
        stock_quantity: 8,
        price_override: 210.00,
        image_urls: [
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-001-chicago-95',
        product_id: 'prod-001',
        size: 'US 9.5',
        color: 'Lost & Found Chicago',
        color_hex: '#DC2626',
        sku: 'DZ5485-612-95',
        stock_quantity: 12,
        price_override: 210.00,
        image_urls: [
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-001-chicago-10',
        product_id: 'prod-001',
        size: 'US 10',
        color: 'Lost & Found Chicago',
        color_hex: '#DC2626',
        sku: 'DZ5485-612-10',
        stock_quantity: 0, // OUT OF STOCK
        price_override: 210.00,
        image_urls: [
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-001-chicago-11',
        product_id: 'prod-001',
        size: 'US 11',
        color: 'Lost & Found Chicago',
        color_hex: '#DC2626',
        sku: 'DZ5485-612-11',
        stock_quantity: 5,
        price_override: 210.00,
        image_urls: [
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-001-shadow-9',
        product_id: 'prod-001',
        size: 'US 9',
        color: 'Shadow Grey',
        color_hex: '#475569',
        sku: '555088-035-9',
        stock_quantity: 6,
        price_override: 190.00,
        image_urls: [
          'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-001-shadow-10',
        product_id: 'prod-001',
        size: 'US 10',
        color: 'Shadow Grey',
        color_hex: '#475569',
        sku: '555088-035-10',
        stock_quantity: 2,
        price_override: 190.00,
        image_urls: [
          'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 'prod-002',
    name: 'Nike Dunk Low Retro',
    slug: 'nike-dunk-low-retro',
    brand: 'Nike',
    description: 'Created for the hardwood but taken to the streets, the \'80s b-ball icon returns with perfectly shined overlays and classic team colors. Channel vintage hoops style with a padded, low-cut collar.',
    category: 'Lifestyle',
    base_price: 115.00,
    is_active: true,
    created_at: new Date('2024-02-01').toISOString(),
    updated_at: new Date('2024-02-01').toISOString(),
    variants: [
      {
        id: 'var-002-panda-8',
        product_id: 'prod-002',
        size: 'US 8',
        color: 'Panda Black/White',
        color_hex: '#000000',
        sku: 'DD1391-100-8',
        stock_quantity: 15,
        price_override: 115.00,
        image_urls: [
          'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-002-panda-9',
        product_id: 'prod-002',
        size: 'US 9',
        color: 'Panda Black/White',
        color_hex: '#000000',
        sku: 'DD1391-100-9',
        stock_quantity: 0, // OUT OF STOCK
        price_override: 115.00,
        image_urls: [
          'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-002-panda-10',
        product_id: 'prod-002',
        size: 'US 10',
        color: 'Panda Black/White',
        color_hex: '#000000',
        sku: 'DD1391-100-10',
        stock_quantity: 9,
        price_override: 115.00,
        image_urls: [
          'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-002-unc-9',
        product_id: 'prod-002',
        size: 'US 9',
        color: 'Coast Blue',
        color_hex: '#38BDF8',
        sku: 'DD1391-102-9',
        stock_quantity: 7,
        price_override: 130.00,
        image_urls: [
          'https://images.unsplash.com/photo-1512374382149-233c42b661ac?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 'prod-003',
    name: 'New Balance 9060',
    slug: 'new-balance-9060',
    brand: 'New Balance',
    description: 'The 9060 is a new expression of the refined style and innovation-led design of the classic 99X series. Reinterpreting familiar elements with a warped sensibility inspired by the futuristic Y2K aesthetic.',
    category: 'Lifestyle',
    base_price: 150.00,
    is_active: true,
    created_at: new Date('2024-02-10').toISOString(),
    updated_at: new Date('2024-02-10').toISOString(),
    variants: [
      {
        id: 'var-003-rain-85',
        product_id: 'prod-003',
        size: 'US 8.5',
        color: 'Rain Cloud Grey',
        color_hex: '#94A3B8',
        sku: 'U9060ECA-85',
        stock_quantity: 11,
        price_override: 150.00,
        image_urls: [
          'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-003-rain-95',
        product_id: 'prod-003',
        size: 'US 9.5',
        color: 'Rain Cloud Grey',
        color_hex: '#94A3B8',
        sku: 'U9060ECA-95',
        stock_quantity: 6,
        price_override: 150.00,
        image_urls: [
          'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-003-rain-105',
        product_id: 'prod-003',
        size: 'US 10.5',
        color: 'Rain Cloud Grey',
        color_hex: '#94A3B8',
        sku: 'U9060ECA-105',
        stock_quantity: 0, // OUT OF STOCK
        price_override: 150.00,
        image_urls: [
          'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 'prod-004',
    name: 'Adidas Yeezy Boost 350 V2',
    slug: 'adidas-yeezy-boost-350-v2',
    brand: 'Adidas',
    description: 'Featuring an upper composed of re-engineered Primeknit. The post-dyed monofilament side stripe is woven into the upper, while the midsole utilizes adidas innovative BOOST technology.',
    category: 'Lifestyle',
    base_price: 230.00,
    is_active: true,
    created_at: new Date('2024-02-15').toISOString(),
    updated_at: new Date('2024-02-15').toISOString(),
    variants: [
      {
        id: 'var-004-onyx-9',
        product_id: 'prod-004',
        size: 'US 9',
        color: 'Onyx Black',
        color_hex: '#1E293B',
        sku: 'HQ4540-9',
        stock_quantity: 3,
        price_override: 240.00,
        image_urls: [
          'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-004-onyx-10',
        product_id: 'prod-004',
        size: 'US 10',
        color: 'Onyx Black',
        color_hex: '#1E293B',
        sku: 'HQ4540-10',
        stock_quantity: 5,
        price_override: 240.00,
        image_urls: [
          'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-004-bone-95',
        product_id: 'prod-004',
        size: 'US 9.5',
        color: 'Bone White',
        color_hex: '#F8FAFC',
        sku: 'HQ6316-95',
        stock_quantity: 0, // OUT OF STOCK
        price_override: 230.00,
        image_urls: [
          'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 'prod-005',
    name: 'Nike Air Max 1 \'86 Big Bubble',
    slug: 'nike-air-max-1-86-big-bubble',
    brand: 'Nike',
    description: 'The holy grail of sneaker lore returns. Utilizing CT scans to reconstruct the original oversized Nike Air window from 1986, this release brings back the true dawn of visible Air.',
    category: 'Running',
    base_price: 150.00,
    is_active: true,
    created_at: new Date('2024-03-01').toISOString(),
    updated_at: new Date('2024-03-01').toISOString(),
    variants: [
      {
        id: 'var-005-red-9',
        product_id: 'prod-005',
        size: 'US 9',
        color: 'Sport Red',
        color_hex: '#EF4444',
        sku: 'DQ3989-100-9',
        stock_quantity: 8,
        price_override: 150.00,
        image_urls: [
          'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-005-red-10',
        product_id: 'prod-005',
        size: 'US 10',
        color: 'Sport Red',
        color_hex: '#EF4444',
        sku: 'DQ3989-100-10',
        stock_quantity: 4,
        price_override: 150.00,
        image_urls: [
          'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 'prod-006',
    name: 'New Balance 550 Basketball',
    slug: 'new-balance-550-basketball',
    brand: 'New Balance',
    description: 'The original 550 debuted in 1989 and made its mark on basketball courts from coast to coast. After its initial run, the 550 was filed away in the archives, before being reintroduced as a global streetwear staple.',
    category: 'Basketball',
    base_price: 120.00,
    is_active: true,
    created_at: new Date('2024-03-10').toISOString(),
    updated_at: new Date('2024-03-10').toISOString(),
    variants: [
      {
        id: 'var-006-green-85',
        product_id: 'prod-006',
        size: 'US 8.5',
        color: 'White/Vintage Green',
        color_hex: '#15803D',
        sku: 'BB550WT1-85',
        stock_quantity: 14,
        price_override: 120.00,
        image_urls: [
          'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'var-006-green-95',
        product_id: 'prod-006',
        size: 'US 9.5',
        color: 'White/Vintage Green',
        color_hex: '#15803D',
        sku: 'BB550WT1-95',
        stock_quantity: 7,
        price_override: 120.00,
        image_urls: [
          'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1200&q=80'
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }
];

export function getProductBySlug(slug: string): ProductWithVariants | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}
