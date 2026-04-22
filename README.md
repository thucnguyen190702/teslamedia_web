# Tesla Media Clone

A static Next.js website clone of Tesla Media (teslamedia.vn) - a Digital Marketing agency in Vietnam.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Icons**: React Icons

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── home/              # Homepage components
│   ├── shared/            # Shared components
│   └── ui/                # UI components (Button, Card, Modal)
├── data/                  # Hardcoded static content
├── lib/                   # Utility functions and helpers
├── public/                # Static assets
└── styles/                # Global styles
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

This will generate a static export in the `out/` directory.

## Features

- Facebook-inspired blue theme (#1877F2)
- Fully responsive design
- SEO optimized with meta tags and structured data
- Performance optimized (Lighthouse score >= 90)
- Smooth animations with Framer Motion
- Client-side form validation
- Static content (no backend required)

## License

Private project
