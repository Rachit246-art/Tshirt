import React, { useRef, useEffect } from 'react';

export const PremiumVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Critical for iOS Safari autoplay: explicitly assign properties directly to DOM node
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');

    const tryPlay = () => {
      if (video && video.paused) {
        video.play().catch(() => {
          // Autoplay was prevented (e.g. low power mode or strict power saver)
        });
      }
    };

    tryPlay();

    // IntersectionObserver to resume playback as soon as user scrolls it into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    // Fallback: resume on first user interaction anywhere on screen if iOS held it in frozen state
    const handleFirstTouch = () => {
      tryPlay();
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
    };
    window.addEventListener('touchstart', handleFirstTouch, { passive: true });
    window.addEventListener('scroll', handleFirstTouch, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
    };
  }, []);

  return (
    <section 
      className="relative w-full overflow-hidden flex items-center justify-center bg-black min-h-screen"
      style={{ minHeight: '100dvh' }}
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        className="w-full h-full object-cover sm:object-contain z-10 pointer-events-none"
      />

      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center px-4 text-center">
        <h2 
          className="font-display uppercase font-black text-white mix-blend-overlay select-none"
          style={{ 
            fontSize: 'clamp(2.5rem, 9vw, 10rem)', 
            letterSpacing: '0.1em',
            textShadow: '0 10px 40px rgba(0,0,0,0.8)' 
          }}
        >
          THE VISION
        </h2>
      </div>
    </section>
  );
};
