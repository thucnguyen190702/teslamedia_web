'use client';

import { lazy, Suspense } from 'react';

// Define the props interface for video player
interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  className?: string;
}

// Lazy load the video iframe component
const VideoPlayer = lazy(() => Promise.resolve({
  default: ({ videoUrl, title, className = '' }: VideoPlayerProps) => (
    <div className={`aspect-video ${className}`}>
      <iframe
        src={videoUrl}
        title={title}
        className="w-full h-full rounded-lg"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}));

// Loading skeleton for video player
const VideoPlayerSkeleton = () => (
  <div className="aspect-video bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  </div>
);

// Wrapper component with lazy loading
export default function LazyVideoPlayer(props: VideoPlayerProps) {
  return (
    <Suspense fallback={<VideoPlayerSkeleton />}>
      <VideoPlayer {...props} />
    </Suspense>
  );
}