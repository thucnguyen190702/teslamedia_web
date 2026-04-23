import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LazyPopup from '@/components/shared/LazyPopup'
import PrefetchManager from '@/components/shared/PrefetchManager'
import { SkipLinks } from '@/components/shared/SkipLink'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Tesla Media - Digital Marketing Agency | Dịch vụ Marketing chuyên nghiệp',
  description: 'Tesla Media - Công ty chuyên về Digital Marketing tại Việt Nam. Cung cấp dịch vụ thiết kế website, nhận diện thương hiệu, SEO, landing page và quản trị nội dung chuyên nghiệp.',
  keywords: 'digital marketing, thiết kế website, SEO, landing page, nhận diện thương hiệu, quản trị nội dung, marketing thuê ngoài',
  authors: [{ name: 'Tesla Media' }],
  creator: 'Tesla Media',
  publisher: 'Tesla Media',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://teslamedia.vn',
    siteName: 'Tesla Media',
    title: 'Tesla Media - Digital Marketing Agency',
    description: 'Công ty chuyên về Digital Marketing tại Việt Nam. Cung cấp dịch vụ thiết kế website, nhận diện thương hiệu, SEO chuyên nghiệp.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tesla Media - Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tesla Media - Digital Marketing Agency',
    description: 'Công ty chuyên về Digital Marketing tại Việt Nam',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://teslamedia.vn',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#1877F2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Tesla Media" />
        
        {/* Apple Touch Icons - Using Tesla logo temporarily */}
        <link rel="apple-touch-icon" href="/images/icons/Logo-tesla.png" />
        
        {/* Favicon - Using Tesla logo temporarily */}
        <link rel="icon" type="image/png" href="/images/icons/Logo-tesla.png" />
        <link rel="shortcut icon" href="/images/icons/Logo-tesla.png" />
        
        {/* Microsoft Tiles - Using Tesla logo temporarily */}
        <meta name="msapplication-TileColor" content="#1877F2" />
        <meta name="msapplication-TileImage" content="/images/icons/Logo-tesla.png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        
        {/* DNS prefetch for non-critical third-party domains */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://zalo.me" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Inline critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            body{font-family:var(--font-inter),Inter,'Segoe UI',system-ui,sans-serif;color:#1F2933;background-color:#ffffff;margin:0;padding:0;min-height:100vh;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            h1{font-size:2.25rem;font-weight:700;line-height:1.2;margin:0}
            h2{font-size:1.875rem;font-weight:700;line-height:1.2;margin:0}
            .container{margin-left:auto;margin-right:auto;max-width:80rem;padding-left:1rem;padding-right:1rem}
            header{position:sticky;top:0;z-index:50;background-color:#ffffff;box-shadow:0 1px 3px rgba(0,0,0,0.1)}
            nav{display:flex;align-items:center;justify-content:space-between;padding:1rem 0}
            .btn{display:inline-flex;align-items:center;justify-content:center;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:500;transition:all 0.2s;min-height:44px;min-width:44px;border:none;cursor:pointer}
            .btn-primary{background-color:#1877F2;color:#ffffff}
            .btn-primary:hover{background-color:#1565D8}
            .hero{padding:4rem 0;text-align:center}
            @media (min-width:768px){.container{padding-left:1.5rem;padding-right:1.5rem}h1{font-size:3rem}h2{font-size:2.25rem}.hero{padding:6rem 0}}
            @media (min-width:1024px){.container{padding-left:2rem;padding-right:2rem}h1{font-size:3.75rem}h2{font-size:3rem}}
            @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;scroll-behavior:auto!important}}
          `
        }} />
      </head>
      <body className={inter.className}>
        {/* Skip links for keyboard navigation */}
        <SkipLinks 
          links={[
            { targetId: 'main-content', label: 'Chuyển đến nội dung chính' },
            { targetId: 'main-navigation', label: 'Chuyển đến menu điều hướng' },
            { targetId: 'footer', label: 'Chuyển đến footer' }
          ]}
        />
        
        <PrefetchManager />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        {/* <StickyContactBar /> */}
        <LazyPopup
          title="🎯 Xác minh tích xanh Facebook cho Fanpage"
          content="Tăng độ tin cậy và uy tín thương hiệu với dịch vụ xác minh tích xanh Facebook chuyên nghiệp. Bảo vệ khỏi tài khoản giả mạo và tăng reach tự nhiên."
          ctaText="Tư vấn ngay"
          ctaLink="/lien-he?service=tich-xanh-facebook"
          delay={5000}
          cookieName="facebook-verification-popup"
          cookieDays={7}
        />
      </body>
    </html>
  )
}
