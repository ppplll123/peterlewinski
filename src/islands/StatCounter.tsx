import React, { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  duration?: number;
}

export default function StatCounter({
  end,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  duration = 2000,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  function animateCount() {
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return (
    <div ref={ref} className="text-center px-3 py-5">
      <div
        className="font-display text-2xl md:text-3xl font-semibold mb-1"
        style={{
          background: 'linear-gradient(135deg, #D4A520, #F2DFA7, #E8C665, #D4A520)',
          backgroundSize: '300% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'goldShimmer 4s ease-in-out infinite',
        }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-[10px] md:text-xs font-medium text-[#F0EDE6] uppercase tracking-[0.12em]">
        {label}
      </div>
      {sublabel && (
        <div className="text-[9px] md:text-[10px] text-[#5F5C66] mt-0.5">
          {sublabel}
        </div>
      )}
    </div>
  );
}
