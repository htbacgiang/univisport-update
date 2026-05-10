import CategoryPageTemplate from '../../../components/univisport/CategoryPageTemplate';
import RunningUniviPage from '../../../components/univisport/bai-viet/RunningUniviPage';
import { getProductsByCategory, getAllCategoryCounts } from '../../../lib/getProductsByCategory';

const SLUG = 'dong-phuc-chay-bo';

export default function DongPhucChayBo({ initialProducts, categoryCounts }) {
  return <CategoryPageTemplate categorySlug={SLUG} initialProducts={initialProducts} categoryCounts={categoryCounts} ArticleComponent={RunningUniviPage} />;
}

export async function getServerSideProps() {
  try {
    const [initialProducts, categoryCounts] = await Promise.all([getProductsByCategory(SLUG), getAllCategoryCounts()]);
    return {
      props: {
        initialProducts,
        categoryCounts,
        meta: {
          title: 'Đồng phục Chạy bộ - Đồng phục Univi',
          description: 'Univi chuyên may đồng phục chạy bộ cho cá nhân & CLB. Chất liệu mềm mại, chống ma sát, thiết kế thoải mái vận động. In logo đội nhóm. Khám phá ngay!',
          keywords: 'đồng phục chạy bộ, Đồng phục Univi, quần áo thể thao, đồng phục thể thao, thiết kế chạy bộ, thể thao chất lượng',
          author: 'Đồng phục Univi',
          robots: 'index, follow',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          og: {
            title: 'Đồng phục Chạy bộ - Đồng phục Univi',
            description: 'Univi chuyên may đồng phục chạy bộ cho cá nhân & CLB. Chất liệu mềm mại, chống ma sát, thiết kế thoải mái vận động.',
            type: 'website',
            image: 'https://dongphucunivi.com/images/dong-phuc-chay-bo.jpg',
            imageWidth: '1200',
            imageHeight: '630',
            url: `https://dongphucunivi.com/san-pham/${SLUG}`,
            site_name: 'Đồng phục Univi',
            locale: 'vi_VN',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'Đồng phục Chạy bộ - Đồng phục Univi',
            description: 'Univi chuyên may đồng phục chạy bộ cho cá nhân & CLB. Chất liệu mềm mại, chống ma sát, thiết kế thoải mái vận động.',
            image: 'https://dongphucunivi.com/images/dong-phuc-chay-bo.jpg',
            site: '@UniviSport',
          },
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Chạy Bộ', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Chạy Bộ Univi — Vải Thoát Mồ Hôi, Xưởng Tại Hà Nội',
              description: 'Univi chuyên may đồng phục chạy bộ cho cá nhân & CLB. Chất liệu mềm mại, chống ma sát, thiết kế thoải mái vận động.',
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
          title: 'Đồng phục Chạy bộ - Đồng phục Univi',
          description: 'Univi chuyên may đồng phục chạy bộ cho cá nhân & CLB.',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Chạy Bộ', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Chạy Bộ Univi — Vải Thoát Mồ Hôi, Xưởng Tại Hà Nội',
              description: 'Univi chuyên may đồng phục chạy bộ cho cá nhân & CLB.',
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
