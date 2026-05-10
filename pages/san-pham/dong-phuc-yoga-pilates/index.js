import CategoryPageTemplate from '../../../components/univisport/CategoryPageTemplate';
import YogaPilatesUniviPage from '../../../components/univisport/bai-viet/YogaPilatesUniviPage';
import { getProductsByCategory, getAllCategoryCounts } from '../../../lib/getProductsByCategory';

const SLUG = 'dong-phuc-yoga-pilates';

export default function DongPhucYogaPilates({ initialProducts, categoryCounts }) {
  return <CategoryPageTemplate categorySlug={SLUG} initialProducts={initialProducts} categoryCounts={categoryCounts} ArticleComponent={YogaPilatesUniviPage} />;
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
          title: 'Đồng Phục Yoga Pilates Univi — Vải Super Cool, Xưởng Tại Hà Nội | Từ 10 Chiếc',
          description: 'Đồng phục Yoga Pilates Univi — vải Polyamide Super Cool mềm mịn như lụa, co giãn 4 chiều, UNI DRY thoát ẩm, kiểm định QCVN 01:2017/BCT. Xưởng 2.000m² Đan Phượng, Hà Nội. Đặt từ 10 chiếc, giao 2–3 ngày. Thiết kế miễn phí!',
          keywords: 'đồng phục yoga, đồng phục pilates, đồng phục yoga pilates chuyên dụng, vải Super Cool yoga, đồng phục phòng tập yoga Hà Nội, xưởng may đồng phục yoga, Đồng Phục Univi',
          author: 'Đồng Phục Univi',
          robots: 'index, follow',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          og: {
            title: 'Đồng Phục Yoga Pilates Univi — Vải Super Cool, Xưởng Tại Hà Nội',
            description: 'Đồng phục Yoga Pilates chuyên dụng — vải Polyamide Super Cool mềm mịn, co giãn 4 chiều, UNI DRY thoát ẩm, kiểm định QCVN. Xưởng Đan Phượng, Hà Nội.',
            type: 'website',
            image: 'https://dongphucunivi.com/images/banner-yoga.jpg',
            imageWidth: '1200',
            imageHeight: '630',
            imageAlt: 'Đồng phục Yoga Pilates Univi vải Super Cool chuyên dụng — xưởng sản xuất tại Đan Phượng Hà Nội',
            url: `https://dongphucunivi.com/san-pham/${SLUG}`,
            site_name: 'Đồng Phục Univi',
            locale: 'vi_VN',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'Đồng Phục Yoga Pilates Univi — Vải Super Cool, Xưởng Tại Hà Nội',
            description: 'Đồng phục Yoga Pilates chuyên dụng — vải Polyamide Super Cool mềm mịn, co giãn 4 chiều, UNI DRY thoát ẩm, kiểm định QCVN.',
            image: 'https://dongphucunivi.com/images/banner-yoga.jpg',
          },
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Yoga - Pilates', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Yoga Pilates Univi — Vải Super Cool Thoát Ẩm, Xưởng Tại Hà Nội',
              description: 'Đồng phục Yoga Pilates chuyên dụng từ xưởng Univi tại Đan Phượng, Hà Nội. Vải Polyamide Super Cool mềm mịn như lụa, co giãn 4 chiều, kiểm định QCVN 01:2017/BCT.',
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
          title: 'Đồng Phục Yoga Pilates Univi — Vải Super Cool, Xưởng Tại Hà Nội',
          description: 'Đồng phục Yoga Pilates chuyên dụng từ xưởng Univi tại Đan Phượng, Hà Nội.',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Yoga - Pilates', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Yoga Pilates Univi — Vải Super Cool Thoát Ẩm, Xưởng Tại Hà Nội',
              description: 'Đồng phục Yoga Pilates chuyên dụng từ xưởng Univi tại Đan Phượng, Hà Nội.',
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