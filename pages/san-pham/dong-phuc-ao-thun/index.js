import CategoryPageTemplate from '../../../components/univisport/CategoryPageTemplate';
import TShirtUniformsUniviPage from '../../../components/univisport/bai-viet/TShirtUniformsUniviPage';
import { getAllCategoryCounts } from '../../../lib/getProductsByCategory';
import db from '../../../utils/db';
import Product from '../../../models/Product';

const SLUG = 'dong-phuc-ao-thun';

const toCloudinaryUrl = (relativePath) => {
  if (!relativePath) return '/images/placeholder.jpg';
  if (relativePath.includes('/image/upload/')) {
    const parts = relativePath.split('/');
    const versionIndex = parts.findIndex((part) => part.startsWith('v') && !isNaN(part.slice(1)));
    if (versionIndex !== -1) {
      return `https://res.cloudinary.com/dcgtt1jza/image/upload/v1/${parts.slice(versionIndex + 1).join('/')}`;
    }
  }
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `https://res.cloudinary.com/dcgtt1jza/image/upload/v1/${cleanPath}`;
};

export default function DongPhucAoThun({ initialProducts, categoryCounts }) {
  return <CategoryPageTemplate categorySlug={SLUG} initialProducts={initialProducts} categoryCounts={categoryCounts} ArticleComponent={TShirtUniformsUniviPage} />;
}

export async function getServerSideProps() {
  try {
    await db.connectDb();
    const [productsData, categoryCounts] = await Promise.all([
      Product.find({ category: SLUG }).lean(),
      getAllCategoryCounts(),
    ]);

    const initialProducts = Array.isArray(productsData)
      ? productsData.map((product) => ({
          id: product._id || null,
          name: product.name || 'Untitled Product',
          price: product.price || 0,
          maxPrice: product.originalPrice || 0,
          description: product.description || '',
          image: toCloudinaryUrl(product.image),
          slug: product.slug || '',
          colors: Array.isArray(product.colors)
            ? product.colors.map((color) => ({
                name: color.name || 'Unknown',
                hex: color.hex || '#000000',
                hex2: color.hex2 || '',
                image: toCloudinaryUrl(color.image || product.image),
              }))
            : [],
          isNew: product.isNew || false,
          isFeatured: product.isFeatured || false,
          discount: product.discount || 0,
        }))
      : [];

    return {
      props: {
        initialProducts,
        categoryCounts,
        meta: {
          title: 'Đồng phục áo thun - Đồng phục Univi',
          description: 'Khám phá bộ sưu tập đồng phục áo thun chất lượng cao từ Đồng phục Univi! Sản phẩm áo thun của chúng tôi được thiết kế thoải mái, bền đẹp với chất liệu cotton và thun lạnh cao cấp, phù hợp cho mọi hoạt động thể thao và sinh hoạt.',
          keywords: 'đồng phục áo thun, Đồng phục Univi, áo thun cotton, đồng phục thể thao, áo thun đồng phục, đồng phục đội nhóm, áo thun CLB',
          author: 'Đồng phục Univi',
          robots: 'index, follow',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          og: {
            title: 'Đồng phục áo thun - Đồng phục Univi',
            description: 'Khám phá bộ sưu tập đồng phục áo thun chất lượng cao từ Đồng phục Univi!',
            type: 'website',
            image: 'https://dongphucunivi.com/images/dong-phuc-ao-thun.jpg',
            imageWidth: '1200',
            imageHeight: '630',
            url: `https://dongphucunivi.com/san-pham/${SLUG}`,
            site_name: 'Đồng phục Univi',
            locale: 'vi_VN',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'Đồng phục áo thun - Đồng phục Univi',
            description: 'Khám phá bộ sưu tập đồng phục áo thun chất lượng cao từ Đồng phục Univi!',
            image: 'https://dongphucunivi.com/images/dong-phuc-ao-thun.jpg',
            site: '@UniviSport',
          },
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Áo Thun', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Áo Thun Univi — Chất Liệu Cotton Cao Cấp, Xưởng Tại Hà Nội',
              description: 'Bộ sưu tập đồng phục áo thun chất lượng cao từ Đồng phục Univi. Chất liệu cotton và thun lạnh cao cấp.',
              url: `https://dongphucunivi.com/san-pham/${SLUG}`,
              isPartOf: { '@id': 'https://dongphucunivi.com/#website' },
              about: { '@id': 'https://dongphucunivi.com/#organization' },
              inLanguage: 'vi-VN',
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['h1', 'h2'],
              },
            },
          ],
        },
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return {
      props: {
        initialProducts: [],
        categoryCounts: {},
        meta: {
          title: 'Đồng phục áo thun - Đồng phục Univi',
          description: 'Đồng phục áo thun chất lượng cao từ Đồng phục Univi.',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Áo Thun', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Áo Thun Univi — Chất Liệu Cotton Cao Cấp, Xưởng Tại Hà Nội',
              description: 'Đồng phục áo thun chất lượng cao từ Đồng phục Univi.',
              url: `https://dongphucunivi.com/san-pham/${SLUG}`,
              isPartOf: { '@id': 'https://dongphucunivi.com/#website' },
              about: { '@id': 'https://dongphucunivi.com/#organization' },
              inLanguage: 'vi-VN',
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['h1', 'h2'],
              },
            },
          ],
        },
      },
    };
  }
}
