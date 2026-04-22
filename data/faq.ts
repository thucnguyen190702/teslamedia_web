import { FAQ } from '@/lib/types';

/**
 * Hardcoded FAQ Data
 * Tesla Media Clone Website
 * 
 * Frequently Asked Questions organized by category
 */

export const faqs: FAQ[] = [
  // Dịch vụ chung
  {
    id: 'faq-1',
    question: 'Tesla Media cung cấp những dịch vụ gì?',
    answer: 'Tesla Media cung cấp đầy đủ các dịch vụ Digital Marketing bao gồm: Thiết kế website, Nhận diện thương hiệu, Quản trị nội dung, Landing page, SEO tổng thể và Phòng Marketing thuê ngoài. Chúng tôi là đối tác tin cậy giúp doanh nghiệp phát triển toàn diện trên môi trường số.',
    category: 'Dịch vụ chung'
  },
  {
    id: 'faq-2',
    question: 'Quy trình làm việc của Tesla Media như thế nào?',
    answer: 'Quy trình làm việc của chúng tôi bao gồm 5 bước: (1) Tư vấn và phân tích nhu cầu, (2) Đề xuất giải pháp và báo giá, (3) Ký hợp đồng và triển khai, (4) Theo dõi và tối ưu, (5) Bàn giao và hỗ trợ sau dự án. Mỗi bước đều có sự tham gia và phê duyệt của khách hàng.',
    category: 'Dịch vụ chung'
  },
  {
    id: 'faq-3',
    question: 'Tesla Media đã làm việc với những khách hàng nào?',
    answer: 'Chúng tôi đã có vinh dự làm việc với nhiều thương hiệu lớn như Vinamilk, FPT, Viettel, Highlands Coffee, Coca-Cola, Samsung, Grab, Shopee, Lazada và hàng trăm doanh nghiệp khác trong nhiều lĩnh vực. Portfolio đầy đủ có thể xem tại trang Dự án của chúng tôi.',
    category: 'Dịch vụ chung'
  },

  // Thiết kế website
  {
    id: 'faq-4',
    question: 'Thời gian thiết kế một website là bao lâu?',
    answer: 'Thời gian thiết kế website phụ thuộc vào độ phức tạp của dự án. Một website cơ bản thường mất 4-6 tuần, website thương mại điện tử mất 8-12 tuần, và các dự án lớn có thể mất 3-6 tháng. Chúng tôi sẽ cung cấp timeline chi tiết sau khi phân tích yêu cầu.',
    category: 'Thiết kế website'
  },
  {
    id: 'faq-5',
    question: 'Chi phí thiết kế website là bao nhiêu?',
    answer: 'Chi phí thiết kế website dao động từ 20 triệu đến 200 triệu VNĐ tùy thuộc vào quy mô, tính năng và độ phức tạp. Website landing page đơn giản có thể từ 20-30 triệu, website doanh nghiệp từ 50-100 triệu, và website thương mại điện tử từ 100-200 triệu. Liên hệ với chúng tôi để được báo giá chi tiết.',
    category: 'Thiết kế website'
  },
  {
    id: 'faq-6',
    question: 'Website có responsive trên mobile không?',
    answer: 'Tất cả website do Tesla Media thiết kế đều responsive hoàn hảo trên mọi thiết bị (mobile, tablet, desktop). Chúng tôi áp dụng mobile-first design để đảm bảo trải nghiệm tốt nhất trên smartphone, đáp ứng yêu cầu mobile-first indexing của Google.',
    category: 'Thiết kế website'
  },
  {
    id: 'faq-7',
    question: 'Tôi có thể tự quản lý nội dung website không?',
    answer: 'Có, chúng tôi tích hợp CMS (Content Management System) dễ sử dụng để bạn có thể tự quản lý nội dung như thêm/sửa/xóa bài viết, sản phẩm, hình ảnh mà không cần kiến thức lập trình. Chúng tôi cũng cung cấp đào tạo sử dụng CMS sau khi bàn giao.',
    category: 'Thiết kế website'
  },

  // SEO
  {
    id: 'faq-8',
    question: 'Bao lâu thì thấy kết quả SEO?',
    answer: 'SEO là chiến lược dài hạn. Thông thường, bạn sẽ thấy kết quả đầu tiên sau 3-6 tháng với các từ khóa có độ cạnh tranh trung bình. Các từ khóa cạnh tranh cao có thể mất 6-12 tháng. Tuy nhiên, một khi đã đạt được thứ hạng tốt, kết quả sẽ bền vững và mang lại ROI cao.',
    category: 'SEO'
  },
  {
    id: 'faq-9',
    question: 'Tesla Media có đảm bảo lên top 1 Google không?',
    answer: 'Không có công ty SEO nào có thể đảm bảo 100% lên top 1 Google vì thuật toán Google liên tục thay đổi và có nhiều yếu tố nằm ngoài tầm kiểm soát. Tuy nhiên, chúng tôi cam kết áp dụng các best practices, làm việc minh bạch và đạt được cải thiện thứ hạng đáng kể cho các từ khóa mục tiêu.',
    category: 'SEO'
  },
  {
    id: 'faq-10',
    question: 'Chi phí dịch vụ SEO là bao nhiêu?',
    answer: 'Chi phí SEO phụ thuộc vào quy mô website, số lượng từ khóa và độ cạnh tranh. Gói SEO cơ bản bắt đầu từ 15 triệu/tháng, gói SEO chuyên sâu từ 30-50 triệu/tháng. Chúng tôi cũng cung cấp gói SEO theo dự án với chi phí từ 50-200 triệu tùy scope of work.',
    category: 'SEO'
  },
  {
    id: 'faq-11',
    question: 'Tôi có thể tự làm SEO được không?',
    answer: 'Bạn hoàn toàn có thể tự học và làm SEO cơ bản. Tuy nhiên, SEO chuyên nghiệp đòi hỏi kiến thức chuyên sâu, kinh nghiệm thực tế và công cụ chuyên dụng. Thuê agency SEO giúp bạn tiết kiệm thời gian, tránh sai lầm và đạt kết quả nhanh hơn. Đặc biệt với các dự án lớn, SEO chuyên nghiệp là điều cần thiết.',
    category: 'SEO'
  },

  // Quản trị nội dung
  {
    id: 'faq-12',
    question: 'Dịch vụ quản trị nội dung bao gồm những gì?',
    answer: 'Dịch vụ quản trị nội dung của chúng tôi bao gồm: Lập kế hoạch nội dung (content calendar), sáng tạo nội dung (viết bài, thiết kế hình ảnh/video), đăng bài theo lịch, tương tác với cộng đồng (trả lời comment, tin nhắn), và báo cáo hiệu quả hàng tháng.',
    category: 'Quản trị nội dung'
  },
  {
    id: 'faq-13',
    question: 'Tôi có được duyệt nội dung trước khi đăng không?',
    answer: 'Có, tất cả nội dung đều được gửi cho khách hàng duyệt trước khi đăng. Bạn có thể yêu cầu chỉnh sửa cho đến khi hài lòng. Chúng tôi thường gửi content calendar đầu tháng và nội dung chi tiết trước 2-3 ngày so với ngày đăng để bạn có thời gian review.',
    category: 'Quản trị nội dung'
  },
  {
    id: 'faq-14',
    question: 'Chi phí quản trị nội dung là bao nhiêu?',
    answer: 'Chi phí quản trị nội dung phụ thuộc vào số lượng bài đăng và nền tảng. Gói cơ bản (15 bài/tháng, 1 nền tảng) từ 10 triệu/tháng. Gói tiêu chuẩn (30 bài/tháng, 2-3 nền tảng) từ 20 triệu/tháng. Gói cao cấp (60+ bài/tháng, đa nền tảng) từ 40 triệu/tháng. Liên hệ để được tư vấn gói phù hợp.',
    category: 'Quản trị nội dung'
  },

  // Nhận diện thương hiệu
  {
    id: 'faq-15',
    question: 'Thời gian thiết kế bộ nhận diện thương hiệu là bao lâu?',
    answer: 'Thời gian thiết kế bộ nhận diện thương hiệu thường từ 4-8 tuần, bao gồm: Nghiên cứu thương hiệu (1 tuần), Phát triển concept (1-2 tuần), Thiết kế logo và màu sắc (2-3 tuần), Xây dựng Brand Guideline (1-2 tuần). Timeline có thể điều chỉnh tùy độ phức tạp của dự án.',
    category: 'Nhận diện thương hiệu'
  },
  {
    id: 'faq-16',
    question: 'Tôi có được bao nhiêu concept để lựa chọn?',
    answer: 'Chúng tôi thường cung cấp 3 concept khác nhau để khách hàng lựa chọn. Sau khi chọn concept ưng ý, chúng tôi sẽ refine và hoàn thiện concept đó. Bạn có thể yêu cầu chỉnh sửa không giới hạn cho đến khi hài lòng (trong phạm vi scope of work đã thỏa thuận).',
    category: 'Nhận diện thương hiệu'
  },
  {
    id: 'faq-17',
    question: 'Tôi có sở hữu bản quyền logo và brand identity không?',
    answer: 'Có, sau khi thanh toán đầy đủ, bạn sở hữu 100% bản quyền logo và toàn bộ brand identity. Chúng tôi sẽ bàn giao đầy đủ file thiết kế ở nhiều định dạng (AI, PDF, PNG, SVG, EPS) để bạn có thể sử dụng cho mọi mục đích.',
    category: 'Nhận diện thương hiệu'
  },

  // Phòng Marketing thuê ngoài
  {
    id: 'faq-18',
    question: 'Phòng Marketing thuê ngoài khác gì với thuê freelancer?',
    answer: 'Phòng Marketing thuê ngoài cung cấp một đội ngũ đa dạng (Marketing Manager, Content, Design, SEO, Ads) làm việc như một phòng ban thực sự, có quy trình chuyên nghiệp và đảm bảo chất lượng. Freelancer thường chỉ có một kỹ năng cụ thể và thiếu sự phối hợp. Với Tesla Media, bạn có cả team chuyên gia với chi phí tối ưu.',
    category: 'Phòng Marketing thuê ngoài'
  },
  {
    id: 'faq-19',
    question: 'Chi phí Phòng Marketing thuê ngoài là bao nhiêu?',
    answer: 'Chi phí phụ thuộc vào quy mô team và scope of work. Gói cơ bản (3-4 người) từ 30 triệu/tháng, gói tiêu chuẩn (5-7 người) từ 50 triệu/tháng, gói cao cấp (8+ người) từ 80 triệu/tháng. So với việc tuyển dụng nhân sự nội bộ, bạn tiết kiệm 40-60% chi phí và không cần đầu tư cơ sở hạ tầng.',
    category: 'Phòng Marketing thuê ngoài'
  },
  {
    id: 'faq-20',
    question: 'Tôi có thể scale up/down team không?',
    answer: 'Có, đó chính là lợi thế lớn của Phòng Marketing thuê ngoài. Bạn có thể linh hoạt tăng/giảm quy mô team theo nhu cầu kinh doanh từng thời điểm. Ví dụ, tăng team trong mùa cao điểm hoặc khi có campaign lớn, giảm team trong mùa thấp điểm để tối ưu chi phí.',
    category: 'Phòng Marketing thuê ngoài'
  },

  // Thanh toán và hợp đồng
  {
    id: 'faq-21',
    question: 'Hình thức thanh toán như thế nào?',
    answer: 'Chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng. Với dự án lớn, thường thanh toán theo milestone: 30-50% khi ký hợp đồng, 30-40% khi hoàn thành 50% công việc, 20-30% khi bàn giao. Với dịch vụ theo tháng (SEO, quản trị nội dung), thanh toán vào đầu mỗi tháng.',
    category: 'Thanh toán và hợp đồng'
  },
  {
    id: 'faq-22',
    question: 'Có hợp đồng và bảo hành không?',
    answer: 'Có, mọi dự án đều có hợp đồng rõ ràng về scope of work, timeline, chi phí và trách nhiệm của hai bên. Chúng tôi cũng cung cấp bảo hành: Website bảo hành 12 tháng, Brand Identity bảo hành 6 tháng, Landing page bảo hành 3 tháng. Bảo hành bao gồm sửa lỗi kỹ thuật và hỗ trợ sử dụng.',
    category: 'Thanh toán và hợp đồng'
  },
  {
    id: 'faq-23',
    question: 'Tôi có thể hủy hợp đồng giữa chừng không?',
    answer: 'Bạn có thể hủy hợp đồng nhưng cần thông báo trước 30 ngày và thanh toán cho phần công việc đã hoàn thành theo milestone. Chúng tôi luôn cố gắng đảm bảo chất lượng và sự hài lòng của khách hàng để tránh tình huống này. Nếu có vấn đề, hãy liên hệ để chúng tôi giải quyết.',
    category: 'Thanh toán và hợp đồng'
  },

  // Hỗ trợ khách hàng
  {
    id: 'faq-24',
    question: 'Làm thế nào để liên hệ với Tesla Media?',
    answer: 'Bạn có thể liên hệ với chúng tôi qua: Hotline: 1900-xxxx, Email: contact@teslamedia.vn, hoặc điền form liên hệ trên website. Chúng tôi cũng có Zalo, Messenger và Live Chat để hỗ trợ nhanh chóng. Thời gian làm việc: 8h-18h từ thứ 2 đến thứ 6, 8h-12h thứ 7.',
    category: 'Hỗ trợ khách hàng'
  },
  {
    id: 'faq-25',
    question: 'Tesla Media có văn phòng ở đâu?',
    answer: 'Chúng tôi có văn phòng tại Hà Nội và TP.HCM. Bạn có thể đến văn phòng để gặp trực tiếp và trao đổi về dự án. Vui lòng đặt lịch hẹn trước để chúng tôi sắp xếp thời gian phù hợp. Địa chỉ chi tiết có trên trang Liên hệ.',
    category: 'Hỗ trợ khách hàng'
  }
];

