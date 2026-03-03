import { motion } from "framer-motion";
import { memo } from "react";
import { EXTERNAL_LINKS } from "../../../../../constants/externalLinks";
import DiscordButton from "../../../../UI/DiscordButton";
import PrimaryButton from "../../../../UI/PrimaryButton";
import UniversityMarquee from "./LandingUniversityMarquee";

const Hero = memo(() => {
  const heroEase: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: heroEase,
      },
    },
  };

  return (
    <section className="bg-background text-white py-16 sm:py-20 lg:min-h-[calc(100dvh-4rem)] lg:flex lg:items-center overflow-hidden">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-tight lg:leading-tight mb-6 sm:mb-8"
          >
            <span className="text-white">Global Talent Incubator</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed mb-8 sm:mb-10"
          >
            <span className="text-white">Data-driven R&D lab advancing </span>
            <span className="text-brand-orange">opportunities</span>
            <span className="text-white">, </span>
            <span className="text-brand-orange">innovation</span>
            <span className="text-white">, and </span>
            <span className="text-brand-orange">ecosystems</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mt-8 sm:mt-10 max-w-xs sm:max-w-none mx-auto mb-12 sm:mb-16"
          >
            <a
              href={EXTERNAL_LINKS.enrollmentForm}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <PrimaryButton fullWidth className="sm:w-auto sm:min-w-[180px]">
                Onboard to Project
              </PrimaryButton>
            </a>
            <DiscordButton fullWidth className="sm:w-auto sm:min-w-[180px]" />
          </motion.div>
        </div>

        {/* University Marquee */}
        <motion.div variants={itemVariants}>
          <UniversityMarquee />
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
