import Link from 'next/link';
import Image from 'next/image';

function SectionNumber({ n }) {
  return (
    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#105d97] text-white text-sm font-bold flex items-center justify-center">
      {n}
    </span>
  );
}

function Card({ title, children }) {
  return (
    <div className="border-l-4 border-blue-500 bg-gray-50 rounded-r-lg px-4 py-3">
      {title && <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>}
      <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function ArticleImage({ src, alt }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm mb-8">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        layout="responsive"
        sizes="(max-width: 800px) 100vw, 800px"
        quality={90}
      />
    </div>
  );
}

export default function GymUniviPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* Hero */}
      <div className="bg-[#105d97] text-white rounded-xl px-8 py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Đồng Phục Gym Chuyên Nghiệp –{' '}
          <span className="text-yellow-300">Nâng Tầm Hiệu Suất Tập Luyện</span>
        </h1>
        <p className="text-white/90 text-base md:text-lg max-w-3xl">
          Khám phá bộ sưu tập đồng phục gym cao cấp từ Đồng Phục Univi — Giải pháp toàn diện
          cho gymer và các chuỗi phòng tập chuyên nghiệp.
        </p>
      </div>

      {/* Section 1 */}
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-7 md:px-8">
        <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-800 mb-5">
          <SectionNumber n="1" />
          Tại Sao Lựa Chọn Trang Phục Gym Chuyên Nghiệp Là Điều Cần Thiết?
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Phong trào tập Gym và rèn luyện sức khỏe đang ngày càng lan tỏa mạnh mẽ trong cộng đồng người
          Việt. Để mỗi buổi tập thực sự hiệu quả, việc lựa chọn trang phục đóng vai trò vô cùng thiết yếu.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          <span className="font-semibold text-gray-800">Đồng phục Gym chuyên dụng</span> được thiết kế với
          những tính năng ưu việt, mang lại nhiều lợi ích thiết thực:
        </p>

        <div className="space-y-3">
          <Card title="Tối ưu sự thoải mái & linh hoạt">
            Chất liệu co giãn 4 chiều, thiết kế thông minh giúp bạn tự do thực hiện mọi động tác từ tạ nặng đến cardio cường độ cao.
          </Card>
          <Card title="Hỗ trợ vận động hiệu quả">
            Lực nén nhẹ lên cơ bắp cải thiện lưu thông máu, giảm tích tụ axit lactic, hạn chế mệt mỏi và chuột rút.
          </Card>
          <Card title="Thấm hút mồ hôi & thoáng khí vượt trội">
            Giữ cơ thể khô ráo, thoáng mát ngay cả khi vận động cường độ cao, ngăn ngừa vi khuẩn gây mùi.
          </Card>
          <Card title="Đảm bảo an toàn, phòng tránh chấn thương">
            Trang phục phù hợp bảo vệ cơ thể, giảm thiểu trầy xước và chấn thương do quần áo vướng víu.
          </Card>
          <Card title="Tăng sự tự tin & động lực tập luyện">
            Bộ đồ tập vừa vặn, thời trang giúp bạn tự tin hơn và có thêm động lực chinh phục mục tiêu.
          </Card>
          <Card title="Thể hiện phong cách và sự chuyên nghiệp">
            Đặc biệt quan trọng với PT và nhân viên phòng Gym — đồng phục chỉn chu tạo dựng hình ảnh đáng tin cậy.
          </Card>
        </div>
      </article>

      <ArticleImage
        src="/images/gym/dong-phuc-gym-univi-nhom-5-nguoi-phong-gym.jpg"
        alt="Gymer năng động trong bộ đồng phục Gym Univi, thể hiện sự thoải mái và phong cách chuyên nghiệp."
      />

      {/* Section 2 */}
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-7 md:px-8">
        <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-800 mb-5">
          <SectionNumber n="2" />
          Đồng Phục Univi – Giải Pháp Đồng Phục Gym Tối Ưu
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          <span className="font-semibold text-gray-800">Đồng Phục Univi</span> tự hào mang đến các giải pháp
          đồng phục Gym toàn diện với hơn{' '}
          <Link href="/gioi-thieu" className="text-blue-600 hover:underline font-semibold">
            8 năm kinh nghiệm
          </Link>{' '}
          trong lĩnh vực thiết kế và sản xuất đồng phục thể thao. Đối tác tin cậy của{' '}
          <Link href="/feedback/chuoi-phong-tap-the-one-kickfit" className="text-blue-600 hover:underline font-semibold">KickFit Sport</Link>,{' '}
          <Link href="/feedback/chuoi-phong-tap-fitcaree" className="text-blue-600 hover:underline font-semibold">Fitcare</Link>{' '}
          và hàng trăm doanh nghiệp thể hình uy tín.
        </p>

        <div className="bg-blue-50 rounded-xl px-5 py-4 border border-blue-100">
          <h3 className="font-bold text-gray-800 mb-3">Univi cam kết:</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Chất lượng đặt lên hàng đầu:</span>{' '}
              Không tính phí nếu sản phẩm không đạt chuẩn.
            </p>
            <p>
              <span className="font-semibold text-gray-800">An toàn tuyệt đối:</span>{' '}
              Tất cả chất liệu được kiểm định, không chứa Formaldehyde hay amin thơm từ thuốc nhuộm Azo.
            </p>
            <p>
              <span className="font-semibold text-gray-800">Giải pháp SMART SPORT UNIFORM:</span>{' '}
              Nâng tầm thương hiệu phòng tập, giải quyết tình trạng trang phục kém chất lượng, không chuyên dụng.
            </p>
          </div>
        </div>
      </article>

      <ArticleImage
        src="/images/gym/dong-phuc-gym-univi-nhom-7-nguoi-trang-den.jpg"
        alt="Đồng phục Gym Univi cho PT và nhân viên phòng tập, thể hiện sự chuyên nghiệp và năng động."
      />

      {/* Section 3 */}
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-7 md:px-8">
        <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-800 mb-5">
          <SectionNumber n="3" />
          Khám Phá Đặc Điểm Vượt Trội Của Đồng Phục Gym Univi
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Mỗi sản phẩm là kết tinh của quá trình nghiên cứu kỹ lưỡng và sự đầu tư nghiêm túc vào chất lượng.
        </p>

        {/* 3.1 */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            3.1 Chất liệu vải chuyên dụng
          </h3>
          <div className="space-y-3">
            <Card title="UNIVI-DRY PRO">
              Cản nắng – cản gió – cản bụi – nhanh khô. Phù hợp cardio cường độ cao và tập ngoài trời.
            </Card>
            <Card title="UNIVI – SUPER COOL (Polyamide)">
              Mềm – mượt – mát – mịn. Lựa chọn hoàn hảo cho Yoga, Dance, Group X trong phòng Gym.
            </Card>
            <Card title="UNIVI - BLENDED">
              Nhanh khô, mềm mịn, mát, nhẹ, chống tia UV, chống nhăn và bền màu. Dòng vải đa năng cho hầu hết bài tập Gym.
            </Card>
            <Card title="Các chất liệu khác">
              Polyester cao cấp (PET), Piquecool, Cotton 100% — đảm bảo co giãn 4 chiều, thấm hút mồ hôi, thoáng khí và an toàn cho da.
            </Card>
          </div>
        </div>

        {/* 3.2 */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            3.2 Thiết kế thông minh – Tối ưu cho mọi chuyển động
          </h3>
          <div className="space-y-3">
            <Card title="Form dáng đa dạng, khoa học">
              Compression (ôm sát), Fitted (ôm vừa) và Loose fit (rộng rãi) — đáp ứng mọi phong cách tập luyện.
            </Card>
            <Card title="Đường may phẳng (Flatlock seams)">
              Giảm cọ xát lên da, tránh ngứa hay kích ứng, đặc biệt quan trọng khi vận động cường độ cao.
            </Card>
            <Card title="Kiểu dáng thời trang, năng động">
              Cập nhật xu hướng mới nhất, giúp người mặc tự tin thể hiện phong cách cá nhân.
            </Card>
          </div>
        </div>

        {/* 3.3 */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            3.3 Công nghệ sản xuất hiện đại – Độ bền vượt trội
          </h3>
          <div className="space-y-3">
            <Card title="Kỹ thuật may tiên tiến">
              Chỉ may chuyên dụng đảm bảo độ bền ngay cả với bài tập nặng và tần suất giặt thường xuyên.
            </Card>
            <Card title="Công nghệ in thêu cao cấp">
              Logo, tên, họa tiết sắc nét, bền màu, không bong tróc — đảm bảo tính thẩm mỹ và chuyên nghiệp lâu dài.
            </Card>
          </div>
        </div>

        {/* 3.4 */}
        <div className="bg-blue-50 rounded-xl px-5 py-5 border border-blue-100">
          <h3 className="font-bold text-gray-800 mb-4">3.4 Giải pháp tùy chỉnh theo yêu cầu</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-1">Cho cá nhân</h4>
              <p className="text-sm text-gray-600">Tự do lựa chọn màu sắc, kiểu dáng, họa tiết yêu thích.</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-1">Cho đội nhóm PT, Câu lạc bộ</h4>
              <p className="text-sm text-gray-600">Đồng bộ màu sắc nhận diện thương hiệu, in/thêu logo, slogan chuyên nghiệp.</p>
            </div>
          </div>
        </div>
      </article>

      <ArticleImage
        src="/images/gym/giai-phap-2s.webp"
        alt="Sơ đồ quy trình đặt may đồng phục Gym chuyên nghiệp tại Univi."
      />

      {/* Section 4 */}
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-7 md:px-8">
        <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-800 mb-5">
          <SectionNumber n="4" />
          Lợi Ích Vượt Trội Khi Chọn Đồng Phục Gym Chính Hãng Univi
        </h2>
        <div className="space-y-3">
          <Card title="Tối đa hóa hiệu suất tập luyện">
            Trang phục phù hợp giúp bạn tập trung và phát huy tối đa tiềm năng.
          </Card>
          <Card title="Thoải mái & tự tin tuyệt đối">
            Chất liệu cao cấp và thiết kế thông minh giúp bạn tự tin trong mọi bài tập.
          </Card>
          <Card title="Xây dựng hình ảnh chuyên nghiệp">
            Đồng phục chỉn chu là tuyên ngôn về sự nghiêm túc của bạn hoặc thương hiệu phòng Gym.
          </Card>
          <Card title="Độ bền cao, tiết kiệm chi phí dài hạn">
            Chất liệu bền bỉ giúp tiết kiệm chi phí thay mới đồng phục thường xuyên.
          </Card>
          <Card title="Bảo vệ sức khỏe người mặc">
            Chất liệu an toàn, không độc hại, bạn hoàn toàn yên tâm sử dụng lâu dài.
          </Card>
        </div>
      </article>

      {/* Section 5 */}
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-7 md:px-8">
        <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-800 mb-5">
          <SectionNumber n="5" />
          Khám Phá Các Dòng Sản Phẩm Đồng Phục Gym Đa Dạng Tại Univi
        </h2>

        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            5.1 Đồng phục Gym dành cho Nam
          </h3>
          <div className="space-y-3">
            <Card title="Áo thun Gym (T-shirt)">Thiết kế đa dạng từ cổ tròn, cổ tim — chất liệu thoáng mát, thấm hút tốt.</Card>
            <Card title="Áo tank top, áo ba lỗ (Stringer)">Lý tưởng cho buổi tập cường độ cao, tối đa sự thoáng mát.</Card>
            <Card title="Quần short Gym">Nhiều độ dài và kiểu dáng, có túi tiện lợi, chất liệu co giãn và nhẹ.</Card>
            <Card title="Quần jogger, quần dài thể thao">Phù hợp khởi động, tập trong thời tiết se lạnh hoặc di chuyển đến phòng tập.</Card>
            <Card title="Quần legging nam (Compression Pants)">Hỗ trợ cơ bắp hiệu quả, tăng cường lưu thông máu.</Card>
          </div>
        </div>

        <ArticleImage
          src="/images/gym/dong-phuc-gym-univi-nam-trang-den-quan-short.jpg"
          alt="Đồng phục gym Univi nam trắng đen, áo thấm hút nhanh, quần short thoải mái."
        />

        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            5.2 Đồng phục Gym dành cho Nữ
          </h3>
          <div className="space-y-3">
            <Card title="Áo bra thể thao (Sports Bra)">Độ nâng đỡ đa dạng (low, medium, high impact) phù hợp từng loại hình vận động.</Card>
            <Card title="Áo croptop Gym, áo thun nữ, tank top nữ">Kiểu dáng trẻ trung, năng động, tôn dáng, chất liệu mềm mại, thoáng mát.</Card>
            <Card title="Quần legging Gym">Đa dạng kiểu dáng (cạp cao, cạp thường, dài, lửng, có túi), co giãn tối đa, ôm sát tôn dáng.</Card>
            <Card title="Quần short Gym nữ">Thiết kế 2 lớp hoặc 1 lớp, đảm bảo thoải mái và kín đáo khi vận động.</Card>
          </div>
        </div>

        <ArticleImage
          src="/images/gym/dong-phuc-gym-univi-nu-trang-den-legging.jpg"
          alt="Đồng phục gym Univi nữ trắng đen, áo thấm hút mồ hôi, quần legging co giãn."
        />

        <div>
          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            5.3 Đồng phục cho Huấn luyện viên (PT) và Nhân viên phòng Gym
          </h3>
          <div className="space-y-3">
            <Card title="Áo polo, áo thun có cổ">Thiết kế chuyên nghiệp, lịch sự, dễ dàng in/thêu logo và tên thương hiệu.</Card>
            <Card title="Chất liệu cao cấp">Đảm bảo thoải mái suốt quá trình làm việc, hướng dẫn và vận động cùng khách hàng.</Card>
            <Card title="Màu sắc và kiểu dáng đồng bộ">Thể hiện tính nhất quán và chuyên nghiệp của phòng tập.</Card>
          </div>
        </div>
      </article>

      <ArticleImage
        src="/images/gym/dong-phuc-pt-gym.jpg"
        alt="Đồng phục PT Gym Univi chuyên nghiệp."
      />

      {/* Section 6 */}
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-7 md:px-8">
        <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-800 mb-5">
          <SectionNumber n="6" />
          Quy Trình Đặt May Đồng Phục Gym Univi – Chuyên Nghiệp & Nhanh Chóng
        </h2>

        <ol className="space-y-3">
          {[
            ['Liên hệ & Tư vấn', 'Đội ngũ tư vấn viên lắng nghe nhu cầu và đề xuất giải pháp tối ưu về chất liệu, kiểu dáng, ngân sách.'],
            ['Thiết kế miễn phí & Chỉnh sửa linh hoạt', 'Đội ngũ thiết kế hiện thực hóa ý tưởng, chỉnh sửa đến khi bạn hoàn toàn hài lòng.'],
            ['May mẫu (nếu cần) & Báo giá chi tiết', 'Hỗ trợ may mẫu cho đơn lớn, báo giá minh bạch trước khi sản xuất.'],
            ['Ký hợp đồng & Sản xuất', 'Đơn hàng được sản xuất tại xưởng hiện đại với quy trình kiểm soát chất lượng nghiêm ngặt.'],
            ['Kiểm tra chất lượng (KCS)', 'Mỗi sản phẩm qua khâu KCS tỉ mỉ trước khi giao — từng đường kim, chất lượng in ấn, độ chính xác thiết kế.'],
            ['Giao hàng toàn quốc & Thanh toán linh hoạt', 'Giao đúng tiến độ cam kết, chấp nhận nhiều hình thức thanh toán.'],
            ['Chăm sóc sau bán hàng & Bảo hành ưu việt', 'Luôn sẵn sàng hỗ trợ mọi vấn đề phát sinh và giải đáp thắc mắc sau mua hàng.'],
          ].map(([title, desc], i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#105d97]/10 text-[#105d97] text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <span className="font-semibold text-gray-800">{title}: </span>
                <span className="text-gray-600 text-sm">{desc}</span>
              </div>
            </li>
          ))}
        </ol>
      </article>

      <ArticleImage
        src="/images/gym/dong-phuc-gym.jpg"
        alt="Đồng phục Gym Univi phong phú, đa dạng mẫu mã."
      />

      {/* Section 7 */}
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-7 md:px-8">
        <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-800 mb-4">
          <SectionNumber n="7" />
          Đồng Phục Univi – Đối Tác Nâng Tầm Thương Hiệu Phòng Gym
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Univi không chỉ đơn thuần là nhà cung cấp đồng phục — chúng tôi là đối tác chiến lược, mang đến{' '}
          <span className="font-semibold text-gray-800">GIẢI PHÁP SMART SPORT UNIFORM CHO CÁC CHUỖI PHÒNG TẬP</span>.
          Chúng tôi giúp phòng Gym nâng cao hình ảnh thương hiệu và mang đến trải nghiệm tốt nhất cho hội viên.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Đã hợp tác thành công với{' '}
          <Link href="/feedback/chuoi-phong-tap-the-one-kickfit" className="text-blue-600 hover:underline font-semibold">KickFit Sport</Link>,{' '}
          <Link href="/feedback/chuoi-phong-tap-fitcaree" className="text-blue-600 hover:underline font-semibold">Fitcare</Link>{' '}
          và hàng trăm đơn vị uy tín. Sản phẩm đẹp về mẫu mã, vượt trội về chất lượng với mức giá{' '}
          <span className="font-semibold text-gray-800">chỉ từ 99.000₫</span>.
        </p>
      </article>

      <ArticleImage
        src="/images/gym/dong-phuc-huan-luyen-vien.jpg"
        alt="Đồng phục huấn luyện viên Gym Univi kiểm định chất lượng chất liệu vải."
      />

      {/* Contact */}
      <div className="bg-[#105d97] text-white rounded-xl px-8 py-10">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            Nhận Tư Vấn & Báo Giá Đồng Phục Gym Univi Ngay Hôm Nay!
          </h3>
          <p className="text-white/85 text-sm max-w-2xl mx-auto">
            Đừng để trang phục kém chất lượng cản trở hành trình chinh phục mục tiêu sức khỏe của bạn.
            Liên hệ ngay để được tư vấn miễn phí và nhận báo giá ưu đãi.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            ['Hotline', '083 420 4999'],
            ['Email', 'dongphucunivi@gmail.com'],
            ['Địa chỉ', 'D14, 180 Thanh Bình, Hà Đông'],
          ].map(([label, value]) => (
            <div key={label} className="bg-white/10 rounded-xl px-5 py-4 text-center">
              <div className="text-white/70 text-xs uppercase tracking-wider mb-1">{label}</div>
              <div className="font-semibold text-sm">{value}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/80 text-sm font-medium">
          Đồng Phục Univi – <span className="text-yellow-300 font-bold">Your Uniform, Your Brand!</span>
        </p>
      </div>

    </div>
  );
}
