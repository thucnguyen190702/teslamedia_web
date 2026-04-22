import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dự án tiêu biểu | Tesla Media',
  description: 'Khám phá những dự án đã được Tesla Media thực hiện thành công. Từ thiết kế website, nhận diện thương hiệu đến các chiến dịch marketing sáng tạo.',
  keywords: 'dự án Tesla Media, portfolio, thiết kế website, nhận diện thương hiệu, landing page, digital marketing',
  openGraph: {
    title: 'Dự án tiêu biểu | Tesla Media',
    description: 'Khám phá những dự án đã được Tesla Media thực hiện thành công. Từ thiết kế website, nhận diện thương hiệu đến các chiến dịch marketing sáng tạo.',
    type: 'website',
    images: ['/images/projects/projects-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dự án tiêu biểu | Tesla Media',
    description: 'Khám phá những dự án đã được Tesla Media thực hiện thành công. Từ thiết kế website, nhận diện thương hiệu đến các chiến dịch marketing sáng tạo.',
    images: ['/images/projects/projects-og.jpg'],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}