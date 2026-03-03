import { motion, type Variants } from "framer-motion";
import React, { Suspense } from "react";
import PageLayout from "../../layout/PageLayout";
import Section from "../../UI/Section";
import Hero from "./sections/hero/LandingHero";
import ProofOfPerformance from "./sections/LandingProofOfPerformance";

const LandingNetwork = React.lazy(
  () => import("./sections/network/LandingNetwork"),
);
const Ecosystem = React.lazy(
  () => import("./sections/ecosystem/LandingEcosystem"),
);

const Companies = React.lazy(
  () => import("./sections/companies/LandingCompanies"),
);

const NetworkSectionSkeleton = () => (
  <Section>
    <div className="space-y-8 animate-pulse">
      <div className="h-10 sm:h-12 bg-white/10 rounded-md w-3/4 mx-auto" />
      <div className="h-[350px] w-full rounded-lg bg-white/5 border border-white/10" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {Array.from(
          { length: 3 },
          (_, index) => `network-skeleton-${index}`,
        ).map((key) => (
          <div
            key={key}
            className="h-16 rounded-lg bg-white/5 border border-white/10"
          />
        ))}
      </div>
    </div>
  </Section>
);

const EcosystemSectionSkeleton = () => (
  <Section>
    <div className="space-y-8 lg:space-y-12 animate-pulse">
      <div className="h-10 sm:h-12 bg-white/10 rounded-md w-4/5 mx-auto" />
      {Array.from(
        { length: 3 },
        (_, index) => `ecosystem-skeleton-${index}`,
      ).map((key) => (
        <div
          key={key}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-10 lg:p-14 min-h-[550px] lg:min-h-[600px]"
        >
          <div className="h-8 sm:h-10 bg-white/10 rounded-md w-1/2 mb-6" />
          <div className="space-y-3">
            <div className="h-4 bg-white/10 rounded w-5/6" />
            <div className="h-4 bg-white/10 rounded w-4/6" />
            <div className="h-4 bg-white/10 rounded w-3/6" />
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const CompaniesSectionSkeleton = () => (
  <Section>
    <div className="space-y-12 animate-pulse">
      <div className="h-10 sm:h-12 bg-white/10 rounded-md w-1/2 mx-auto" />
      <div className="space-y-8">
        <div className="h-8 bg-white/10 rounded w-1/4" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Array.from(
            { length: 10 },
            (_, index) => `companies-skeleton-${index}`,
          ).map((key) => (
            <div key={key} className="h-12 bg-white/5 rounded" />
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const Landing: React.FC = () => {
  const sectionEase = "easeOut";
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: sectionEase,
      },
    },
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <Hero />

      {/* Proof of Performance Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ProofOfPerformance />
      </motion.div>

      {/* Partner Map Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Suspense fallback={<NetworkSectionSkeleton />}>
          <LandingNetwork />
        </Suspense>
      </motion.div>

      {/* Ecosystem Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Suspense fallback={<EcosystemSectionSkeleton />}>
          <Ecosystem />
        </Suspense>
      </motion.div>

      {/* Companies Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Suspense fallback={<CompaniesSectionSkeleton />}>
          <Companies />
        </Suspense>
      </motion.div>
    </PageLayout>
  );
};

export default Landing;
