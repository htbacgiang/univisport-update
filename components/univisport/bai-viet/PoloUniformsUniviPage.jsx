import Link from 'next/link';
import Image from 'next/image';

export default function PoloUniformsUniviPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
                {/* Hero Section */}
                <div className="bg-[#105d97] text-white rounded-lg p-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-4 leading-tight">
                            Đồng Phục Áo Polo Chuyên Nghiệp
                            <span className="text-yellow-300"> Nâng Tầm Hình Ảnh Doanh Nghiệp</span>
                        </h1>
                        <p className="text-base md:text-xl text-white">
                            Khám phá bộ sưu tập áo polo đồng phục cao cấp từ Đồng Phục Univi - Giải pháp toàn diện cho doanh nghiệp, tổ chức và đội nhóm chuyên nghiệp
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <article className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-2">
                        <span className="font-bold mr-2">1.</span>
                        Tại Sao Lựa Chọn Áo Polo Đồng Phục Là Điều Cần Thiết?
                    </h2>

                    <div className="space-y-3">
                        <p className="text-base">
                            Áo polo, với thiết kế cổ bẻ đặc trưng và chất liệu vải thường là Pique co giãn, từ lâu đã vượt ra khỏi ranh giới của một trang phục thể thao đơn thuần để trở thành một biểu tượng của sự thanh lịch, năng động và chuyên nghiệp. Ngày nay, áo polo đồng phục là lựa chọn hàng đầu của vô số doanh nghiệp, tổ chức, trường học và đội nhóm.
                        </p>
                        <p className="text-base">
                            Khác biệt hoàn toàn với quần áo thông thường, <span className="font-semibold">áo polo đồng phục chuyên dụng</span> được thiết kế và sản xuất với những tính năng ưu việt. Đầu tư vào áo polo chất lượng mang lại nhiều lợi ích không ngờ:
                        </p>
                    </div>

                    <div className="grid gap-1 mt-4">
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Tính linh hoạt và đa dụng vượt trội</h3>
                            <p>Áo polo dễ dàng thích ứng với nhiều môi trường và mục đích sử dụng khác nhau, từ không gian công sở chuyên nghiệp, các sự kiện trang trọng, hoạt động đội nhóm năng động, đến việc sử dụng làm quà tặng doanh nghiệp ý nghĩa.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Vẻ ngoài chuyên nghiệp, lịch sự mà vẫn thoải mái</h3>
                            <p>So với áo sơ mi truyền thống, áo polo mang lại sự chỉn chu cần thiết mà vẫn giữ được nét trẻ trung, năng động và đặc biệt là sự thoải mái tối đa cho người mặc trong suốt ngày dài hoạt động.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Công cụ xây dựng và quảng bá hình ảnh thương hiệu</h3>
                            <p>Với bề mặt vải rộng và phẳng, áo polo là không gian lý tưởng để in hoặc thêu logo, slogan, tên công ty, góp phần tăng cường nhận diện thương hiệu một cách tinh tế và chuyên nghiệp.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Tạo sự thoải mái và tự tin cho người mặc</h3>
                            <p>Chất liệu vải cao cấp, có khả năng co giãn và thấm hút mồ hôi tốt giúp nhân viên luôn cảm thấy tự tin, thoải mái và duy trì năng lượng tích cực trong công việc.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Góp phần xây dựng tinh thần đồng đội</h3>
                            <p>Sự đồng bộ trong trang phục tạo nên một hình ảnh gắn kết, chuyên nghiệp, đồng thời thể hiện niềm tự hào và sự thuộc về của mỗi cá nhân đối với tổ chức.</p>
                        </div>
                    </div>
                </article>
                <div className="my-6 text-center">
                    <figure className="inline-block rounded-lg overflow-hidden shadow-md">
                        <Image
                            src="/images/chay-bo/cong-so-2.webp"
                            alt="Áo polo đồng phục Univi cao cấp, thanh lịch, phù hợp cho doanh nghiệp và sự kiện"
                            width={800}
                            height={400}
                            layout="responsive"
                            sizes="(max-width: 800px) 100vw, 800px"
                            quality={80}
                            priority={true}
                        />
                    </figure>
                </div>
                <article className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-2">
                        <span className="font-bold mr-2">2.</span>
                        Đồng Phục Univi – Giải Pháp Áo Polo Đồng Phục Tối Ưu
                    </h2>

                    <div className="space-y-3 mb-4">
                        <p className="text-base">
                            Thấu hiểu tầm quan trọng và những giá trị mà áo polo đồng phục mang lại, <span className="font-semibold">Đồng Phục Univi</span> (thuộc Đồng Phục Univi) tự hào là đơn vị xưởng may chuyên cung cấp các giải pháp đồng phục thể thao, đồng phục công ty, đồng phục công sở, và đặc biệt là áo polo cao cấp. Với hơn <span className="font-semibold">8 năm kinh nghiệm</span>, Univi đã khẳng định được vị thế và uy tín, trở thành đối tác chiến lược được tin tưởng bởi hàng trăm doanh nghiệp như: Sun Group, Premier Village, Sun World, Thanh Cong Group, Tập đoàn Than Khoáng sản Việt Nam, KickFit Sport, Fitcare, Yoko Onsen Quang Hanh…
                        </p>
                        <p className="text-base">
                            Sứ mệnh của Đồng Phục Univi là tạo ra một thương hiệu phục vụ tất cả mọi người... xứng đáng được tiếp cận với những sản phẩm quần áo chất lượng cao mang lại sự hỗ trợ và thoải mái đặc biệt&quot;. Chúng tôi không ngừng nghiên cứu chuyên sâu về chất liệu và công nghệ may để mỗi sản phẩm đến tay bạn đều là sự kết hợp hoàn hảo giữa tính năng và thẩm mỹ.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 mb-4">
                        <h3 className="font-bold text-base mb-3">
                            Univi cam kết:
                        </h3>
                        <div className="space-y-2">
                            <div>
                                <span className="font-semibold">Chất lượng sản phẩm đặt lên hàng đầu:</span>
                                <span className="text-base ml-2">Univi kiên định với chính sách &quot;Không tính phí nếu sản phẩm không đạt chuẩn. Đây là cam kết duy nhất của chúng tôi.&quot;</span>
                            </div>
                            <div>
                                <span className="font-semibold">An toàn tuyệt đối cho sức khỏe người mặc:</span>
                                <span className="text-base ml-2">Tất cả chất liệu vải được kiểm định an toàn với da, nói không với hóa chất độc hại như Formaldehyde hay các amin thơm từ thuốc nhuộm Azo.</span>
                            </div>
                            <div>
                                <span className="font-semibold">Giải pháp chuyên dụng cho áo polo:</span>
                                <span className="text-base ml-2">Đội ngũ chuyên gia đảm bảo mỗi chiếc áo polo có form dáng chuẩn, độ bền cao và thoải mái, được thiết kế để tối ưu hóa hiệu suất và mang lại sự thoải mái tối đa.</span>
                            </div>
                        </div>
                    </div>
                </article>
                <div className="my-6 text-center">
                    <figure className="inline-block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#105d97]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        <Image
                            src="/images/dong-phuc-ao-polo.jpg"
                            alt="Áo polo Piquecool Univi thoáng mát, co giãn, lý tưởng cho môi trường công sở"
                            width={800}
                            height={400}
                            layout="responsive"
                            sizes="(max-width: 800px) 100vw, 800px"
                            className="transition-transform duration-300"
                            quality={80}
                        />
                    </figure>
                </div>
                <article className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-2">
                        <span className="font-bold mr-2">3.</span>
                        Khám Phá Đặc Điểm Vượt Trội Của Áo Polo Đồng Phục Univi
                    </h2>

                    <p className="text-base mb-3">
                        Mỗi sản phẩm áo polo đồng phục từ Univi là kết tinh của quá trình nghiên cứu kỹ lưỡng và sự đầu tư nghiêm túc vào chất lượng.
                    </p>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-2">
                            3.1 Chất liệu vải cao cấp – Đáp ứng mọi nhu cầu
                        </h3>
                        <p className="text-base mb-4">
                            Univi <span className="font-semibold">&quot;đam mê nghiên cứu chuyên sâu về chất liệu... tìm kiếm được những chất liệu vải tốt nhất, phù hợp nhất với từng bộ môn tập luyện&quot;</span>.
                        </p>
                        <div className="grid gap-1">
                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                                <h4 className="font-bold text-base mb-1">
                                    Cotton 100%
                                </h4>
                                <p>Nổi tiếng với sự mềm mại tự nhiên, khả năng thoáng khí và thấm hút mồ hôi vượt trội, mang lại cảm giác thoải mái tối đa, đặc biệt phù hợp cho môi trường làm việc năng động.</p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                                <h4 className="font-bold text-base mb-1">
                                    Piquecool (Vải cá sấu mắt chim)
                                </h4>
                                <p>Lựa chọn phổ biến cho áo polo cao cấp, có khả năng co giãn tốt, thoáng khí vượt trội và giữ form dáng chuẩn sau nhiều lần giặt, mang lại vẻ ngoài lịch lãm và hiện đại.</p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                                <h4 className="font-bold text-base mb-1">
                                    Lacoste USA (Vải cá sấu Lacoste)
                                </h4>
                                <p>Dòng vải cao cấp với độ dày dặn, bề mặt mịn màng, đứng form, độ bền màu xuất sắc, thể hiện sự sang trọng và đẳng cấp.</p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                                <h4 className="font-bold text-base mb-1">
                                    Polyester Cao Cấp (PET)
                                </h4>
                                <p>Độ bền màu cao, chống nhăn, dễ bảo quản, giá thành hợp lý, phù hợp cho đơn hàng lớn hoặc môi trường đòi hỏi độ bền cao.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-2">
                            3.2 Thiết kế tinh tế – Form dáng chuẩn mực
                        </h3>
                        <div className="grid gap-1">
                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                                <span className="font-semibold">Kiểu dáng đa dạng:</span>
                                <span className="text-base ml-2">Polo Classic (truyền thống, lịch sự), Polo Slim-fit (ôm vừa vặn, tôn dáng), Polo phối màu (tạo điểm nhấn tinh tế), thiết kế riêng cho nam và nữ.</span>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                                <span className="font-semibold">Chi tiết tỉ mỉ:</span>
                                <span className="text-base ml-2">Cổ áo gia công từ vải bo dệt chất lượng cao, đứng form, không bai dão. Trụ áo nẹp cúc chắc chắn, hài hòa với thiết kế.</span>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                                <span className="font-semibold">Đường may tinh tế:</span>
                                <span className="text-base ml-2">Kỹ thuật may tiên tiến, đường kim mũi chỉ đều, chắc chắn, đảm bảo sản phẩm bền đẹp.</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#105d97]/5 to-blue-50 rounded-xl p-4">
                        <h3 className="text-xl font-bold mb-2">
                            3.3 Công nghệ in/thêu logo hiện đại
                        </h3>
                        <p className="text-base mb-3">
                            <span className="font-semibold">Univi mang đến</span> các công nghệ in/thêu tiên tiến:
                        </p>
                        <div className="grid md:grid-cols-3 gap-1">
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                <h4 className="font-bold mb-1">
                                    In lụa
                                </h4>
                                <p className="text-base">Phù hợp đơn hàng lớn, màu sắc tươi sáng, độ bền cao.</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                <h4 className="font-bold mb-1">
                                    In decal chuyển nhiệt
                                </h4>
                                <p className="text-base">Họa tiết phức tạp, đa dạng màu sắc, sắc nét.</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                <h4 className="font-bold mb-1">
                                    Thêu vi tính
                                </h4>
                                <p className="text-base">Sang trọng, độ bền vĩnh cửu, lý tưởng cho logo.</p>
                            </div>
                        </div>
                    </div>
                </article>
                <div className="my-6 text-center">
                    <figure className="inline-block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#105d97]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        <Image
                            src="/images/dong-phuc-cong-so.webp"
                            alt="Áo polo Lacoste USA Univi sang trọng, đứng form, lý tưởng cho thương hiệu doanh nghiệp"
                            width={800}
                            height={400}
                            layout="responsive"
                            sizes="(max-width: 800px) 100vw, 800px"
                            className="transition-transform duration-300"
                            quality={80}
                        />
                    </figure>
                </div>

                <article className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-2">
                        <span className="font-bold mr-2">4.</span>
                        Lợi Ích Vượt Trội Khi Doanh Nghiệp Lựa Chọn Áo Polo Đồng Phục Univi
                    </h2>

                    <p className="text-base mb-3">
                        <span className="font-semibold">Đầu tư vào áo polo đồng phục từ Univi</span> là đầu tư cho sức khỏe, hiệu suất và hình ảnh của bạn:
                    </p>

                    <div className="grid gap-1">
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Xây dựng hình ảnh thương hiệu chuyên nghiệp</h3>
                            <p>Tạo ấn tượng tốt đẹp, tăng sự tin cậy với khách hàng và đối tác.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Tăng cường đoàn kết nội bộ</h3>
                            <p>Nhân viên cảm thấy gắn bó, tự hào, có động lực cống hiến.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Giải pháp marketing hiệu quả</h3>
                            <p>Áo polo là &quot;biển quảng cáo di động&quot;, lan tỏa thương hiệu tự nhiên.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Thoải mái, tự tin</h3>
                            <p>Nâng cao hiệu suất làm việc của nhân viên.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <h3 className="font-bold text-base mb-1">Bền đẹp, tiết kiệm chi phí</h3>
                            <p>Chất liệu cao cấp, kỹ thuật may chuẩn, giảm chi phí thay mới.</p>
                        </div>
                    </div>
                </article>


                <article className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-2">
                        <span className="font-bold mr-2">5.</span>
                        Ứng Dụng Đa Dạng và Linh Hoạt Của Áo Polo Đồng Phục Univi
                    </h2>

                    <p className="text-base mb-3">
                        Với thiết kế đa năng, áo polo đồng phục Univi phù hợp cho:
                    </p>

                    <div className="grid gap-1">
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <p>Đồng phục nhân viên văn phòng, khối công ty, tập đoàn.</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <p>Đồng phục cho nhân viên kinh doanh, bán hàng, dịch vụ khách hàng.</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <p>Đồng phục cho sự kiện, hội thảo, hội nghị, triển lãm thương mại.</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <p>Đồng phục cho đội nhóm, câu lạc bộ thể thao, tổ chức xã hội, trường học.</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <p>Đồng phục cho team building, hoạt động ngoại khóa, du lịch công ty.</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <p>Quà tặng doanh nghiệp ý nghĩa, thiết thực, có giá trị quảng bá cao.</p>
                        </div>
                    </div>
                </article>
                <div className="my-6 text-center">
                    <figure className="inline-block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#105d97]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        <Image
                            src="/product/ao-polo.webp"
                            alt="Áo polo đồng phục Univi năng động, phù hợp cho team building và sự kiện ngoài trời"
                            width={800}
                            height={400}
                            layout="responsive"
                            sizes="(max-width: 800px) 100vw, 800px"
                            className="transition-transform duration-300"
                            quality={80}
                        />
                    </figure>
                </div>
                <article className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-2">
                        <span className="font-bold mr-2">6.</span>
                        Quy Trình Đặt May Áo Polo Đồng Phục Univi Chuyên Nghiệp – Nhanh Chóng – Dễ Dàng
                    </h2>
                    <p className="text-base mb-3">
                        <span className="font-semibold">Univi cam kết</span> mang đến trải nghiệm đặt hàng thuận tiện và chuyên nghiệp nhất:
                    </p>
                    <ol className="grid gap-1 mb-6">
                        <li className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 hover:border-[#105d97] hover:shadow-xl transition-all relative">
                            <strong>Tiếp Nhận Yêu Cầu & Tư Vấn:</strong> Chia sẻ nhu cầu về số lượng, kiểu dáng, chất liệu, màu sắc, ngân sách. Đội ngũ Univi đề xuất giải pháp tối ưu.
                        </li>
                        <li className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 hover:border-[#105d97] hover:shadow-xl transition-all relative">
                            <strong>Thiết Kế Miễn Phí:</strong> Phác thảo mẫu demo, chỉnh sửa không giới hạn đến khi hài lòng.
                        </li>
                        <li className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 hover:border-[#105d97] hover:shadow-xl transition-all relative">
                            <strong>May Mẫu & Báo Giá:</strong> Sản xuất mẫu thực tế (nếu cần), cung cấp báo giá chi tiết, cạnh tranh.
                        </li>
                        <li className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 hover:border-[#105d97] hover:shadow-xl transition-all relative">
                            <strong>Sản Xuất:</strong> Ký hợp đồng, triển khai sản xuất theo tiêu chuẩn cam kết.
                        </li>
                        <li className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 hover:border-[#105d97] hover:shadow-xl transition-all relative">
                            <strong>Kiểm Tra Chất Lượng (KCS):</strong> Kiểm tra tỉ mỉ từng sản phẩm trước khi xuất xưởng.
                        </li>
                        <li className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 hover:border-[#105d97] hover:shadow-xl transition-all relative">
                            <strong>Giao Hàng Đúng Hẹn:</strong> Vận chuyển an toàn, đúng tiến độ trên toàn quốc.
                        </li>
                        <li className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 hover:border-[#105d97] hover:shadow-xl transition-all relative">
                            <strong>Bảo Hành & Hậu Mãi:</strong> Cam kết bảo hành, hỗ trợ tận tâm sau bán hàng.
                        </li>
                    </ol>
                </article>
                <article className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-2">
                        <span className="font-bold mr-2">7.</span>
                        Đồng Phục Univi – Đối Tác Đồng Hành Nâng Tầm Thương Hiệu Doanh Nghiệp & Trải Nghiệm Nhân Viên
                    </h2>
                    <p className="text-base mb-3">
                        <span className="font-semibold">Univi</span> không chỉ đơn thuần là nhà cung cấp đồng phục, chúng tôi mong muốn trở thành đối tác chiến lược, mang đến <span className="font-semibold">&quot;GIẢI PHÁP SMART SPORT UNIFORM CHO CÁC DOANH NGHIỆP&quot;</span>. Chúng tôi giúp các doanh nghiệp nâng cao hình ảnh thương hiệu, tạo sự khác biệt và mang đến trải nghiệm tốt nhất cho nhân viên thông qua những bộ đồng phục chất lượng, được thiết kế riêng.
                    </p>
                    <p className="text-base mb-3">
                        Với kinh nghiệm hợp tác cùng các đơn vị thể thao uy tín, Univi hiểu rõ những thách thức và cơ hội trong ngành. Chúng tôi cam kết mang lại những sản phẩm đồng phục áo polo không chỉ đẹp về mẫu mã, vượt trội về chất lượng mà còn có mức giá hợp lý, <span className="font-semibold">&quot;chỉ từ 99.000 đ cho các sản phẩm trung cao cấp&quot;</span>, tạo ra giá trị thực sự cho mọi khách hàng.
                    </p>
                </article>
                <article className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-2">
                        <span className="font-bold mr-2">8.</span>
                        Nâng Tầm Hình Ảnh Thương Hiệu Cùng Áo Polo Đồng Phục Univi
                    </h2>
                    <p className="text-base mb-3">
                        <span className="font-semibold">Tại Đồng Phục Univi</span>, chúng tôi không chỉ tạo ra những bộ đồng phục áo polo, chúng tôi kiến tạo những người bạn đồng hành đáng tin cậy trên hành trình xây dựng hình ảnh doanh nghiệp. Chúng tôi tin rằng, một bộ trang phục tốt sẽ góp phần không nhỏ vào thành công và niềm vui của mỗi nhân viên.
                    </p>
                    <p className="text-base mb-3">
                        Hãy để những chiếc áo polo đồng phục từ Univi trở thành một phần không thể thiếu trong việc xây dựng và củng cố hình ảnh chuyên nghiệp, năng động, hiện đại và gắn kết cho doanh nghiệp, tổ chức của bạn. Chúng tôi cam kết mang đến những sản phẩm không chỉ đáp ứng yêu cầu về mặt thẩm mỹ và chất lượng, mà còn góp phần truyền tải hiệu quả thông điệp và giá trị thương hiệu của quý vị.
                    </p>
                    <p className="text-base mb-3">
                        Bạn đã sẵn sàng cho những bước tiến mới, những trải nghiệm áo polo đồng phục tuyệt vời hơn? Đừng để trang phục giới hạn tiềm năng của bạn!
                    </p>
                </article>

                {/* Contact Section */}
                <div className="bg-[#105d97] text-white rounded-lg p-6 mt-6">
                    <div>
                        <div className="text-center mb-6">
                            <h3 className="text-xl md:text-xl font-bold mb-2">
                                Nhận Tư Vấn & Báo Giá Áo Polo Đồng Phục Univi Ngay Hôm Nay!
                            </h3>
                            <p className="text-base text-white max-w-4xl mx-auto mb-4">
                                Đã đến lúc nâng cấp hình ảnh doanh nghiệp của bạn với những bộ áo polo đồng phục đẳng cấp từ <span className="text-yellow-300 font-bold">Đồng Phục Univi</span>! Đừng để trang phục kém chất lượng cản trở hành trình xây dựng thương hiệu của bạn.
                            </p>
                            <p className="text-sm text-white mb-4">
                                Liên hệ ngay với Univi để được tư vấn miễn phí, nhận thiết kế độc quyền và báo giá ưu đãi nhất:
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="font-semibold text-yellow-300 mb-1">Hotline</div>
                                <div className="text-white">083 420 4999</div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="font-semibold text-yellow-300 mb-1">Email</div>
                                <div className="text-white">dongphucunivi@gmail.com</div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="font-semibold text-yellow-300 mb-1">Địa chỉ</div>
                                <div className="text-white">D14, 180 Thanh Bình, Hà Đông</div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-sm">
                                Đồng Phục Univi – Your Uniform, Your Brand!
                            </div>
                            <p className="text-white mt-3 font-medium">
                                Tự tin khẳng định dấu ấn riêng cùng đồng phục áo polo chuyên nghiệp!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}