import Link from 'next/link';
import Image from 'next/image';

export default function AogoUniviPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 space-y-6">
                {/* Hero */}
                <section className="bg-[#0f4c81] text-white rounded-2xl p-6 md:p-10 shadow-lg">
                    <h1 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                        ĐỒNG PHỤC ÁO GIÓ UNIVI
                    </h1>
                    <p className="text-base md:text-lg max-w-4xl leading-relaxed">
                      Đồng phục Áo Gió Univi là giải pháp công nghệ với kết cấu siêu nhẹ,
                        cản gió, chống tia UV và thoáng khí tối đa. Đây là biểu tượng cho sự chu đáo và tinh thần gắn kết nội bộ. Khám phá ngay ưu điểm giúp
                        doanh nghiệp bạn tiết kiệm chi phí và nâng tầm hình ảnh.
                    </p>
                </section>

                {/* Section I */}
                <article className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">
                        I. Tầm quan trọng và Công nghệ Bảo vệ Độc quyền của Áo Gió Univi
                    </h2>
                    <p className="text-base mb-6 leading-relaxed">
                        Áo gió Univi không chỉ là một lớp áo khoác đơn thuần. Nó là một công cụ bảo vệ hiệu suất và sức khỏe, được ứng dụng các công nghệ vải thể thao chuyên dụng.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3">
                                1.1. Thách thức lớn nhất khi hoạt động ngoài trời và sự cần thiết của Áo Gió Chuyên dụng
                            </h3>
                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-orange-100">
                                    <h4 className="font-bold text-base mb-2">Nguy cơ Sốc nhiệt và Cảm lạnh</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Áo khoác thông thường giữ mồ hôi và hơi ẩm trên da, gây cảm giác bí bách. Sau khi vận động, gió lùa vào lớp áo ẩm dễ dẫn đến cảm lạnh.
                                        Áo gió Univi với công nghệ Uni Dry thấm hút mồ hôi và thoát hơi ẩm nhanh chóng.
                                    </p>
                                </div>
                                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-yellow-100">
                                    <h4 className="font-bold text-base mb-2">Tác hại của Tia UV và ánh nắng</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Hoạt động lâu dưới trời nắng mà thiếu khả năng chống tia UV sẽ ảnh hưởng trực tiếp đến sức khỏe da và giảm sức bền. Áo gió Univi có tính năng chống tia UV.
                                    </p>
                                </div>
                                <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-4 border border-blue-100">
                                    <h4 className="font-bold text-base mb-2">Cản trở vận động và Giảm hiệu suất</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Vải thô cứng, nặng nề làm giảm sự linh hoạt và khiến người mặc nhanh kiệt sức. Áo gió Univi được thiết kế siêu nhẹ, đảm bảo sự linh hoạt tối đa.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3">
                                1.2. Công nghệ Bảo vệ Độc quyền: Giải pháp &quot;3 CẢN&quot; của Univi
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                    <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                                        <li><strong>Cản Gió &amp; Giữ ấm:</strong> Bề mặt vải khít giúp cản gió và giữ ấm hiệu quả.</li>
                                        <li><strong>Chống thấm – Trượt nước:</strong> Bảo vệ tối đa khi di chuyển hoặc tập luyện ngoài trời.</li>
                                        <li><strong>Chống nhăn – Chống bám bụi:</strong> Kết cấu vải mịn, giữ dáng áo mới và chuyên nghiệp.</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                    <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                                        <li><strong>Thoáng khí Siêu tốc (Uni Dry):</strong> Thoát ẩm nhanh, loại bỏ cảm giác ẩm ướt, nặng nề.</li>
                                        <li><strong>Bảo vệ da khỏi tia UV:</strong> Dòng vải UNIVI-BLENED có khả năng chống tia UV cao, cần thiết cho áo khoác ngoài trời.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Section II */}
                <article className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">
                        II. Phân tích Chuyên sâu về Chất liệu và Kỹ thuật May
                    </h2>
                    <p className="text-base mb-6 leading-relaxed">
                        Sự khác biệt của Áo Gió Univi nằm ở việc sử dụng các dòng vải kỹ thuật cao và quy trình may chuyên nghiệp, điều mà hàng phổ thông khó đáp ứng.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3">2.1. Phân tích Dòng vải UNIVI-DRY PRO và UNIVI-BLENED</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-5 border border-blue-100">
                                    <h4 className="font-bold text-base mb-2">UNIVI-DRY PRO (Polyester cao cấp)</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                                        <li><strong>Đặc tính cốt lõi:</strong> Nhanh khô, cản nắng, cản gió, cản bụi.</li>
                                        <li><strong>Ứng dụng:</strong> Lý tưởng cho lớp áo ngoài, hỗ trợ bay hơi mồ hôi, giữ cơ thể luôn khô ráo.</li>
                                        <li><strong>Cảm giác:</strong> Mềm mại, siêu nhẹ.</li>
                                    </ul>
                                </div>
                                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-100">
                                    <h4 className="font-bold text-base mb-2">UNIVI-BLENED (Polyester &amp; Polyamide/Cotton)</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                                        <li><strong>Đặc tính cốt lõi:</strong> Mềm mịn, mát, nhẹ, chống nhăn và bền màu.</li>
                                        <li><strong>Ứng dụng:</strong> Phù hợp áo gió đồng phục văn phòng, sự kiện, team building.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3">2.2. Kiểm định Chất lượng và Sợi vải (E.E.A.T)</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Cam kết An toàn Sức khỏe</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Vải được kiểm định độc lập, đạt chuẩn QCVN 01:2017/BCT về mức giới hạn Formaldehyde và các amin thơm từ thuốc nhuộm Azo.
                                    </p>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Chất lượng sợi ưu việt</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Nguồn sợi chọn lọc từ các nhà máy lớn trên thế giới, nơi cung cấp cho những thương hiệu thể thao hàng đầu.
                                    </p>
                                </div>
                                <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Vòng giá trị kép</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Sản phẩm do người Việt làm chủ, mang lại giá tốt cho doanh nghiệp và tạo thêm việc làm cho người lao động Việt.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3">2.3. Kỹ thuật May và Hoàn thiện Sản phẩm</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Máy móc Chuyên dụng</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Ứng dụng máy may 4 kim 6 chỉ, yêu cầu tay nghề cao để đảm bảo độ chắc chắn.
                                    </p>
                                </div>
                                <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Đường may Bền bỉ</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Đường kim mũi chỉ được chăm chút tỉ mỉ, đảm bảo độ hoàn thiện mượt mà.
                                    </p>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Thiết kế Ergonomic</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Form dáng ergonomic ôm vừa phải, tôn dáng và thoải mái tối đa khi vận động.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Section III */}
                <article className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">
                        III. Giải pháp Chiến lược và Lợi ích Kinh tế cho Doanh nghiệp
                    </h2>
                    <p className="text-base mb-6 leading-relaxed">
                        Đồng phục Áo Gió Univi là sự đầu tư chiến lược, mang lại lợi ích kép về thương hiệu và tài chính.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3">3.1. Nâng cao Hình ảnh và Tinh thần Gắn kết</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-amber-100">
                                    <h4 className="font-bold text-base mb-2">Biểu tượng Chu đáo</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Chiếc áo khoác đồng bộ thể hiện sự quan tâm, tạo nên tinh thần gắn kết nội bộ bền chặt.
                                    </p>
                                </div>
                                <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-4 border border-blue-100">
                                    <h4 className="font-bold text-base mb-2">Thiết kế Hiện đại, Đa dụng</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Form trẻ trung, dễ phối đồ, phù hợp cả nam và nữ cho nhiều hoạt động.
                                    </p>
                                </div>
                                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-rose-100">
                                    <h4 className="font-bold text-base mb-2">Quảng bá Thương hiệu</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Đồng phục mới là cách khởi động năm mới đầy năng lượng, tạo đà phát triển cho doanh nghiệp.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3">3.2. Lợi thế Kinh tế và Tốc độ Cung ứng</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-emerald-100">
                                    <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                                        <li><strong>Giá gốc tận xưởng:</strong> Mô hình sản xuất khép kín giúp tiết kiệm tới 40-50% chi phí.</li>
                                        <li><strong>Ưu đãi đặc biệt:</strong> Đặt sớm nhận giảm 15% cho đơn hàng áo gió doanh nghiệp.</li>
                                        <li><strong>Miễn phí vận chuyển:</strong> Hỗ trợ giao hàng toàn quốc.</li>
                                    </ul>
                                </div>
                                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100">
                                    <h4 className="font-bold text-base mb-2">Sản xuất Nhanh, Giao hàng Đúng tiến độ</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Univi đảm bảo &quot;3 NHANH&quot;: Thiết kế nhanh – May đo nhanh – Giao hàng siêu tốc, sẵn sàng xử lý đơn hàng gấp.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Section IV */}
                <article className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">
                        IV. Quy trình Đặt hàng Chuẩn và Dịch vụ Hỗ trợ Toàn diện
                    </h2>
                    <p className="text-base mb-6 leading-relaxed">
                        Univi áp dụng quy trình làm việc khoa học, chuyên nghiệp, đặt lợi ích của khách hàng lên hàng đầu.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3">4.1. Tư vấn và Thiết kế Chuyên nghiệp</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Miễn phí Thiết kế</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Hỗ trợ thiết kế theo yêu cầu, đúng nhận diện thương hiệu.
                                    </p>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Tư vấn mẫu đồng phục riêng</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Đề xuất mẫu phù hợp với mục tiêu sử dụng và phong cách doanh nghiệp.
                                    </p>
                                </div>
                                <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Công nghệ in/thêu logo</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        In/thêu sắc nét, bền màu, đảm bảo logo nổi bật và chuyên nghiệp.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3">4.2. Đảm bảo Kỹ thuật và Hậu mãi</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Kiểm tra Chất lượng (KCS)</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Mỗi sản phẩm đều được kiểm tra kỹ lưỡng từng chi tiết trước khi bàn giao.
                                    </p>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Chính sách Đổi trả linh hoạt</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Linh hoạt đổi trả giúp doanh nghiệp giảm áp lực tồn kho.
                                    </p>
                                </div>
                                <div className="bg-lime-50 border border-lime-100 rounded-xl p-4">
                                    <h4 className="font-bold text-base mb-2">Hỗ trợ Marketing</h4>
                                    <p className="text-sm md:text-base leading-relaxed">
                                        Đội ngũ Marketing Univi 10 năm kinh nghiệm sẵn sàng đồng hành trong chiến dịch truyền thông.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Section V & CTA */}
                <article className="bg-[#105d97] text-white rounded-2xl p-6 md:p-8 shadow-lg">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">
                        V. Kết luận và Kêu gọi Hành động
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed mb-6">
                        Đồng phục Áo Gió Univi là sự đầu tư chiến lược, mang lại giá trị thẩm mỹ, hiệu suất và sự gắn kết cho đội ngũ của bạn.
                        Đây là thời điểm vàng để Doanh nghiệp/Phòng Tập vừa tiết kiệm chi phí, vừa kịp chuẩn bị đồng phục chuyên nghiệp cho mùa sắp tới.
                        Hãy liên hệ với Đồng phục Univi để được tư vấn mẫu đồng phục dành riêng cho bạn nhé!
                    </p>
                    <div className="bg-white text-[#105d97] rounded-xl p-4 md:p-6 shadow-md space-y-3">
                        <div className="font-bold text-base md:text-lg uppercase">UNIVI – YOUR UNIFORM, YOUR BRAND!</div>
                        <div className="grid gap-3 md:grid-cols-3 text-sm md:text-base">
                            <div>
                                <div className="font-semibold">Hotline</div>
                                <p>0834.204.999</p>
                            </div>
                            <div>
                                <div className="font-semibold">Fanpage</div>
                                <a
                                    href="https://www.facebook.com/Dongphucunivi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0f4c81] underline font-medium"
                                >
                                    facebook.com/Dongphucunivi
                                </a>
                            </div>
                            <div>
                                <div className="font-semibold">Website</div>
                                <a
                                    href="https://dongphucunivi.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0f4c81] underline font-medium"
                                >
                                    dongphucunivi.com
                                </a>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

