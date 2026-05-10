import CategoryPageTemplate from '../../../components/univisport/CategoryPageTemplate';
import MMAUniviPage from '../../../components/univisport/bai-viet/MMAUniviPage';
import { getProductsByCategory, getAllCategoryCounts } from '../../../lib/getProductsByCategory';

const SLUG = 'dong-phuc-mma';

export default function DongPhucMMA({ initialProducts, categoryCounts }) {
  return <CategoryPageTemplate categorySlug={SLUG} initialProducts={initialProducts} categoryCounts={categoryCounts} ArticleComponent={MMAUniviPage} />;
}

export async function getServerSideProps() {
  try {
    const [initialProducts, categoryCounts] = await Promise.all([getProductsByCategory(SLUG), getAllCategoryCounts()]);
    return {
      props: {
        initialProducts,
        categoryCounts,
        meta: {
          title: 'Đồng phục MMA - Đồng phục Univi',
          description: 'Bước vào sàn đấu MMA với sự tự tin tuyệt đối cùng đồng phục chuyên nghiệp từ Đồng Phục Univi! Sản phẩm quần short và áo rashguard MMA của chúng tôi được chế tạo từ vật liệu cao cấp, siêu bền, chống rách và co giãn đa chiều, cho phép bạn thực hiện mọi kỹ thuật grappling và striking một cách tự do.',
          keywords: 'đồng phục MMA, Đồng phục Univi, quần short MMA, áo rashguard, võ thuật, grappling, striking, đồng phục võ thuật',
          author: 'Đồng phục Univi',
          robots: 'index, follow',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          og: {
            title: 'Đồng phục MMA - Đồng phục Univi',
            description: 'Bước vào sàn đấu MMA với sự tự tin tuyệt đối cùng đồng phục chuyên nghiệp từ Đồng Phục Univi!',
            type: 'website',
            image: 'https://dongphucunivi.com/images/dong-phuc-mma.jpg',
            imageWidth: '1200',
            imageHeight: '630',
            url: `https://dongphucunivi.com/san-pham/${SLUG}`,
            site_name: 'Đồng phục Univi',
            locale: 'vi_VN',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'Đồng phục MMA - Đồng phục Univi',
            description: 'Bước vào sàn đấu MMA với sự tự tin tuyệt đối cùng đồng phục chuyên nghiệp từ Đồng Phục Univi!',
            image: 'https://dongphucunivi.com/images/dong-phuc-mma.jpg',
            site: '@UniviSport',
          },
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục MMA', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục MMA Univi — Vải Siêu Bền, Co Giãn Đa Chiều, Xưởng Tại Hà Nội',
              description: 'Bước vào sàn đấu MMA với sự tự tin tuyệt đối cùng đồng phục chuyên nghiệp từ Đồng Phục Univi. Vải cao cấp, siêu bền, chống rách, co giãn đa chiều.',
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
          title: 'Đồng phục MMA - Đồng phục Univi',
          description: 'Đồng phục MMA chuyên nghiệp từ Đồng Phục Univi.',
          canonical: `https://dongphucunivi.com/san-pham/${SLUG}`,
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com' },
                { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
                { '@type': 'ListItem', position: 3, name: 'Đồng Phục MMA', item: `https://dongphucunivi.com/san-pham/${SLUG}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              '@id': `https://dongphucunivi.com/san-pham/${SLUG}#webpage`,
              name: 'Đồng Phục MMA Univi — Vải Siêu Bền, Co Giãn Đa Chiều, Xưởng Tại Hà Nội',
              description: 'Đồng phục MMA chuyên nghiệp từ Đồng Phục Univi.',
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
