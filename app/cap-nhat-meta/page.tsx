import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import metaUpdates from '@/data/meta-updates';
import BlogCard from '@/components/shared/BlogCard';
import { FaFacebook, FaInstagram, FaBell } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Cập Nhật Meta - Thông Tin Mới Nhất Từ Facebook & Instagram | Tesla Media',
  description: 'Theo dõi các cập nhật mới nhất từ Meta về chính sách quảng cáo, thuật toán, tính năng mới trên Facebook và Instagram. Cập nhật liên tục từ Tesla Media.',
  keywords: 'cập nhật meta, facebook update, instagram update, chính sách facebook, thuật toán facebook, meta news',
  openGraph: {
    title: 'Cập Nhật Meta - Thông Tin Mới Nhất Từ Facebook & Instagram',
    description: 'Theo dõi các cập nhật mới nhất từ Meta về chính sách quảng cáo, thuật toán, tính năng mới.',
    type: 'website',
    url: 'https://teslamedia.vn/cap-nhat-meta',
  }
};

export default function MetaUpdatesPage() {
  // Sort updates by date (newest first)
  const sortedUpdates = [...metaUpdates].sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <>
      <main className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <FaFacebook className="w-12 h-12" />
                <FaInstagram className="w-12 h-12" />
                <FaBell className="w-12 h-12" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Cập Nhật Meta
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-blue-100">
                Thông Tin Mới Nhất Từ Facebook & Instagram
              </p>
              <p className="text-lg text-blue-50 max-w-2xl mx-auto">
                Theo dõi các thay đổi về chính sách quảng cáo, thuật toán, tính năng mới và xu hướng marketing trên nền tảng Meta. Cập nhật liên tục để bạn không bỏ lỡ thông tin quan trọng.
              </p>
            </div>
          </div>
        </section>

        {/* Updates Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {sortedUpdates.length}
                  </div>
                  <div className="text-gray-600">Bài Cập Nhật</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    <FaFacebook className="inline w-8 h-8" />
                  </div>
                  <div className="text-gray-600">Facebook Updates</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">
                    <FaInstagram className="inline w-8 h-8" />
                  </div>
                  <div className="text-gray-600">Instagram Updates</div>
                </div>
              </div>

              {/* Updates List */}
              {sortedUpdates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedUpdates.map((update) => (
                    <BlogCard key={update.id} post={update} basePath="/cap-nhat-meta" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FaBell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                    Chưa Có Cập Nhật
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Hiện tại chưa có bài cập nhật nào. Vui lòng quay lại sau.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Cần Hỗ Trợ Về Facebook Marketing?
              </h2>
              <p className="text-xl mb-8 text-blue-50">
                Đội ngũ chuyên gia của Tesla Media luôn cập nhật và áp dụng những thay đổi mới nhất từ Meta để tối ưu chiến dịch quảng cáo cho khách hàng.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/lien-he"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                >
                  Liên Hệ Tư Vấn
                </Link>
                <Link
                  href="/dich-vu"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  Xem Dịch Vụ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
