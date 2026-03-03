import { memo, useEffect, useState } from "react";

import madhavTournament from "../../../../../assets/landing/madhav_bansal.jpg";
import navnoorTournament from "../../../../../assets/landing/navnoor_bawa.webp";
import sakshamTournament from "../../../../../assets/landing/saksham_verma.png";
import tamTournament from "../../../../../assets/landing/tam_nguyen.jpg";
import youssefTournament from "../../../../../assets/landing/youssef_ahmed.jpg";
import TwoColumnSection from "../../../../layout/TwoColumnSection";

import WinnerJsonEditor from "./WinnerJsonEditor";

const winners = [
  {
    name: "Youssef Ahmed",
    imageSrc: youssefTournament,
    info: {
      tournament: "Stacking Sats x Strategy",
      university: "Georgia Institute of Technology",
      program: "MS Analytics",
      region: "Dubai, UAE 🇦🇪",
    },
  },
  {
    name: "Tam Nguyen",
    imageSrc: tamTournament,
    info: {
      tournament: "Stacking Sats x Strategy",
      university: "University of British Columbia",
      program: "Math PhD",
      region: "Vancouver, Canada 🇨🇦",
    },
  },
  {
    name: "Madhav Bansal",
    imageSrc: madhavTournament,
    info: {
      tournament: "Stacking Sats x Strategy",
      university: "IIT Roorkee",
      program: "BTech Electrical Engineering",
      region: "Haryana, India 🇮🇳",
    },
  },
  {
    name: "Navnoor Bawa",
    imageSrc: navnoorTournament,
    info: {
      tournament: "Trilemma Beta",
      university: "Thapar University",
      program: "BE Computer Science",
      region: "Chandigarh, India 🇮🇳",
    },
  },
  {
    name: "Saksham Verma",
    imageSrc: sakshamTournament,
    info: {
      tournament: "Trilemma Beta",
      university: "Thapar University",
      program: "BE Computer Engineering",
      region: "Ludhiana, India 🇮🇳",
    },
  },
];

const DatathonCard = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload all winner headshots to avoid "pop-in"
  useEffect(() => {
    for (const winner of winners) {
      const img = new Image();
      img.src = winner.imageSrc;
    }
  }, []);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % winners.length);
      setTimeout(() => setIsTransitioning(false), 20);
    }, 200);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + winners.length) % winners.length);
      setTimeout(() => setIsTransitioning(false), 20);
    }, 200);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 20);
    }, 200);
  };

  const currentWinner = winners[currentIndex];
  const transitionClasses = `transition-opacity duration-200 ease-out ${isTransitioning ? "opacity-0" : "opacity-100"
    }`;

  const leftColumn = (
    <div className="flex flex-col gap-6 items-center w-full">
      {/* 1. Progress Dots (Static) */}
      <div className="flex justify-center items-center py-2">
        <div className="flex gap-2.5">
          {winners.map((winner, index) => (
            <button
              key={winner.name}
              type="button"
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${index === currentIndex
                ? "bg-brand-blue border-brand-blue scale-110"
                : "bg-transparent border-white/30 hover:border-white/50"
                }`}
              aria-label={`Go to winner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full">
        {/* Navigation Arrows (Static / Outside transition) */}
        <div className="absolute top-[45px] sm:top-[65px] left-0 right-0 flex justify-between items-center pointer-events-none px-1 sm:-mx-4 z-10">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2 sm:p-2.5 text-brand-blue hover:bg-brand-blue/10 rounded-full transition-all disabled:opacity-50 group pointer-events-auto"
            aria-label="Previous winner"
            disabled={isTransitioning}
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-1 group-active:scale-95"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="p-2 sm:p-2.5 text-brand-blue hover:bg-brand-blue/10 rounded-full transition-all disabled:opacity-50 group pointer-events-auto"
            aria-label="Next winner"
            disabled={isTransitioning}
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-1 group-active:scale-95"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* 2. Unified Transitioning Content Group */}
        <div
          key={currentIndex}
          className={`flex flex-col items-center gap-6 w-full ${transitionClasses}`}
        >
          {/* Headshot */}
          <div className="relative w-full max-w-[110px] xs:max-w-[140px] sm:max-w-[160px] md:max-w-[180px] aspect-square bg-black/20 rounded-lg overflow-hidden border-2 border-brand-orange/30 shrink-0">
            <img
              src={currentWinner.imageSrc}
              alt={`${currentWinner.name} - Tournament Winner`}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>

          {/* Name */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-blue text-center leading-snug px-2 -mt-2">
            {currentWinner.name}
          </h3>

          {/* JSON Editor */}
          <div className="w-full py-2">
            <WinnerJsonEditor info={currentWinner.info} />
          </div>
        </div>
      </div>
    </div>
  );

  const rightColumn = (
    <div className="text-center h-full flex flex-col justify-center">
      <div>
        <div className="max-w-md mx-auto text-left mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 leading-tight">
            <span className="text-brand-orange">Learn By Doing</span>

            <br />

            <span className="text-white">Datathons</span>
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-white/80 leading-relaxed">
            <p>
              Our problems can also be tackled via our data tournaments
              (datathons).
            </p>

            <p>
              Compete against global talent to win prizes, show up on
              leaderboards, and get hired.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 sm:p-10 lg:p-14 min-h-[550px] lg:min-h-[600px] flex items-center">
      <TwoColumnSection
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        reverseOnMobile={true}
        wrapInSection={false}
        paddingY=""
      />
    </div>
  );
});

DatathonCard.displayName = "DatathonCard";

export default DatathonCard;
