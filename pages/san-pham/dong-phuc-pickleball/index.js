import CategoryPageTemplate from '../../../components/univisport/CategoryPageTemplate';
import PickleballUniviPage from '../../../components/univisport/bai-viet/PickleballUniviPage';
import { getProductsByCategory, getAllCategoryCounts } from '../../../lib/getProductsByCategory';

const SLUG = 'dong-phuc-pickleball';

export default function DongPhucPickleball({ initialProducts, categoryCounts }) {
  return <CategoryPageTemplate categorySlug={SLUG} initialProducts={initialProducts} categoryCounts={categoryCounts} ArticleComponent={PickleballUniviPage} />;
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
          title: 'Đồng Phục Pickleball Univi — Vải UNI DRY, Xưởng Tại Hà Nội | Từ 10 Chiếc',
          description: 'Đồng phục Pickleball Univi — vải Polyamide co giãn 4 chiều, công nghệ UNI DRY thoát ẩm một chiều, kiểm định QCVN 01:2017/BCT. Xưởng sản xuất 2.000m² tại Đan Phượng, Hà Nội. Đặt từ 10 chiếc, giao 2–3 ngày. Thiết kế miễn phí!',
          keywords: 'đồng phục pickleball, đồng phục pickleball chuyên dụng, vải UNI DRY pickleball, đồng phục CLB pickleball Hà Nội, xưởng may đồng phục pickleball, Đồng Phục Univi',
          author: 'Đồng Phục Univi',
          robots: 'index, follow',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          og: {
            title: 'Đồng Phục Pickleball Univi — Vải UNI DRY, Xưởng Tại Hà Nội',
            description: 'Đồng phục Pickleball chuyên dụng — vải Polyamide co giãn 4 chiều, UNI DRY thoát ẩm, kiểm định QCVN. Xưởng 2.000m² Đan Phượng, Hà Nội. Đặt từ 10 chiếc.',
            type: 'website',
            image: 'https://dongphucunivi.com/images/banner-ao-pik.jpg',
            imageWidth: '1200',
            imageHeight: '630',
            imageAlt: 'Đồng phục Pickleball Univi vải UNI DRY chuyên dụng — xưởng sản xuất tại Đan Phượng Hà Nội',
            url: `https://dongphucunivi.com/san-pham/${SLUG}`,
            site_name: 'Đồng Phục Univi',
            locale: 'vi_VN',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'Đồng Phục Pickleball Univi — Vải UNI DRY, Xưởng Tại Hà Nội',
            description: 'Đồng phục Pickleball chuyên dụng — vải Polyamide co giãn 4 chiều, UNI DRY thoát ẩm, kiểm định QCVN.',
            image: 'https://dongphucunivi.com/images/banner-ao-pik.jpg',
          },
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Pickleball', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Pickleball Univi — Vải UNI DRY Thoát Ẩm, Xưởng Tại Hà Nội',
              description: 'Đồng phục Pickleball chuyên dụng từ xưởng Univi tại Đan Phượng, Hà Nội. Vải Polyamide co giãn 4 chiều, công nghệ UNI DRY, kiểm định QCVN 01:2017/BCT.',
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
          title: 'Đồng Phục Pickleball Univi — Vải UNI DRY, Xưởng Tại Hà Nội',
          description: 'Đồng phục Pickleball chuyên dụng từ xưởng Univi tại Đan Phượng, Hà Nội.',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Pickleball', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Pickleball Univi — Vải UNI DRY Thoát Ẩm, Xưởng Tại Hà Nội',
              description: 'Đồng phục Pickleball chuyên dụng từ xưởng Univi tại Đan Phượng, Hà Nội.',
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
