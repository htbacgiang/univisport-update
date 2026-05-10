// Helper function to get products by category from database
import db from '../utils/db';
import Product from '../models/Product';

// Keep image paths as-is, let components handle URL conversion
// (same logic as san-pham/[slug] page)
const toLocalImageUrl = (imagePath) => {
  // Return as-is, components will handle conversion
  return imagePath || '/images/placeholder.jpg';
};

// Fetch products data from database
async function getProductsData() {
  try {
    await db.connectDb();
    const products = await Product.find({}).lean();
    return products || [];
  } catch (error) {
    console.error('Error fetching products from database:', error);
    return [];
  }
}

export async function getProductsByCategory(categorySlug) {
  const productsData = await getProductsData();
  
  if (!categorySlug) {
    // Return all products if no category specified
    return productsData.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      maxPrice: product.originalPrice || 0,
      originalPrice: product.originalPrice,
      description: product.description,
      image: toLocalImageUrl(product.image),
      slug: product.slug,
      colors: Array.isArray(product.colors)
        ? product.colors.map(color => ({
            name: color.name,
            hex: color.hex,
            hex2: color.hex2 || '',
            image: toLocalImageUrl(color.image)
          }))
        : [],
      isNew: product.isNew || false,
      isFeatured: product.isFeatured || false,
      discount: product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0,
      category: product.category,
      categoryNameVN: product.categoryNameVN,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      material: product.material || ''
    }));
  }

  // Filter products by category
  const filtered = productsData.filter(product => product.category === categorySlug);
  
  return filtered.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    maxPrice: product.originalPrice || 0,
    originalPrice: product.originalPrice,
    description: product.description,
    image: toLocalImageUrl(product.image),
    slug: product.slug,
    colors: Array.isArray(product.colors)
      ? product.colors.map(color => ({
          name: color.name,
          hex: color.hex,
          hex2: color.hex2 || '',
          image: toLocalImageUrl(color.image)
        }))
      : [],
    isNew: product.isNew || false,
    isFeatured: product.isFeatured || false,
    discount: product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0,
    category: product.category,
    categoryNameVN: product.categoryNameVN,
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0,
    material: product.material || ''
  }));
}

export async function getAllProducts() {
  return await getProductsByCategory(null);
}

export async function getAllCategoryCounts() {
  const productsData = await getProductsData();
  const slugs = [
    'dong-phuc-gym', 'dong-phuc-yoga-pilates', 'dong-phuc-pickleball',
    'dong-phuc-chay-bo', 'dong-phuc-mma', 'dong-phuc-golf-tennis',
    'dong-phuc-ao-polo', 'dong-phuc-cong-so', 'dong-phuc-team-building',
    'dong-phuc-ao-gio', 'dong-phuc-ao-thun', 'dong-phuc-le-tan', 'dong-phuc-su-kien',
  ];
  const counts = {};
  for (const slug of slugs) {
    counts[slug] = productsData.filter((p) => p.category === slug).length;
  }
  return counts;
}

