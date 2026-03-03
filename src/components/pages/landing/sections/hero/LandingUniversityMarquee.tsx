import { memo, useMemo } from "react";
import { useCommunityData } from "../../../../../hooks/useCommunityData";

const UniversityMarquee = memo(() => {
  const { communityData } = useCommunityData();

  // Sort universities alphabetically for consistent display
  const universities = useMemo(
    () =>
      communityData
        .map((partner) => partner.university)
        .sort((a, b) => a.localeCompare(b)),
    [communityData],
  );

  // Create the marquee text with bullet separators
  const marqueeContent = useMemo(
    () =>
      universities.map((uni) => (
        <span key={uni} className="inline-flex items-center">
          <span className="text-brand-orange mx-4 sm:mx-6">●</span>
          <span className="text-white/70 text-xs sm:text-sm lg:text-base font-medium tracking-wide">
            {uni}
          </span>
        </span>
      )),
    [universities],
  );

  return (
    <section className="bg-background py-8 sm:py-10 overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <p className="text-center text-white/50 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
          Supporting technical talent from {universities.length} universities
          worldwide
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling marquee container */}
        <div className="marquee-container">
          <div className="marquee-content">
            {marqueeContent}
            {marqueeContent}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-block;
          animation: scroll 300s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
});

UniversityMarquee.displayName = "UniversityMarquee";

export default UniversityMarquee;
