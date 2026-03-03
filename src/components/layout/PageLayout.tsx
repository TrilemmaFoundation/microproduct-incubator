import type React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`min-h-dvh ${className}`}>
      <Header />
      <main
        id="page-scroll-container"
        className="pt-14 sm:pt-16 bg-background overflow-x-hidden"
      >
        {children}

        {/* Divider above footer */}
        <div className="flex justify-center bg-background py-6 sm:py-8">
          <div className="w-4/5 sm:w-2/3 border-t border-white/20" />
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
