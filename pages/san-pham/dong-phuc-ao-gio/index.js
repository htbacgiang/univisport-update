import CategoryPageTemplate from '../../../components/univisport/CategoryPageTemplate';
import AogoUniviPage from '../../../components/univisport/bai-viet/AogoUniviPage';
import { getProductsByCategory, getAllCategoryCounts } from '../../../lib/getProductsByCategory';

const SLUG = 'dong-phuc-ao-gio';

export default function DongPhucAoGio({ initialProducts, categoryCounts }) {
  return <CategoryPageTemplate categorySlug={SLUG} initialProducts={initialProducts} categoryCounts={categoryCounts} ArticleComponent={AogoUniviPage} />;
}

export async function getServerSideProps() {
  try {
    const [initialProducts, categoryCounts] = await Promise.all([
      getProductsByCategory(SLUG),
      getAllCategoryCounts(),
    ]);
    return {
      props: {
        initialProducts,
        categoryCounts,
        meta: {
          title: 'Đồng Phục Áo Gió Univi — Cản Gió, Chống Thấm, Xưởng Tại Hà Nội | Từ 10 Chiếc',
          description: 'Đồng phục Áo Gió Univi — công nghệ 3 Chống (cản gió, trượt nước, chống UV), vải siêu nhẹ thoáng khí, kiểm định QCVN 01:2017/BCT. Xưởng 2.000m² Đan Phượng, Hà Nội. Lý tưởng cho Team Building, sự kiện, doanh nghiệp. Thiết kế miễn phí!',
          keywords: 'đồng phục áo gió, áo gió đồng phục doanh nghiệp, áo gió team building, đồng phục áo gió Hà Nội, xưởng may áo gió, áo gió cản gió chống thấm, Đồng Phục Univi',
          author: 'Đồng Phục Univi',
          robots: 'index, follow',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          og: {
            title: 'Đồng Phục Áo Gió Univi — Cản Gió, Chống Thấm, Xưởng Tại Hà Nội',
            description: 'Đồng phục Áo Gió công nghệ 3 Chống: cản gió, trượt nước, chống UV. Vải siêu nhẹ thoáng khí, kiểm định QCVN. Xưởng Đan Phượng, Hà Nội. Team Building, sự kiện, doanh nghiệp.',
            type: 'website',
            image: 'https://dongphucunivi.com/images/banner-ao-gio.jpg',
            imageWidth: '1200',
            imageHeight: '630',
            imageAlt: 'Đồng phục Áo Gió Univi công nghệ 3 Chống chuyên dụng — xưởng sản xuất tại Đan Phượng Hà Nội',
            url: `https://dongphucunivi.com/san-pham/${SLUG}`,
            site_name: 'Đồng Phục Univi',
            locale: 'vi_VN',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'Đồng Phục Áo Gió Univi — Cản Gió, Chống Thấm, Xưởng Tại Hà Nội',
            description: 'Đồng phục Áo Gió công nghệ 3 Chống: cản gió, trượt nước, chống UV. Vải siêu nhẹ, kiểm định QCVN.',
            image: 'https://dongphucunivi.com/images/banner-ao-gio.jpg',
          },
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Áo Gió', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Áo Gió Univi — Công Nghệ 3 Chống, Xưởng Tại Hà Nội',
              description: 'Đồng phục Áo Gió chuyên dụng từ xưởng Univi tại Đan Phượng, Hà Nội. Công nghệ 3 Chống: cản gió, trượt nước, chống UV. Vải siêu nhẹ, kiểm định QCVN 01:2017/BCT.',
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
          title: 'Đồng Phục Áo Gió Univi — Cản Gió, Chống Thấm, Xưởng Tại Hà Nội',
          description: 'Đồng phục Áo Gió công nghệ 3 Chống từ xưởng Univi tại Đan Phượng, Hà Nội.',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Áo Gió', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Áo Gió Univi — Công Nghệ 3 Chống, Xưởng Tại Hà Nội',
              description: 'Đồng phục Áo Gió công nghệ 3 Chống từ xưởng Univi tại Đan Phượng, Hà Nội.',
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
