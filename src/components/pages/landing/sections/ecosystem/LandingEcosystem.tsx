import { memo } from "react";

import Section from "../../../../UI/Section";
import DatathonCard from "./LandingDatathonCard";
import ProjectsCard from "./LandingProjectsCard";

const Ecosystem = memo(() => {
  return (
    <Section>
      {/* Section Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center mb-12 lg:mb-16 leading-tight">
        An Elite Technical Talent Incubation Ecosystem
      </h2>

      {/* Cards Container */}
      <div className="space-y-8 lg:space-y-12">
        <ProjectsCard />

        <DatathonCard />
      </div>
    </Section>
  );
});

Ecosystem.displayName = "Ecosystem";

export default Ecosystem;
