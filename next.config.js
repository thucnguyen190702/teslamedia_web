/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Temporarily disabled for development
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Optimize CSS and JavaScript
  swcMinify: true,
  
  // Configure headers for caching and security
  async headers() {
    return [
      {
        // Security headers for all routes
        source: '/(.*)',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.googleapis.com *.gstatic.com *.youtube.com *.ytimg.com",
              "style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com",
              "img-src 'self' data: blob: *.google.com *.googleapis.com *.gstatic.com *.youtube.com *.ytimg.com *.ggpht.com",
              "font-src 'self' data: *.gstatic.com *.googleapis.com",
              "connect-src 'self' *.google.com *.googleapis.com *.youtube.com",
              "frame-src 'self' *.google.com *.youtube.com *.youtube-nocookie.com",
              "media-src 'self' *.youtube.com *.googlevideo.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // HTTPS enforcement
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        // Cache static assets
        source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf|png|jpg|jpeg|gif|ico|svg|webp)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache HTML pages with revalidation
        source: '/((?!api).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Framer Motion chunk (heavy library)
          framerMotion: {
            name: 'framer-motion',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            chunks: 'all',
            priority: 30,
          },
        },
      };
    }
    
    return config;
  },
  
  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
}

module.exports = nextConfig