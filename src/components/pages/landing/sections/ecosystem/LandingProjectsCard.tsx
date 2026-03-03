import { memo, useEffect, useRef, useState } from "react";

import bitcoinVideoSrc from "../../../../../assets/landing/bitcoin_animation.mp4";
import githubIcon from "../../../../../assets/landing/github.svg";
import honestRolesLogoSrc from "../../../../../assets/landing/honest roles logo.png";

import soccerVideoSrc from "../../../../../assets/landing/soccer_animation.webm";
import surgriskLogoSrc from "../../../../../assets/landing/surgrisk_logo_white.png";
import TwoColumnSection from "../../../../layout/TwoColumnSection";

// Custom hook for intersection observer

const useIntersectionObserver = (options = {}) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.play().catch(() => {
            // Handle play promise rejection silently
          });
        } else {
          element.pause();
        }
      },

      { threshold: 0.3, ...options },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);

      observer.disconnect();
    };
  }, [options]);

  return ref;
};

const capstones = [
  {
    id: "soccer",
    title: "Football Analytics Initiative",
    videoSrc: soccerVideoSrc,
    type: "video/webm",
    tags: ["Computer Vision", "Causal Inference", "Data Visualization"],
    githubUrl:
      "https://github.com/TrilemmaFoundation/soccer-analytics-capstone-template",
  },
  {
    id: "bitcoin",
    title: "Bitcoin Analytics Initiative",
    videoSrc: bitcoinVideoSrc,
    type: "video/mp4",
    tags: ["Quant Modelling", "Time Series", "On-chain Analysis"],
    githubUrl:
      "https://github.com/TrilemmaFoundation/Bitcoin-Analytics-Initiative",
  },
  {
    id: "recruitment",
    title: "Recruitment Analytics Initiative",
    imageSrc: honestRolesLogoSrc,
    tags: ["NLP & LLMs", "Ranking Systems", "Knowledge Graphs"],
    githubUrl:
      "https://github.com/TrilemmaFoundation/Recruitment-Analytics-Initiative/tree/main",
  },
  {
    id: "surgrisk",
    title: "Clinical Analytics Initiative",
    imageSrc: surgriskLogoSrc,
    tags: ["Risk ML", "Informatics", "Healthcare"],
    comingSoon: true,
    githubUrl:
      "https://github.com/TrilemmaFoundation/Clinical-Analytics-Initiative",
  },
];

const ProjectsCard = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useIntersectionObserver();

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setIsVideoReady(false);
      setCurrentIndex((prev) => (prev + 1) % capstones.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setIsVideoReady(false);
      setCurrentIndex(
        (prev) => (prev - 1 + capstones.length) % capstones.length,
      );
      setIsTransitioning(false);
    }, 300);
  };

  const currentCapstone = capstones[currentIndex];
  const transitionClasses = `transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
    }`;

  // Play video automatically when capstone changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Handle play promise rejection silently
      });
    }
  }, [videoRef]);

  const leftColumn = (
    <div className="text-center h-full flex flex-col justify-center">
      <div>
        <div className="max-w-md mx-auto text-left mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 leading-tight">
            <span className="text-brand-orange">Learn By Doing</span>
            <br />
            <span className="text-white">Industry Projects</span>
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-white/80 leading-relaxed">
            <p>
              Capstone projects are said to be the most valuable part of a STEM
              program.
            </p>
            <p>
              Often hosted at the end of the program, they are designed to apply
              the skills you learned in the classroom (or elsewhere) to real
              industry problems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const rightColumn = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 lg:gap-1">
        <div className="flex items-center justify-between gap-1 px-1">
          <button
            type="button"
            onClick={handlePrev}
            className="flex-none p-3 -ml-3 text-brand-blue hover:bg-brand-blue/10 rounded-full transition-all disabled:opacity-50 group"
            aria-label="Previous project"
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

          <h3
            className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-brand-blue text-center flex-1 leading-tight whitespace-nowrap px-1 ${transitionClasses}`}
          >
            {currentCapstone.title}
          </h3>

          <button
            type="button"
            onClick={handleNext}
            className="flex-none p-3 -mr-3 text-brand-blue hover:bg-brand-blue/10 rounded-full transition-all disabled:opacity-50 group"
            aria-label="Next project"
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

        <div className="flex justify-center items-center pb-2">
          <div className="flex gap-2.5">
            {capstones.map((capstone, index) => (
              <button
                key={capstone.id}
                type="button"
                onClick={() => {
                  if (isTransitioning || index === currentIndex) return;
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setIsVideoReady(false);
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 300);
                }}
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${index === currentIndex
                  ? "bg-brand-blue border-brand-blue scale-110"
                  : "bg-transparent border-white/30 hover:border-white/50"
                  }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-video bg-black/20 rounded-lg overflow-hidden flex items-center justify-center">
        {"videoSrc" in currentCapstone ? (
          <video
            key={currentCapstone.id}
            ref={videoRef}
            loop
            muted
            playsInline
            preload="none"
            className={`w-full h-full object-cover ${transitionClasses}`}
            onCanPlay={() => setIsVideoReady(true)}
            onLoadedData={() => setIsVideoReady(true)}
          >
            <source
              src={currentCapstone.videoSrc}
              type={currentCapstone.type}
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={currentCapstone.imageSrc}
            alt={currentCapstone.title}
            className={`w-full h-full ${currentCapstone.id === "surgrisk" ? "object-cover" : "object-contain"} ${transitionClasses}`}
          />
        )}

        {"videoSrc" in currentCapstone && !isVideoReady && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-navy/60 via-brand-black/40 to-brand-navy/60"
            aria-hidden="true"
          >
            <div className="h-3 w-24 rounded-full bg-white/20 animate-pulse" />
          </div>
        )}

        {/* Coming Soon Ribbon */}
        {"comingSoon" in currentCapstone && currentCapstone.comingSoon && (
          <div
            className={`absolute top-0 right-0 overflow-hidden w-24 h-24 sm:w-32 sm:h-32 pointer-events-none z-10 ${transitionClasses}`}
          >
            <div className="absolute top-[18px] right-[-32px] sm:top-[24px] sm:right-[-38px] w-[140%] bg-brand-orange text-brand-black text-[10px] sm:text-[11px] font-bold py-1 sm:py-1.5 text-center rotate-45 shadow-lg uppercase tracking-[0.1em]">
              Coming Soon
            </div>
          </div>
        )}
      </div>

      <div className="min-h-[6.5rem] flex flex-col items-center justify-center gap-4 py-2">
        <div
          className={`flex flex-wrap gap-2.5 w-full justify-center ${transitionClasses}`}
        >
          {currentCapstone.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-brand-blue text-brand-black rounded-full text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              # {tag}
            </span>
          ))}
          {currentCapstone.tags.length > 3 && (
            <span className="px-3 py-1.5 bg-brand-blue/20 text-brand-blue rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
              +{currentCapstone.tags.length - 3} more
            </span>
          )}
        </div>

        {currentCapstone.githubUrl && (
          <div className={`${transitionClasses}`}>
            <a
              href={currentCapstone.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity brightness-0 invert"
              />
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors text-center">
                View Repository
              </span>
              <svg
                className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 sm:p-10 lg:p-14 min-h-[550px] lg:min-h-[600px] flex items-center">
      <TwoColumnSection
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        wrapInSection={false}
        paddingY=""
        leftColumnClassName="!overflow-visible"
        rightColumnClassName="!overflow-visible"
      />
    </div>
  );
});

ProjectsCard.displayName = "ProjectsCard";

export default ProjectsCard;
