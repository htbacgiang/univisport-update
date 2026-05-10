import CategoryPageTemplate from '../../../components/univisport/CategoryPageTemplate';
import GymUniviPage from '../../../components/univisport/bai-viet/GymUniviPage';
import { getProductsByCategory, getAllCategoryCounts } from '../../../lib/getProductsByCategory';

const SLUG = 'dong-phuc-gym';

export default function DongPhucGym({ initialProducts, categoryCounts }) {
  return <CategoryPageTemplate categorySlug={SLUG} initialProducts={initialProducts} categoryCounts={categoryCounts} ArticleComponent={GymUniviPage} />;
}

export async function getServerSideProps() {
  try {
    const [initialProducts, categoryCounts] = await Promise.all([getProductsByCategory(SLUG), getAllCategoryCounts()]);
    return {
      props: {
        initialProducts,
        categoryCounts,
        meta: {
          title: 'Đồng Phục Gym Univi — Vải UNI DRY Thoát Ẩm, Xưởng Tại Hà Nội | Từ 10 Chiếc',
          description: 'Đồng phục Gym Univi — vải Polyester spandex 20–25%, công nghệ UNI DRY thoát ẩm một chiều, kiểm định QCVN 01:2017/BCT. Xưởng sản xuất 2.000m² tại Đan Phượng, Hà Nội. Đặt từ 10 chiếc, giao 2–3 ngày. Thiết kế miễn phí!',
          keywords: 'đồng phục gym, Đồng phục Univi, quần áo thể thao, đồng phục thể thao, thiết kế gym, thể thao chất lượng, UNI DRY, đồng phục HLV, xưởng Hà Nội, spandex, kiểm định QCVN',
          author: 'Đồng phục Univi',
          robots: 'index, follow',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          og: {
            title: 'Đồng Phục Gym Univi — Vải UNI DRY Thoát Ẩm, Xưởng Tại Hà Nội | Từ 10 Chiếc',
            description: 'Đồng phục Gym Univi — vải Polyester spandex 20–25%, công nghệ UNI DRY thoát ẩm một chiều, kiểm định QCVN 01:2017/BCT. Xưởng sản xuất 2.000m² tại Đan Phượng, Hà Nội. Đặt từ 10 chiếc, giao 2–3 ngày. Thiết kế miễn phí!',
            type: 'website',
            image: 'https://dongphucunivi.com/images/dong-phuc-gym.jpg',
            imageWidth: '1200',
            imageHeight: '630',
            url: `https://dongphucunivi.com/san-pham/${SLUG}`,
            site_name: 'Đồng phục Univi',
            locale: 'vi_VN',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'Đồng Phục Gym Univi — Vải UNI DRY Thoát Ẩm, Xưởng Tại Hà Nội | Từ 10 Chiếc',
            description: 'Đồng phục Gym Univi — vải Polyester spandex 20–25%, công nghệ UNI DRY thoát ẩm một chiều, kiểm định QCVN 01:2017/BCT. Xưởng sản xuất 2.000m² tại Đan Phượng, Hà Nội. Đặt từ 10 chiếc, giao 2–3 ngày. Thiết kế miễn phí!',
            image: 'https://dongphucunivi.com/images/dong-phuc-gym.jpg',
            site: '@UniviSport',
          },
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Gym', item: 'https://dongphucunivi.com/san-pham/dong-phuc-gym' },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': 'https://dongphucunivi.com/san-pham/dong-phuc-gym#webpage',
              name: 'Đồng Phục Gym Univi — Vải UNI DRY Thoát Ẩm, Xưởng Tại Hà Nội',
              description: 'Đồng phục Gym Univi — vải Polyester spandex 20–25%, công nghệ UNI DRY thoát ẩm một chiều, kiểm định QCVN 01:2017/BCT. Xưởng sản xuất 2.000m² tại Đan Phượng, Hà Nội. Đặt từ 10 chiếc, giao 2–3 ngày. Thiết kế miễn phí!',
              url: 'https://dongphucunivi.com/san-pham/dong-phuc-gym',
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
          title: 'Đồng Phục Gym Univi — Vải UNI DRY Thoát Ẩm, Xưởng Tại Hà Nội | Từ 10 Chiếc',
          description: 'Đồng Phục Univi: Giải pháp đồng phục Gym chuyên nghiệp cho Gymer, PT và phòng tập.',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Gym', item: 'https://dongphucunivi.com/san-pham/dong-phuc-gym' },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': 'https://dongphucunivi.com/san-pham/dong-phuc-gym#webpage',
              name: 'Đồng Phục Gym Univi — Vải UNI DRY Thoát Ẩm, Xưởng Tại Hà Nội',
              description: 'Đồng Phục Univi: Giải pháp đồng phục Gym chuyên nghiệp cho Gymer, PT và phòng tập.',
              url: 'https://dongphucunivi.com/san-pham/dong-phuc-gym',
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
