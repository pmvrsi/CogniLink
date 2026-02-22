'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ProductCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="anim-fade-up delay-700 max-w-6xl mx-auto px-4">
      <div className="relative pb-24">
        {/* Floating Icons — scroll-triggered */}
        <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none">
          <div className={`absolute left-[5%] bottom-0 transition-all duration-1000 ease-out ${visible ? 'translate-y-[20%] opacity-80' : 'translate-y-[100%] opacity-0'}`}>
            <Image src="/fixedicons/goodnotes.png" alt="" width={80} height={80} className="drop-shadow-2xl" />
          </div>
          <div className={`absolute left-[20%] bottom-0 transition-all duration-[1200ms] ease-out delay-100 ${visible ? 'translate-y-[-10%] opacity-70' : 'translate-y-[100%] opacity-0'}`}>
            <Image src="/fixedicons/notes.png" alt="" width={88} height={88} className="drop-shadow-2xl" />
          </div>
          <div className={`absolute left-[38%] bottom-0 transition-all duration-1000 ease-out delay-200 ${visible ? 'translate-y-[30%] opacity-75' : 'translate-y-[100%] opacity-0'}`}>
            <Image src="/fixedicons/pdf.png" alt="" width={72} height={72} className="drop-shadow-2xl" />
          </div>
          <div className={`absolute right-[35%] bottom-0 transition-all duration-[1100ms] ease-out delay-150 ${visible ? 'translate-y-[-20%] opacity-65' : 'translate-y-[100%] opacity-0'}`}>
            <Image src="/fixedicons/word.png" alt="" width={80} height={80} className="drop-shadow-2xl" />
          </div>
          <div className={`absolute right-[18%] bottom-0 transition-all duration-[900ms] ease-out delay-75 ${visible ? 'translate-y-[15%] opacity-80' : 'translate-y-[100%] opacity-0'}`}>
            <Image src="/fixedicons/ios.png" alt="" width={64} height={64} className="drop-shadow-2xl" />
          </div>
          <div className={`absolute right-[3%] bottom-0 transition-all duration-[1300ms] ease-out delay-[250ms] ${visible ? 'translate-y-[25%] opacity-60' : 'translate-y-[100%] opacity-0'}`}>
            <Image src="/fixedicons/macos.png" alt="" width={96} height={96} className="drop-shadow-2xl" />
          </div>
        </div>

        {/* Video card */}
        <div className="rounded-[40px] bg-white/5 border border-white/10 p-4 backdrop-blur-3xl overflow-hidden shadow-2xl relative z-10">
          <video
            src="https://user-cdn.hackclub-assets.com/019c8444-6704-775e-9db4-cc572d32b62e/maindemo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-[32px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
