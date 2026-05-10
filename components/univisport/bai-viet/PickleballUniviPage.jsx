import Link from 'next/link';
import Image from 'next/image';

export default function PickleballUniviPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="bg-[#105d97] text-white rounded-lg p-8 mb-12">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">
                            Đồng Phục Pickleball Chuyên Nghiệp
                            <span className="text-yellow-300"> Nâng Tầm Trải Nghiệm Thi Đấu</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white">
                            Khám phá bộ sưu tập đồng phục Pickleball cao cấp từ Đồng Phục Univi - Giải pháp toàn diện cho người chơi Pickleball và các câu lạc bộ chuyên nghiệp
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <article className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">
                        <span className="font-bold mr-2">1.</span>
                        Pickleball – Môn Thể Thao Lôi Cuốn Và Tầm Quan trọng Của Trang Phục Chuyên Dụng
                    </h2>

                    <div className="space-y-4">
                        <p>
                            Pickleball, môn thể thao đang được rất ưa chuộng tại Việt Nam, là sự kết hợp giữa tennis, cầu lông và bóng bàn, đang ngày càng khẳng định sức hút mạnh mẽ. Với lối chơi nhanh nhẹn, kỹ thuật đa dạng và phù hợp với nhiều lứa tuổi, Pickleball không chỉ mang lại niềm vui mà còn là một phương pháp rèn luyện sức khỏe hiệu quả.
                        </p>
                        <p>
                            Tuy nhiên, để mỗi trận đấu Pickleball thực sự là một trải nghiệm trọn vẹn, việc lựa chọn trang phục phù hợp đóng một vai trò vô cùng quan trọng. Tương tự như các môn thể thao khác, trang phục chuyên dụng cho Pickleball không đơn thuần là yếu tố thời trang, mà còn là &quot;công cụ&quot; hỗ trợ đắc lực cho người chơi. Một bộ đồng phục Pickleball chất lượng sẽ mang lại:
                        </p>
                    </div>

                    <div className="grid gap-4 mt-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-3">Sự thoải mái và linh hoạt tối đa</h3>
                            <p>Giúp bạn dễ dàng thực hiện các pha di chuyển nhanh, các cú vung vợt dứt khoát hay những pha cứu bóng bất ngờ.</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-3">Khả năng thấm hút mồ hôi và thoáng khí vượt trội</h3>
                            <p>Giữ cho cơ thể luôn khô ráo, thoáng mát ngay cả khi vận động cường độ cao, từ đó duy trì sự tập trung và năng lượng.</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-3">Tăng sự tự tin và tính chuyên nghiệp</h3>
                            <p>Một bộ trang phục đẹp, vừa vặn không chỉ giúp bạn tự tin hơn trên sân đấu mà còn thể hiện sự nghiêm túc và tinh thần thể thao chuyên nghiệp.</p>
                        </div>
                    </div>
                </article>

                <div className="my-8 text-center">
                    <figure className="inline-block rounded-lg overflow-hidden shadow-md">
                        <Image
                            src="/images/pickleball/dong-phuc-pickleball-univi-unipick-san-dau.jpg"
                            alt="Người chơi Pickleball năng động trong bộ đồng phục Univi UniPick trên sân đấu, thể hiện sự thoải mái và phong cách."
                            width={800}
                            height={400}
                            layout="responsive"
                            sizes="(max-width: 800px) 100vw, 800px"
                        />
                    </figure>
                </div>
                <article className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-3">
                        <span className="font-bold mr-2">2.</span>
                        Đồng Phục Univi – Lựa Chọn Tối Ưu Cho Trang Phục Pickleball Của Bạn
                    </h2>

                    <div className="space-y-4 mb-6">
                        <p>
                            Thấu hiểu những yêu cầu khắt khe của người chơi thể thao, <span className="font-semibold">Đồng Phục Univi</span> (thuộc Đồng Phục Univi) tự hào mang đến giải pháp đồng phục Pickleball chất lượng cao, đáp ứng mọi nhu cầu của bạn. Với hơn <span className="font-semibold">8 năm kinh nghiệm</span> trong lĩnh vực thiết kế và sản xuất đồng phục thể thao, đồng phục công ty cao cấp, Univi đã trở thành đối tác tin cậy của hàng trăm doanh nghiệp, tập đoàn lớn như Sun Group, Premier Village, Sun World, KickFit Sport và nhiều đội nhóm khác.
                        </p>
                        <p>Tại sao Univi là lựa chọn tối ưu cho đồng phục Pickleball của bạn?</p>
                    </div>

                    <div className="grid gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-3">Chuyên môn sâu rộng về đồng phục thể thao</h3>
                            <p>Đồng Phục Univi không ngừng nghiên cứu chuyên sâu về chất liệu để tìm ra những loại vải tốt nhất, phù hợp nhất với từng bộ môn, bao gồm cả Pickleball. Chúng tôi hiểu rõ những vận động đặc thù và yêu cầu về trang phục của môn thể thao này.</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-3">Cam kết chất lượng hàng đầu</h3>
                            <p>Chất lượng sản phẩm là ưu tiên số một của Univi. Chúng tôi cam kết không tính phí nếu sản phẩm không đạt chuẩn và tất cả chất liệu vải đều được kiểm định an toàn với da, đảm bảo sự an tâm tuyệt đối cho người mặc.</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-3">Uy tín đã được khẳng định</h3>
                            <p>Sự tin tưởng của các đối tác lớn và hàng ngàn khách hàng là minh chứng rõ ràng nhất cho chất lượng sản phẩm và dịch vụ của Univi.</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p>
                            Với Univi, mỗi bộ đồng phục Pickleball không chỉ là trang phục thi đấu mà còn là người bạn đồng hành đáng tin cậy, giúp bạn chinh phục mọi thử thách trên sân.
                        </p>
                    </div>
                </article>

                <article className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-lg border-t-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-3">
                        <span className="font-bold mr-2">3.</span>
                        Ra Mắt Bộ Sưu Tập UniPick: Khởi Đầu Mùa Hè Sôi Động Cùng Đội Nhóm!
                    </h2>

                    <p className="text-lg mb-8">
                        Hành trình khám phá mùa hè cùng đội nhóm của bạn chính thức bắt đầu với <span className="font-semibold">UniPick</span> – bộ sưu tập đồng phục Pickleball hoàn toàn mới từ Univi, nơi tinh thần thể thao năng động hòa quyện cùng phong cách thời trang tinh tế. Hãy để mỗi khoảnh khắc trên sân và trong mọi hoạt động hè của bạn trở nên đáng nhớ cùng UniPick!
                    </p>

                    <div className="grid gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Thiết kế đa dụng, linh hoạt</h3>
                            <p>Điểm nhấn của UniPick là sự kết hợp hoàn hảo giữa chiếc áo polo Basic thanh lịch, mạnh mẽ và chân váy thời trang đầy nữ tính, năng động. Bộ đôi này không chỉ giúp bạn tỏa sáng trên sân Pickleball mà còn dễ dàng thích ứng với nhiều bộ môn thể thao khác hay những buổi dạo phố, gặp gỡ bạn bè. Từng đường nét thiết kế đều hướng đến sự linh hoạt tối đa trong từng chuyển động.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Chất liệu cao cấp vượt trội</h3>
                            <p>UniPick sử dụng sự kết hợp vàng của Polyamide và Elastane (Spandex). Đây là những sợi vải siêu nhẹ, mang lại cảm giác mềm mịn tuyệt đối khi tiếp xúc với làn da. Đặc biệt, chất liệu này còn có khả năng chống tia UV hiệu quả, bảo vệ làn da của bạn dưới nắng hè.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Công nghệ vải Uni Super Cool độc quyền</h3>
                            <p>Trải nghiệm sự mát lạnh tức thì với công nghệ Uni Super Cool tiên tiến, được Univi nghiên cứu và phát triển, giúp giảm nhiệt độ bề mặt vải xuống đến 1℃ ngay khi mặc. Với UniPick, cảm giác nóng bức sẽ không còn là rào cản, giúp bạn luôn thoải mái và tập trung vào trận đấu.</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-lg">
                            Cùng đồng đội &quot;lên đồ&quot; UniPick! Hãy cùng nhau mở lối đi riêng, thể hiện cá tính và cháy hết mình trong từng pha bóng, từng khoảnh khắc và từng nụ cười rạng rỡ của mùa hè này!
                        </p>
                    </div>
                </article>

                <div className="my-12 text-center">
                    <figure className="inline-block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105 relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#105d97]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                        <Image
                            src="/images/pickleball/flatlay-dong-phuc-pickleball-unipick-univi-phu-kien.jpg"
                            alt="Flatlay bộ đồng phục Pickleball UniPick của Univi gồm áo polo, chân váy và phụ kiện thể thao."
                            width={800}
                            height={400}
                            layout="responsive"
                            sizes="(max-width: 800px) 100vw, 800px"
                            className="transition-transform"
                        />
                    </figure>
                </div>

                <article className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-lg border-t-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-3">
                        <span className="font-bold mr-2">4.</span>
                        Đặc Điểm Nổi Bật Của Đồng Phục Pickleball Univi
                    </h2>

                    <p className="text-lg mb-4">
                        Để mỗi trận đấu Pickleball của bạn trở nên thăng hoa, Đồng Phục Univi đã tỉ mỉ trong từng khâu, từ lựa chọn chất liệu đến thiết kế và hoàn thiện sản phẩm. Trang phục Pickleball Univi không chỉ đẹp mắt mà còn tối ưu hóa hiệu suất và mang lại sự thoải mái vượt trội.
                    </p>

                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">4.1 Chất liệu vải cao cấp, chuyên dụng cho thể thao – Nền tảng của sự thoải mái</h3>
                        <p className="mb-6">
                            Chúng tôi hiểu rằng chất liệu là yếu tố cốt lõi quyết định đến cảm giác của người mặc, đặc biệt là trong vận động cường độ cao như Pickleball. Đồng Phục Univi tự hào mang đến các lựa chọn vải ưu việt:
                        </p>
                        <div className="grid gap-4">
                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                                <h4 className="font-bold text-lg mb-2">Polyester cao cấp (PET), Piquecool, Lacoste USA</h4>
                                <p>Đây là những dòng vải phổ biến trong ngành may mặc thể thao nhờ độ bền cao, khả năng giữ form tốt và màu sắc đa dạng.</p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                                <h4 className="font-bold text-lg mb-2">UNIVI-DRY PRO</h4>
                                <p>Với đặc tính CẢN NẮNG – CẢN GIÓ – CẢN BỤI – NHANH KHÔ, dòng vải này cực kỳ phù hợp cho các hoạt động ngoài trời như Pickleball, giúp bạn luôn cảm thấy khô thoáng và được bảo vệ.</p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                                <h4 className="font-bold text-lg mb-2">UNIVI – SUPER COOL</h4>
                                <p>Đúng như tên gọi, dòng vải này nổi bật với đặc tính MỀM – MƯỢT – MÁT – MỊN nhờ thành phần chính là sợi Polyamide. Đây sẽ là lựa chọn lý tưởng cho những ai ưu tiên sự mềm mại và cảm giác mát lạnh trên da khi thi đấu.</p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                                <h4 className="font-bold text-lg mb-2">UNIVI - BLENED</h4>
                                <p>Sự kết hợp thông minh giữa các loại sợi như Polyester và Polyamide, hoặc Cotton và Polyester, tạo ra những chất liệu mang tính năng vượt trội như nhanh khô, mềm mịn, mát, nhẹ, chống tia UV cao hơn, chống nhăn và bền màu. Đặc biệt, tất cả chất liệu vải Univi sử dụng đều được kiểm định an toàn với da, không chứa các chất độc hại như Formaldehyde hay Amin thơm từ thuốc nhuộm Azo, bảo vệ sức khỏe người mặc một cách tối đa.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">4.2 Thiết kế thông minh, tối ưu cho vận động</h3>
                        <p className="mb-6">
                            Không chỉ dừng lại ở chất liệu, Univi còn chú trọng đến từng chi tiết trong thiết kế để đảm bảo sự linh hoạt tối đa:
                        </p>
                        <div className="grid gap-3">
                            <div className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <span className="font-semibold">Form dáng hiện đại, năng động:</span>
                                <span className="ml-2">Phù hợp với xu hướng thể thao, tôn dáng người mặc mà vẫn đảm bảo sự thoải mái khi thực hiện các động tác đặc thù của Pickleball như giao bóng, đánh lưới hay di chuyển nhanh trên sân.</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <span className="font-semibold">Đường may tinh tế, chắc chắn:</span>
                                <span className="ml-2">Univi lựa chọn cách may kỹ lưỡng cả hai mặt, không chỉ đẹp mà còn bền bỉ, giảm thiểu tối đa sự cọ xát gây khó chịu cho da, giúp bạn tận hưởng cảm giác thoải mái từ những chi tiết nhỏ nhất.</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">4.3 Công nghệ in ấn hiện đại, bền màu</h3>
                        <p className="mb-6">
                            Thể hiện cá tính và tinh thần đội nhóm qua những thiết kế sắc nét:
                        </p>
                        <div className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <p>Univi ứng dụng các công nghệ in tiên tiến, đảm bảo logo, tên, số hay các họa tiết trên đồng phục luôn rõ ràng, màu sắc tươi sáng và có độ bền cao, không bong tróc hay phai màu sau nhiều lần giặt.</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">4.4 Tùy chọn thiết kế theo yêu cầu – Dấu ấn riêng của bạn</h3>
                        <p className="mb-6">
                            Univi hiểu rằng mỗi cá nhân, mỗi đội nhóm đều muốn có một dấu ấn riêng. Chúng tôi cung cấp dịch vụ thiết kế và tùy chỉnh đồng phục Pickleball theo yêu cầu:
                        </p>
                        <div className="grid gap-3">
                            <div className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <p>Lựa chọn màu sắc, kiểu dáng theo sở thích hoặc màu sắc nhận diện của câu lạc bộ, đội nhóm.</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <p>In ấn logo riêng, tên vận động viên, số áo, slogan, và các chi tiết khác để tạo nên bộ đồng phục độc đáo, không đụng hàng.</p>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="my-12 text-center">
                    <figure className="inline-block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105 relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#105d97]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                        <Image
                            src="/images/pickleball/chan-vay-pickleball-thoi-trang-unipick-univi-nu.jpg"
                            alt="Chân váy Pickleball thời trang nữ thuộc bộ sưu tập UniPick Univi, linh hoạt và phong cách."
                            width={800}
                            height={400}
                            layout="responsive"
                            sizes="(max-width: 800px) 100vw, 800px"
                            className="transition-transform"
                        />
                    </figure>
                </div>

                <article className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-lg border-t-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-3">
                        <span className="font-bold mr-2">5.</span>
                        Lợi Ích Khi Sử Dụng Đồng Phục Pickleball Univi
                    </h2>

                    <p className="text-lg mb-4">
                        Đầu tư vào đồng phục Pickleball Univi không chỉ là sở hữu một bộ trang phục đẹp mắt mà còn mang lại hàng loạt lợi ích thiết thực, giúp bạn nâng tầm trải nghiệm và hiệu suất thi đấu.
                    </p>

                    <div className="grid gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Nâng cao hiệu suất thi đấu</h3>
                            <p>Khi cơ thể cảm thấy thoải mái, khô thoáng và không bị gò bó bởi trang phục, bạn có thể hoàn toàn tập trung vào trận đấu, thực hiện các động tác một cách chính xác và linh hoạt hơn. Chất liệu chuyên dụng còn hỗ trợ điều hòa thân nhiệt, giúp duy trì năng lượng bền bỉ.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Thể hiện tinh thần đồng đội và sự chuyên nghiệp</h3>
                            <p>Một bộ đồng phục được thiết kế đồng bộ, mang màu sắc và logo riêng không chỉ tạo nên hình ảnh chuyên nghiệp cho cá nhân mà còn là sợi dây gắn kết tinh thần đồng đội, giúp các thành viên tự tin hơn khi sát cánh cùng nhau trên sân đấu.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Tăng sự tự tin, khẳng định phong cách</h3>
                            <p>Trang phục đẹp, vừa vặn và phù hợp với môn thể thao mình yêu thích chắc chắn sẽ tiếp thêm sự tự tin cho bạn. Đồng phục Pickleball Univi với thiết kế hiện đại, năng động giúp bạn tự tin thể hiện cá tính và đam mê.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Bền bỉ với thời gian, tối ưu chi phí</h3>
                            <p>Với chất liệu vải cao cấp và kỹ thuật may đo tỉ mỉ, đồng phục Univi có độ bền vượt trội, giữ form dáng và màu sắc tốt sau nhiều lần sử dụng và giặt giũ. Đây là một khoản đầu tư thông minh, giúp bạn tiết kiệm chi phí thay mới đồng phục thường xuyên.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">An toàn tuyệt đối cho sức khỏe làn da</h3>
                            <p>Cam kết sử dụng vải đã qua kiểm định, không chứa hóa chất độc hại đảm bảo an toàn cho làn da của bạn, ngay cả khi vận động ra nhiều mồ hôi.</p>
                        </div>
                    </div>
                </article>

                <article className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-lg border-t-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-3">
                        <span className="font-bold mr-2">6.</span>
                        Các Dòng Sản Phẩm Đồng Phục Pickleball Đa Dạng Tại Univi
                    </h2>

                    <p className="text-lg mb-4">
                        Đồng Phục Univi mang đến nhiều lựa chọn đồng phục Pickleball để bạn dễ dàng tìm thấy sản phẩm phù hợp với sở thích và nhu cầu của đội nhóm.
                    </p>

                    <div className="grid gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Áo Pickleball</h3>
                            <p>Với các kiểu dáng đa dạng như áo thun cổ tròn năng động, áo polo có cổ lịch sự, hoặc tank top thoáng mát cho những ngày hè oi ả. Thiết kế dành riêng cho nam và nữ với form dáng tối ưu.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Quần và Váy Pickleball</h3>
                            <p>Quần short Pickleball cho nam với độ dài vừa phải, chất liệu co giãn tốt. Chân váy thể thao cho nữ thường được tích hợp quần bảo hộ bên trong, vừa kín đáo vừa tiện lợi khi di chuyển.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Bộ sưu tập theo đội nhóm/câu lạc bộ</h3>
                            <p>Univi nhận thiết kế và sản xuất đồng phục Pickleball theo bộ sưu tập riêng, thống nhất về màu sắc, họa tiết và logo, tạo nên dấu ấn đặc trưng cho đội của bạn.</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-lg">
                            Hãy liên hệ với chúng tôi để khám phá đầy đủ các mẫu mã và lựa chọn được bộ đồng phục Pickleball ưng ý nhất!
                        </p>
                    </div>
                </article>

                <article className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-lg border-t-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-3">
                        <span className="font-bold mr-2">7.</span>
                        Quy Trình Đặt May Đồng Phục Pickleball Tại Univi Dễ Dàng Và Chuyên Nghiệp
                    </h2>

                    <p className="text-lg mb-4">
                        Univi tự hào mang đến quy trình đặt may đồng phục Pickleball đơn giản, nhanh chóng và chuyên nghiệp, đảm bảo trải nghiệm tốt nhất cho khách hàng.
                    </p>

                    <div className="grid gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Tiếp nhận yêu cầu và Tư vấn chuyên sâu</h3>
                            <p>Đội ngũ tư vấn viên của Univi sẽ lắng nghe kỹ lưỡng nhu cầu của bạn về số lượng, kiểu dáng, chất liệu, ý tưởng thiết kế và ngân sách dự kiến. Chúng tôi sẽ tư vấn các giải pháp tối ưu nhất.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Thiết kế mẫu miễn phí</h3>
                            <p>Dựa trên yêu cầu của bạn, đội ngũ thiết kế của Univi sẽ lên mẫu demo sản phẩm. Bạn có thể yêu cầu chỉnh sửa cho đến khi hoàn toàn hài lòng với thiết kế.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Duyệt mẫu, Báo giá và Ký hợp đồng</h3>
                            <p>Sau khi thống nhất thiết kế, Univi sẽ gửi báo giá chi tiết và tiến hành ký hợp đồng để đảm bảo quyền lợi cho cả hai bên.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Sản xuất theo tiêu chuẩn</h3>
                            <p>Đồng phục của bạn sẽ được đưa vào sản xuất tại xưởng may hiện đại của Univi, với đội ngũ công nhân lành nghề và quy trình kiểm soát chất lượng nghiêm ngặt.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Kiểm tra chất lượng sản phẩm (KCS)</h3>
                            <p>Trước khi giao hàng, mỗi sản phẩm đều được kiểm tra kỹ lưỡng từng đường kim mũi chỉ, chất lượng in ấn và độ chính xác của thiết kế.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Giao hàng tận nơi và Thanh toán</h3>
                            <p>Univi hỗ trợ giao hàng trên toàn quốc. Bạn kiểm tra sản phẩm và tiến hành thanh toán theo các điều khoản đã thỏa thuận.</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-lg">
                            Chúng tôi cũng cam kết chế độ bảo hành và hậu mãi tốt nhất cho các sản phẩm đồng phục, đảm bảo sự yên tâm tuyệt đối cho quý khách hàng.
                        </p>
                    </div>

                    <div className="my-8 text-center">
                        <figure className="inline-block rounded-lg overflow-hidden shadow-md">
                            <Image
                                src="/images/pickleball/quy-trinh-dat-may-dong-phuc-pickleball-tai-univi-5-buoc.jpg"
                                alt="Sơ đồ 5 bước quy trình đặt may đồng phục Pickleball chuyên nghiệp tại Univi."
                                width={800}
                                height={400}
                                layout="responsive"
                                sizes="(max-width: 800px) 100vw, 800px"
                            />
                        </figure>
                    </div>
                </article>

                <article className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-lg border-t-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-xl md:text-xl font-bold mb-3">
                        <span className="font-bold mr-2">8.</span>
                        Tại Sao Khách Hàng Tin Tưởng Lựa Chọn Đồng Phục Thể Thao Univi?
                    </h2>

                    <p className="text-lg mb-4">
                        Sự tin tưởng của quý khách hàng là động lực lớn nhất để Univi không ngừng nỗ lực và phát triển. Chúng tôi tự hào là lựa chọn hàng đầu cho nhu cầu đồng phục thể thao, đặc biệt là đồng phục Pickleball.
                    </p>

                    <div className="grid gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Chất lượng sản phẩm vượt trội</h3>
                            <p>Đây là cam kết hàng đầu và là yếu tố cốt lõi tạo nên uy tín của Univi. Từ chất liệu vải được tuyển chọn kỹ lưỡng, an toàn cho da, đến kỹ thuật may đo tỉ mỉ và công nghệ in ấn hiện đại.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Giá cả hợp lý và cạnh tranh</h3>
                            <p>Univi mang đến những sản phẩm chất lượng cao với mức giá tốt nhất thị trường, chỉ từ 99.000đ cho các sản phẩm trung cao cấp, tạo ra giá trị thực sự cho khách hàng.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Dịch vụ khách hàng tận tâm, chuyên nghiệp</h3>
                            <p>Đội ngũ Univi luôn sẵn sàng tư vấn, hỗ trợ và giải đáp mọi thắc mắc của khách hàng một cách nhanh chóng và chu đáo.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Kinh nghiệm và Uy tín đã được khẳng định</h3>
                            <p>Với hơn 8 năm hoạt động và là đối tác của nhiều thương hiệu lớn, Univi đã chứng minh được năng lực và vị thế của mình trên thị trường đồng phục.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3  hover:shadow-md transition-all">
                            <h3 className="font-bold text-lg mb-2">Giải pháp toàn diện &quot;2S Uniform&quot;</h3>
                            <p>Không chỉ cung cấp sản phẩm, Univi mang đến giải pháp đồng phục thông minh và tối ưu (SMART SPORT UNIFORM), giúp các câu lạc bộ, đội nhóm xây dựng hình ảnh chuyên nghiệp và thương hiệu mạnh mẽ.</p>
                        </div>
                    </div>
                </article>

                {/* Contact Section */}
                <div className="bg-[#105d97] text-white rounded-lg p-8 mt-8">
                    <div>
                        <div className="text-center mb-8">
                            <h3 className="text-xl md:text-xl font-bold mb-4">
                                Nhận Tư Vấn & Báo Giá Đồng Phục Pickleball Univi Ngay Hôm Nay!
                            </h3>
                            <p className="text-base text-white max-w-4xl mx-auto mb-4">
                                Đã đến lúc nâng cấp trải nghiệm thi đấu Pickleball của bạn và đội nhóm với những bộ đồng phục đẳng cấp từ <span className="font-bold">Đồng Phục Univi</span>! Đừng để trang phục kém chất lượng cản trở hành trình chinh phục mọi thử thách trên sân Pickleball.
                            </p>
                            <p className="text-sm text-white mb-6">
                                Liên hệ ngay với Univi để được tư vấn miễn phí, nhận thiết kế độc quyền và báo giá ưu đãi nhất:
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="font-semibold mb-1">Hotline</div>
                                <div>083 420 4999</div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="font-semibold mb-1">Email</div>
                                <div>dongphucunivi@gmail.com</div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="font-semibold mb-1">Địa chỉ</div>
                                <div>D4, 180 Thanh Bình, Hà Đông</div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-sm">
                                Đồng Phục Univi – Your Uniform, Your Brand!
                            </div>
                            <p className="text-white mt-3 font-medium">
                                Tự tin bứt phá mọi giới hạn cùng đồng phục Pickleball chuyên nghiệp!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}