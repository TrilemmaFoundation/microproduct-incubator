import type React from "react";
import { useMemo } from "react";
import {
  type Company,
  useCompaniesData,
} from "../../../../../hooks/useCompaniesData";

const LandingCompanies: React.FC = () => {
  const { companies, loading, error } = useCompaniesData();

  // Group companies by category first to ensure clustering
  const sortedCompanies = useMemo(() => {
    const groups: Record<string, Company[]> = {};
    companies.forEach((company) => {
      const category = company.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(company);
    });

    // Sort categories to have a deterministic order
    const sortedCategories = Object.keys(groups).sort();

    // Flatten back into a single array
    return sortedCategories.flatMap((category) => groups[category]);
  }, [companies]);

  if (loading) return null;
  if (error) return null;
  if (companies.length === 0) return null;

  return (
    <section className="w-full py-12 md:py-24 bg-white relative overflow-hidden z-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-navy mb-4 relative z-20">
            Where Our Talent Delivers Impact
          </h2>
          <p className="text-brand-navy/70 max-w-2xl mx-auto text-lg relative z-20">
            Trilemma Foundation supports multidisciplinary practitioners whose
            work delivers value across leading organizations.
          </p>
        </div>

        {/* Responsive grid with proper divisors of 40:
                    - Mobile/Smallest (all): 4 columns × 10 rows
                    - Medium (md): 5 columns × 8 rows
                    - Large (lg): 8 columns × 5 rows
                */}
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16 items-center justify-items-center max-w-7xl mx-auto">
          {sortedCompanies.map((company) => {
            // Optical scaling overrides to handle visual weight differences
            const logoOverrides: Record<string, string> = {
              franklintempleton: "scale-[2.4]",
              thecocacolacompany: "scale-[1.4]",
              cisco: "scale-[1.3]",
              loral: "scale-[1.2]",
              apple: "scale-[0.85]",
              google: "scale-[0.85]",
              meta: "scale-[0.85]",
              microsoft: "scale-[0.85]",
              nasa: "scale-[1.1]",
              accenture: "scale-[1.1]",
              northropgrumman: "scale-[1.2]",
            };

            const opticalScale =
              logoOverrides[company.companySlug] || "scale-100";

            return (
              <a
                key={`${company.company}-${company.companySlug}`}
                href={company.companyUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label={company.company}
              >
                <div className="relative w-full h-10 md:h-14 flex items-center justify-center overflow-visible">
                  <img
                    src={`/companies/${company.companySlug}.svg`}
                    alt={`${company.company} logo`}
                    loading="lazy"
                    decoding="async"
                    className={`max-w-[90%] max-h-full w-auto h-auto object-contain transition-all duration-300 
                                                 opacity-100
                                                 lg:filter lg:grayscale lg:opacity-60 
                                                 lg:group-hover:filter-none lg:group-hover:opacity-100 lg:group-hover:grayscale-0
                                                 ${opticalScale}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingCompanies;
