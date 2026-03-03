import React from "react";

import Section from "../../../../UI/Section";
import LandingMap from "./LandingMap";

import LandingNetworkStats from "./LandingNetworkStats";

const LandingNetwork: React.FC = () => {
  return (
    <Section>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center mb-4 text-white">
        <span className="text-brand-orange">Onboard</span> a Global Talent
        Network
      </h2>

      <div className="mt-6">
        <LandingMap />
      </div>

      <LandingNetworkStats />
    </Section>
  );
};

export default React.memo(LandingNetwork);
