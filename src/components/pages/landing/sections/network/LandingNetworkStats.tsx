import React, { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  target: number;

  suffix?: string;

  duration?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  target,
  suffix = "+",
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);

  const [hasAnimated, setHasAnimated] = useState(false);

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const startTime = Date.now();

            const startValue = 0;

            const animate = () => {
              const elapsed = Date.now() - startTime;

              const progress = Math.min(elapsed / duration, 1);

              // Easing function for smooth animation (ease-out)

              const easeOut = 1 - (1 - progress) ** 3;

              const currentValue = Math.floor(
                startValue + (target - startValue) * easeOut,
              );

              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },

      { threshold: 0.5 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="text-3xl font-bold text-brand-orange mb-1">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

import { useCommunityData } from "../../../../../hooks/useCommunityData";
import { useMembersData } from "../../../../../hooks/useMembersData";

const LandingNetworkStats: React.FC = () => {
  const { capstoneStudentsCount } = useMembersData();
  const { communityData } = useCommunityData();

  const universitiesCount = communityData.length;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto w-fit md:w-full">
      {/* Students Engaged */}

      <div className="flex items-center justify-start gap-4">
        <div className="bg-brand-orange/20 p-3 rounded-lg flex-shrink-0 w-14 h-14 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-brand-orange"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        <div className="text-left">
          <AnimatedNumber target={2000} suffix="+" />

          <div className="text-white text-base font-medium">
            Students Engaged
          </div>
        </div>
      </div>

      {/* Universities Reached */}

      <div className="flex items-center justify-start gap-4">
        <div className="bg-brand-orange/20 p-3 rounded-lg flex-shrink-0 w-14 h-14 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-brand-orange"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
          </svg>
        </div>

        <div className="text-left">
          <AnimatedNumber
            key={universitiesCount}
            target={universitiesCount}
            suffix=""
          />

          <div className="text-white text-base font-medium">
            Universities Reached
          </div>
        </div>
      </div>

      {/* Capstone Students */}

      <div className="flex items-center justify-start gap-4">
        <div className="bg-brand-orange/20 p-3 rounded-lg flex-shrink-0 w-14 h-14 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-brand-orange"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
          </svg>
        </div>

        <div className="text-left">
          <AnimatedNumber
            key={capstoneStudentsCount}
            target={capstoneStudentsCount}
            suffix=""
          />

          <div className="text-white text-base font-medium">
            Capstone Students
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LandingNetworkStats);
