import { Service } from '@/lib/types';

/**
 * Hardcoded Services Data
 * Tesla Media Clone Website
 * 
 * Dịch vụ Facebook Marketing
 */

export const services: Service[] = [
  // ============================================================================
  // DỊCH VỤ FACEBOOK - MỚI
  // ============================================================================
  {
    id: 'tich-xanh-fanpage-ca-nhan',
    slug: 'tich-xanh-fanpage-ca-nhan',
    title: 'Tích xanh Fanpage & Trang Cá Nhân',
    shortDescription: 'Tích xanh Fanpage và trang cá nhân giúp nâng cao độ uy tín, xây dựng thương hiệu và tạo lợi thế cạnh tranh trên Facebook.',
    icon: 'FaCheckCircle',
    fullDescription: `
      <p>Tích xanh Fanpage và trang cá nhân là giải pháp giúp nâng cao độ uy tín, xây dựng thương hiệu và tạo lợi thế cạnh tranh trên Facebook. Việc sở hữu tích xanh giúp tăng độ tin cậy, dễ dàng tiếp cận khách hàng và hỗ trợ hiệu quả cho hoạt động quảng cáo, bán hàng.</p>
      
      <p>Dịch vụ phù hợp với doanh nghiệp, shop kinh doanh, KOL, người xây dựng thương hiệu cá nhân hoặc bất kỳ ai muốn nâng cao hình ảnh chuyên nghiệp trên nền tảng Facebook.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Tư vấn & Đánh giá',
        description: 'Đánh giá điều kiện và tư vấn phương án phù hợp'
      },
      {
        step: 2,
        title: 'Chuẩn bị hồ sơ',
        description: 'Thu thập và chuẩn bị đầy đủ tài liệu cần thiết'
      },
      {
        step: 3,
        title: 'Triển khai',
        description: 'Thực hiện quy trình xác minh tích xanh'
      },
      {
        step: 4,
        title: 'Hoàn tất',
        description: 'Bàn giao và hướng dẫn duy trì tích xanh'
      }
    ],
    benefits: [
      'Tăng độ uy tín cho Fanpage và tài khoản cá nhân',
      'Nâng cao hình ảnh thương hiệu',
      'Hỗ trợ bán hàng và quảng cáo hiệu quả',
      'Tạo cảm giác chuyên nghiệp với khách hàng'
    ],
    relatedProjects: [],
    relatedPosts: ['tich-xanh-facebook-la-gi', 'cham-soc-fanpage-hieu-qua'],
    metaTitle: 'Dịch Vụ Tích Xanh Fanpage & Trang Cá Nhân | Tesla Media',
    metaDescription: 'Tích xanh Fanpage và trang cá nhân giúp nâng cao độ uy tín, xây dựng thương hiệu trên Facebook.',
    ogImage: '/images/services/tich-xanh-og.jpg'
  },
  {
    id: 'chay-quang-cao-messenger-livestream',
    slug: 'chay-quang-cao-messenger-livestream',
    title: 'Chạy Quảng Cáo Messenger & Livestream',
    shortDescription: 'Quảng cáo Messenger và Livestream giúp tiếp cận khách hàng trực tiếp, tăng inbox chất lượng và đẩy mạnh doanh số trong từng phiên live.',
    icon: 'FaFacebookMessenger',
    fullDescription: `
      <p>Quảng cáo Messenger giúp doanh nghiệp tiếp cận khách hàng trực tiếp qua hộp thư tin nhắn, tăng khả năng tư vấn, chăm sóc và chốt đơn nhanh hơn. Đây là giải pháp phù hợp cho những ngành hàng cần trao đổi nhiều trước khi mua như shop online, spa, mỹ phẩm, khóa học, dịch vụ địa phương.</p>
      
      <p>Quảng cáo Livestream giúp tăng lượt tiếp cận, lượt xem và mức độ tương tác cho buổi phát trực tiếp. Khi triển khai đúng cách, đây là cách hiệu quả để đẩy doanh số trong thời gian ngắn, đặc biệt với các chiến dịch bán hàng, xả kho, ra mắt sản phẩm hoặc chốt đơn trực tiếp trên live.</p>
      
      <p>Chúng tôi hỗ trợ xây dựng chiến dịch theo mục tiêu cụ thể, tối ưu nội dung, tệp khách hàng và ngân sách để mang lại hiệu quả cao nhất cho cả hai hình thức.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Phân tích mục tiêu',
        description: 'Xác định mục tiêu chiến dịch và đối tượng khách hàng'
      },
      {
        step: 2,
        title: 'Xây dựng chiến dịch',
        description: 'Thiết lập chiến dịch Messenger hoặc Livestream, tạo nội dung và targeting'
      },
      {
        step: 3,
        title: 'Triển khai & Tối ưu',
        description: 'Chạy quảng cáo, theo dõi và điều chỉnh theo dữ liệu thực tế'
      },
      {
        step: 4,
        title: 'Báo cáo kết quả',
        description: 'Đánh giá hiệu quả và đề xuất cải tiến'
      }
    ],
    benefits: [
      'Tăng lượng inbox chất lượng từ Messenger',
      'Tăng mắt xem và tạo hiệu ứng đông người cho live',
      'Hỗ trợ tư vấn và chốt đơn trực tiếp',
      'Phù hợp với nhiều mô hình kinh doanh'
    ],
    relatedProjects: [],
    relatedPosts: ['quang-cao-messenger-hieu-qua', 'quang-cao-livestream-facebook'],
    metaTitle: 'Dịch Vụ Chạy Quảng Cáo Messenger & Livestream | Tesla Media',
    metaDescription: 'Quảng cáo Messenger và Livestream giúp tăng inbox, tăng mắt xem và chốt đơn hiệu quả trên Facebook.',
    ogImage: '/images/services/messenger-livestream-ads-og.jpg'
  },
  {
    id: 'cham-soc-page',
    slug: 'cham-soc-page',
    title: 'Chăm sóc Page',
    shortDescription: 'Chăm sóc Page giúp Fanpage duy trì hoạt động đều đặn, chuyên nghiệp và có hình ảnh chỉn chu trong mắt khách hàng.',
    icon: 'FaHeart',
    fullDescription: `
      <p>Chăm sóc Page là giải pháp giúp Fanpage duy trì hoạt động đều đặn, chuyên nghiệp và có hình ảnh chỉn chu trong mắt khách hàng. Một page được chăm sóc tốt sẽ hỗ trợ tăng tương tác, giữ độ tin cậy và cải thiện hiệu quả bán hàng lâu dài.</p>
      
      <p>Dịch vụ bao gồm xây dựng lịch đăng bài, tối ưu nội dung, hình ảnh, mô tả page và hỗ trợ giữ page luôn hoạt động ổn định. Đây là lựa chọn phù hợp cho doanh nghiệp, shop online và các thương hiệu muốn phát triển fanpage bền vững.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Audit Fanpage',
        description: 'Đánh giá hiện trạng và xác định hướng phát triển'
      },
      {
        step: 2,
        title: 'Lập kế hoạch nội dung',
        description: 'Xây dựng content calendar và tone of voice'
      },
      {
        step: 3,
        title: 'Sản xuất & Đăng bài',
        description: 'Tạo nội dung và đăng bài theo lịch'
      },
      {
        step: 4,
        title: 'Tương tác & Báo cáo',
        description: 'Trả lời comment, inbox và báo cáo định kỳ'
      }
    ],
    benefits: [
      'Duy trì hình ảnh chuyên nghiệp',
      'Tăng tương tác tự nhiên',
      'Hỗ trợ nội dung bán hàng đều đặn',
      'Giúp fanpage hoạt động ổn định'
    ],
    relatedProjects: [],
    relatedPosts: ['cham-soc-fanpage-hieu-qua', 'tich-xanh-facebook-la-gi'],
    metaTitle: 'Dịch Vụ Chăm Sóc Fanpage | Tesla Media',
    metaDescription: 'Chăm sóc Fanpage chuyên nghiệp, duy trì hoạt động đều đặn và tăng tương tác hiệu quả.',
    ogImage: '/images/services/page-management-og.jpg'
  },
  {
    id: 'tang-follow-mat-live',
    slug: 'tang-follow-mat-live',
    title: 'Tăng Follow & Tăng Mắt Live',
    shortDescription: 'Tăng follow và tăng mắt live giúp mở rộng độ phủ, nâng cao uy tín tài khoản và tạo hiệu ứng sôi động cho từng phiên livestream.',
    icon: 'FaUserPlus',
    fullDescription: `
      <p>Tăng follow giúp tài khoản cá nhân hoặc fanpage mở rộng độ phủ, tăng độ tin cậy và tạo ấn tượng tốt hơn với người xem mới. Số lượng follow cao góp phần tăng khả năng thu hút khách hàng và cải thiện hiệu ứng thương hiệu trên Facebook. Dịch vụ phù hợp với người xây dựng thương hiệu cá nhân, shop online, KOL và livestream seller.</p>
      
      <p>Tăng mắt live giúp phiên livestream trở nên sôi động hơn, thu hút thêm người xem mới và tăng thời gian giữ chân khán giả. Một buổi live có lượng mắt xem tốt dễ tạo hiệu ứng đám đông và thúc đẩy khách hàng ở lại lâu hơn, hỗ trợ đáng kể cho doanh số chốt đơn.</p>
      
      <p>Chúng tôi tư vấn phương án phù hợp theo từng mục tiêu, đảm bảo chất lượng và hiệu quả cho cả hai hình thức.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Tư vấn phương án',
        description: 'Xác định mục tiêu và phương án tăng follow / tăng mắt live phù hợp'
      },
      {
        step: 2,
        title: 'Chuẩn bị & Thiết lập',
        description: 'Chuẩn bị hệ thống và lên kế hoạch triển khai'
      },
      {
        step: 3,
        title: 'Triển khai',
        description: 'Thực hiện tăng follow và tăng mắt live theo kế hoạch'
      },
      {
        step: 4,
        title: 'Bàn giao & Đánh giá',
        description: 'Hoàn tất, phân tích hiệu quả và hướng dẫn duy trì'
      }
    ],
    benefits: [
      'Tăng độ uy tín cho tài khoản và fanpage',
      'Tạo hiệu ứng livestream đông người, sôi động',
      'Giữ chân người xem và hỗ trợ chốt đơn',
      'Phù hợp cho page, profile cá nhân và bán hàng trực tiếp'
    ],
    relatedProjects: [],
    metaTitle: 'Dịch Vụ Tăng Follow & Tăng Mắt Live Facebook | Tesla Media',
    metaDescription: 'Tăng follow và tăng mắt live Facebook giúp mở rộng độ phủ, tạo hiệu ứng đông người và hỗ trợ chốt đơn hiệu quả.',
    ogImage: '/images/services/tang-follow-mat-live-og.jpg'
  },
  {
    id: 'ngan-sach-chiet-khau',
    slug: 'ngan-sach-chiet-khau',
    title: 'Ngân Sách Chiết Khấu',
    shortDescription: 'Giải pháp ngân sách chiết khấu tối ưu cho doanh nghiệp và agency cần quản lý chi phí quảng cáo hiệu quả.',
    icon: 'FaDollarSign',
    fullDescription: `
      <p>Ngân sách chiết khấu là giải pháp tối ưu cho doanh nghiệp và agency cần quản lý chi phí quảng cáo hiệu quả.</p>
      
      <p>Bao gồm: Voi - scan - tài khoản trả trước - tín - ngưỡng</p>
      
      <p>Dịch vụ giúp khách hàng chủ động ngân sách, tối ưu chi phí và vận hành quảng cáo linh hoạt hơn.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Tư vấn nhu cầu',
        description: 'Xác định nhu cầu ngân sách và hình thức phù hợp'
      },
      {
        step: 2,
        title: 'Thiết lập tài khoản',
        description: 'Cấu hình tài khoản và phương thức thanh toán'
      },
      {
        step: 3,
        title: 'Nạp ngân sách',
        description: 'Nạp tiền và kích hoạt chiết khấu'
      },
      {
        step: 4,
        title: 'Hỗ trợ vận hành',
        description: 'Hướng dẫn sử dụng và hỗ trợ kỹ thuật'
      }
    ],
    benefits: [
      'Tối ưu chi phí quảng cáo',
      'Dễ quản lý ngân sách',
      'Phù hợp với doanh nghiệp và agency',
      'Hỗ trợ thanh toán linh hoạt'
    ],
    relatedProjects: [],
    metaTitle: 'Giải Pháp Ngân Sách Chiết Khấu | Tesla Media',
    metaDescription: 'Ngân sách chiết khấu giúp tối ưu chi phí quảng cáo, quản lý linh hoạt cho doanh nghiệp và agency.',
    ogImage: '/images/services/ngan-sach-og.jpg'
  },
  {
    id: 'khoa-hoc-chay-ads',
    slug: 'khoa-hoc-chay-ads',
    title: 'Khóa Học Chạy Ads Cho Người Mới Bắt Đầu',
    shortDescription: 'Khóa học chạy ads cho người mới bắt đầu, dễ hiểu và có thể áp dụng ngay vào thực tế.',
    icon: 'FaGraduationCap',
    fullDescription: `
      <p>Khóa học chạy ads cho người mới bắt đầu được xây dựng dành cho những ai chưa có kinh nghiệm nhưng muốn hiểu và tự triển khai quảng cáo Facebook một cách bài bản. Nội dung học tập trung vào kiến thức nền tảng, tư duy quảng cáo và các bước thực hành dễ áp dụng.</p>
      
      <p>Học viên sẽ được hướng dẫn cách tạo chiến dịch, chọn mục tiêu, xác định tệp khách hàng, theo dõi chỉ số và tối ưu quảng cáo cơ bản. Đây là lựa chọn phù hợp cho chủ shop, nhân sự marketing mới hoặc người muốn tự chạy ads để tiết kiệm chi phí.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Đăng ký khóa học',
        description: 'Đăng ký và nhận tài liệu học tập'
      },
      {
        step: 2,
        title: 'Học lý thuyết',
        description: 'Nắm vững kiến thức nền tảng về Facebook Ads'
      },
      {
        step: 3,
        title: 'Thực hành',
        description: 'Tạo chiến dịch thực tế và được hướng dẫn'
      },
      {
        step: 4,
        title: 'Hỗ trợ sau khóa',
        description: 'Nhận hỗ trợ và tư vấn sau khi hoàn thành'
      }
    ],
    benefits: [
      'Dễ hiểu, phù hợp người mới',
      'Học được tư duy chạy ads cơ bản',
      'Có thể áp dụng ngay vào thực tế',
      'Tiết kiệm chi phí thuê bên ngoài'
    ],
    relatedProjects: [],
    metaTitle: 'Khóa Học Chạy Quảng Cáo Facebook Cho Người Mới | Tesla Media',
    metaDescription: 'Khóa học chạy ads Facebook cho người mới, dễ hiểu, thực hành ngay và tiết kiệm chi phí.',
    ogImage: '/images/services/khoa-hoc-ads-og.jpg'
  },
  {
    id: 'ho-tro-ban-hang-chot-don',
    slug: 'ho-tro-ban-hang-chot-don',
    title: 'Hỗ Trợ Bán Hàng, Chốt Đơn',
    shortDescription: 'Hỗ trợ bán hàng và chốt đơn giúp tăng tỷ lệ chuyển đổi từ inbox, livestream hoặc quảng cáo Facebook.',
    icon: 'FaHandshake',
    fullDescription: `
      <p>Hỗ trợ bán hàng và chốt đơn là giải pháp dành cho doanh nghiệp, shop online và cá nhân kinh doanh muốn tăng tỷ lệ chuyển đổi từ inbox, livestream hoặc quảng cáo Facebook. Không chỉ có khách hàng, điều quan trọng hơn là biết cách tư vấn đúng và chốt đơn hiệu quả.</p>
      
      <p>Chúng tôi hỗ trợ xây dựng quy trình bán hàng, kịch bản tư vấn, xử lý phản hồi của khách và tối ưu cách chốt sale theo từng ngành hàng. Dịch vụ này giúp bạn tận dụng tốt hơn lượng traffic và chuyển đổi thành doanh thu thực tế.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Phân tích quy trình',
        description: 'Đánh giá quy trình bán hàng hiện tại'
      },
      {
        step: 2,
        title: 'Xây dựng kịch bản',
        description: 'Tạo kịch bản tư vấn và chốt đơn'
      },
      {
        step: 3,
        title: 'Đào tạo team',
        description: 'Hướng dẫn team sale áp dụng kịch bản'
      },
      {
        step: 4,
        title: 'Tối ưu liên tục',
        description: 'Theo dõi và cải thiện tỷ lệ chốt đơn'
      }
    ],
    benefits: [
      'Tăng tỷ lệ chốt đơn',
      'Tối ưu quy trình tư vấn khách',
      'Giảm bỏ lỡ lead tiềm năng',
      'Phù hợp với livestream và inbox'
    ],
    relatedProjects: [],
    metaTitle: 'Dịch Vụ Hỗ Trợ Bán Hàng Và Chốt Đơn | Tesla Media',
    metaDescription: 'Hỗ trợ bán hàng và chốt đơn hiệu quả, tăng tỷ lệ chuyển đổi từ Facebook marketing.',
    ogImage: '/images/services/ban-hang-og.jpg'
  },
  {
    id: 'thiet-ke-landing-page-seo',
    slug: 'thiet-ke-landing-page-seo',
    title: 'Hỗ Trợ Thiết Kế Landing Page',
    shortDescription: 'Landing page là công cụ quan trọng giúp doanh nghiệp giới thiệu dịch vụ, thu lead và tăng tỷ lệ chuyển đổi.',
    icon: 'FaLaptopCode',
    fullDescription: `
      <p>Landing page là công cụ quan trọng giúp doanh nghiệp giới thiệu dịch vụ, thu lead và tăng tỷ lệ chuyển đổi từ quảng cáo hoặc SEO. Một landing page được thiết kế tốt cần có bố cục rõ ràng, nội dung thuyết phục và tối ưu trải nghiệm người dùng.</p>
      
      <p>Chúng tôi hỗ trợ thiết kế landing page theo mục tiêu bán hàng, giới thiệu dịch vụ hoặc thu thập khách hàng tiềm năng. Nội dung được xây dựng theo hướng chuẩn SEO, dễ đọc, dễ hiểu và hỗ trợ chuyển đổi tốt hơn.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Phân tích mục tiêu',
        description: 'Xác định mục tiêu và đối tượng khách hàng'
      },
      {
        step: 2,
        title: 'Thiết kế giao diện',
        description: 'Tạo layout và thiết kế UI/UX'
      },
      {
        step: 3,
        title: 'Viết nội dung',
        description: 'Sáng tạo nội dung thuyết phục và chuẩn SEO'
      },
      {
        step: 4,
        title: 'Triển khai & Tối ưu',
        description: 'Deploy và tối ưu chuyển đổi'
      }
    ],
    benefits: [
      'Giao diện chuyên nghiệp',
      'Tăng tỷ lệ chuyển đổi',
      'Hỗ trợ SEO và quảng cáo',
      'Phù hợp cho nhiều ngành dịch vụ'
    ],
    relatedProjects: [],
    metaTitle: 'Dịch Vụ Thiết Kế Landing Page Chuẩn SEO | Tesla Media',
    metaDescription: 'Thiết kế landing page chuyên nghiệp, chuẩn SEO, tăng tỷ lệ chuyển đổi cho doanh nghiệp.',
    ogImage: '/images/services/landing-page-seo-og.jpg'
  },
  {
    id: 'cung-cap-nguyen-lieu-facebook',
    slug: 'cung-cap-nguyen-lieu-facebook',
    title: 'Cung Cấp Nguyên Liệu Các Dịch Vụ Facebook',
    shortDescription: 'Cung cấp đầy đủ các tài nguyên cần thiết để triển khai dịch vụ Facebook nhanh chóng và hiệu quả.',
    icon: 'FaBoxes',
    fullDescription: `
      <p>Chúng tôi cung cấp đầy đủ các tài nguyên cần thiết để triển khai dịch vụ Facebook nhanh chóng và hiệu quả.</p>
      
      <p>Bao gồm: Page Ads Live - tài khoản quảng cáo - BM - group - ních Facebook có tích xanh vĩnh viễn</p>
      
      <p>Giải pháp giúp khách hàng có sẵn hệ thống để triển khai ngay, tiết kiệm thời gian và tối ưu hiệu quả kinh doanh.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Tư vấn nhu cầu',
        description: 'Xác định loại tài nguyên cần thiết'
      },
      {
        step: 2,
        title: 'Chuẩn bị tài nguyên',
        description: 'Chuẩn bị page, tài khoản, BM theo yêu cầu'
      },
      {
        step: 3,
        title: 'Bàn giao',
        description: 'Chuyển giao tài nguyên và hướng dẫn sử dụng'
      },
      {
        step: 4,
        title: 'Hỗ trợ',
        description: 'Hỗ trợ kỹ thuật và xử lý vấn đề phát sinh'
      }
    ],
    benefits: [
      'Có sẵn nội dung và tư liệu triển khai',
      'Tiết kiệm thời gian chuẩn bị',
      'Hỗ trợ vận hành chiến dịch đồng bộ',
      'Phù hợp cho nhiều dịch vụ Facebook'
    ],
    relatedProjects: [],
    metaTitle: 'Cung Cấp Nguyên Liệu Cho Dịch Vụ Facebook | Tesla Media',
    metaDescription: 'Cung cấp page, tài khoản quảng cáo, BM và các tài nguyên Facebook cần thiết.',
    ogImage: '/images/services/nguyen-lieu-facebook-og.jpg'
  },
  {
    id: 'cho-thue-tai-khoan-quang-cao',
    slug: 'cho-thue-tai-khoan-quang-cao',
    title: 'Cho Thuê Tài Khoản Quảng Cáo',
    shortDescription: 'Dịch vụ cho thuê tài khoản quảng cáo giúp bạn triển khai chiến dịch nhanh chóng mà không cần sở hữu tài khoản riêng.',
    icon: 'FaKey',
    fullDescription: `
      <p>Dịch vụ cho thuê tài khoản quảng cáo giúp bạn triển khai chiến dịch nhanh chóng mà không cần sở hữu tài khoản riêng.</p>
      
      <p>Hỗ trợ xuất VAT, chi phí tối ưu với phí chỉ từ 1%.</p>
      
      <p>Phù hợp cho cá nhân, doanh nghiệp và agency cần chạy ads ổn định, hạn chế rủi ro.</p>
    `,
    process: [
      {
        step: 1,
        title: 'Đăng ký dịch vụ',
        description: 'Đăng ký và cung cấp thông tin cần thiết'
      },
      {
        step: 2,
        title: 'Cấp tài khoản',
        description: 'Nhận tài khoản quảng cáo và hướng dẫn'
      },
      {
        step: 3,
        title: 'Triển khai chiến dịch',
        description: 'Chạy quảng cáo trên tài khoản được cấp'
      },
      {
        step: 4,
        title: 'Thanh toán & Báo cáo',
        description: 'Thanh toán định kỳ và nhận báo cáo chi tiết'
      }
    ],
    benefits: [
      'Không cần tự tạo tài khoản',
      'Có thể xuất hóa đơn VAT',
      'Phí thấp, tối ưu chi phí',
      'Triển khai nhanh, ổn định'
    ],
    relatedProjects: [],
    metaTitle: 'Dịch Vụ Cho Thuê Tài Khoản Quảng Cáo | Tesla Media',
    metaDescription: 'Cho thuê tài khoản quảng cáo Facebook, hỗ trợ xuất VAT, phí thấp chỉ từ 1%.',
    ogImage: '/images/services/cho-thue-tk-og.jpg'
  }
];
