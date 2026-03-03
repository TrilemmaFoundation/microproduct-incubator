/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "api/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: [
        "src/components/UI/{Button,DiscordButton,OptimizedImage,PrimaryButton,ResourceCard,SecondaryButton,Section,SectionTitle,StatusBadge}.tsx",
        "src/components/common/ScrollToTop.tsx",
        "src/components/layout/{Footer,Header,PageLayout,TwoColumnSection}.tsx",
        "src/components/pages/careers/roles/{AnalyticsEngineerFellow,DataEngineerFellow,DataScientistFellow,SoftwareEngineerFellow,RolePageTemplate}.tsx",
        "src/components/pages/landing/Landing.tsx",
        "src/components/pages/landing/sections/LandingProofOfPerformance.tsx",
        "src/components/pages/landing/sections/ecosystem/{LandingDatathonCard,LandingEcosystem,LandingProjectsCard,WinnerJsonEditor}.tsx",
        "src/components/pages/landing/sections/hero/{LandingHero,LandingUniversityMarquee}.tsx",
        "src/components/pages/landing/sections/network/{LandingMap,LandingNetwork,LandingNetworkStats}.tsx",
        "src/components/pages/legal/{Privacy,Terms}.tsx",
        "src/components/pages/projects/Projects.tsx",
        "src/components/pages/projects/sections/ProjectResources.tsx",
        "src/components/pages/resources/Resources.tsx",
        "src/components/pages/team/{ProfileCard,Team,TeamLeadership,TeamSkeleton}.tsx",
        "src/components/pages/tournaments/{Tournament2026,Tournaments}.tsx",
        "src/components/pages/tournaments/past/{PastTournaments,Tournament2024,Tournament2025}.tsx",
        "src/constants/{externalLinks,navigation}.ts",
        "src/hooks/{useBodyScrollLock,useCapstonesData,useCommunityData,useCompaniesData,useMembersData,useProjectsData,useScrollToTop}.ts",
        "src/services/members.ts",
        "src/utils/{csvParser,geoUtils}.ts",
      ],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.test.{ts,tsx}",
        "**/*.config.{ts,js}",
        "**/types/",
      ],
      thresholds: {
        lines: 100,
        statements: 100,
        functions: 100,
        branches: 100,
      },
    },
  },
});
