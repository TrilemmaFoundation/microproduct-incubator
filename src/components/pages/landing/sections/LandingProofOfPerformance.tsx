import { memo } from "react";

import Section from "../../../UI/Section";

const ProofOfPerformance = memo(() => {
  return (
    <Section maxWidth="max-w-5xl">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-10 lg:mb-12">
        <span className="text-brand-orange">Proof of Performance</span>
        <span className="text-white"> ≻</span>
      </h2>

      {/* Mission Statement */}
      <div className="space-y-6 text-base sm:text-lg text-white/80 leading-relaxed">
        <p>
          Trilemma Foundation is a Canadian Registered Charity that incubates
          technical talent through global university partnerships, open source
          collaboration, and performance based opportunities. Since our
          inception, we have worked with over 80 universities worldwide to
          support technical talent.
        </p>

        <p className="text-white font-semibold text-lg sm:text-xl">
          Our mission is to enable the brightest minds to rise based on
          performance.
        </p>

        <p>
          To support this mission, we operate as a data-driven R&D lab. We
          explore bold ideas, develop tools, and run open source projects that
          provide hands on experience to anyone with internet access. This
          structure allows us to generate positive externalities such as job
          placements, data-driven innovation, startup development, and broader
          ecosystem impact by focusing on talent first.
        </p>
      </div>

      {/* Proof of Performance Slides */}
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl mt-12 bg-white/5">
        <iframe
          src="https://docs.google.com/presentation/d/1v-h39oht_V3u31b3_dUi6gY7HRrRSrMyu2-2az9CMxQ/embed?start=false&loop=false&delayms=3000"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen={true}
          title="Proof of Performance"
        />
      </div>
    </Section>
  );
});

ProofOfPerformance.displayName = "ProofOfPerformance";

export default ProofOfPerformance;
