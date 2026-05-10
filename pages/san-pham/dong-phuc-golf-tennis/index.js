import CategoryPageTemplate from '../../../components/univisport/CategoryPageTemplate';
import GolfTennisUniviPage from '../../../components/univisport/bai-viet/GolfTennisUniviPage';
import { getProductsByCategory, getAllCategoryCounts } from '../../../lib/getProductsByCategory';

const SLUG = 'dong-phuc-golf-tennis';

export default function DongPhucGolfTennis({ initialProducts, categoryCounts }) {
  return <CategoryPageTemplate categorySlug={SLUG} initialProducts={initialProducts} categoryCounts={categoryCounts} ArticleComponent={GolfTennisUniviPage} />;
}

export async function getServerSideProps() {
  try {
    const [initialProducts, categoryCounts] = await Promise.all([getProductsByCategory(SLUG), getAllCategoryCounts()]);
    return {
      props: {
        initialProducts,
        categoryCounts,
        meta: {
          title: 'Đồng phục Golf và Tennis - Đồng phục Univi',
          description: 'Tự tin thể hiện trên sân Golf và Tennis với đồng phục cao cấp từ Đồng Phục Univi. Chúng tôi sử dụng chất liệu vải thể thao chuyên biệt, siêu nhẹ, có khả năng thấm hút mồ hôi vượt trội, khô nhanh và co giãn 4 chiều, giúp bạn thoải mái trong từng cú đánh.',
          keywords: 'đồng phục golf, đồng phục tennis, Đồng phục Univi, quần áo thể thao, đồng phục thể thao, thiết kế golf tennis, thể thao chất lượng',
          author: 'Đồng phục Univi',
          robots: 'index, follow',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          og: {
            title: 'Đồng phục Golf và Tennis - Đồng phục Univi',
            description: 'Tự tin thể hiện trên sân Golf và Tennis với đồng phục cao cấp từ Đồng Phục Univi.',
            type: 'website',
            image: 'https://dongphucunivi.com/images/banner-ao-gym.jpg',
            imageWidth: '1200',
            imageHeight: '630',
            url: `https://dongphucunivi.com/san-pham/${SLUG}`,
            site_name: 'Đồng phục Univi',
            locale: 'vi_VN',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'Đồng phục Golf và Tennis - Đồng phục Univi',
            description: 'Tự tin thể hiện trên sân Golf và Tennis với đồng phục cao cấp từ Đồng Phục Univi.',
            image: 'https://dongphucunivi.com/images/banner-ao-gym.jpg',
            site: '@UniviSport',
          },
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Golf & Tennis', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Golf & Tennis Univi — Vải Thể Thao Cao Cấp, Xưởng Tại Hà Nội',
              description: 'Tự tin thể hiện trên sân Golf và Tennis với đồng phục cao cấp từ Đồng Phục Univi. Vải siêu nhẹ, thoát ẩm vượt trội, co giãn 4 chiều.',
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
          title: 'Đồng phục Golf và Tennis - Đồng phục Univi',
          description: 'Đồng phục Golf và Tennis cao cấp từ Đồng Phục Univi.',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục Golf & Tennis', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục Golf & Tennis Univi — Vải Thể Thao Cao Cấp, Xưởng Tại Hà Nội',
              description: 'Đồng phục Golf và Tennis cao cấp từ Đồng Phục Univi.',
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
