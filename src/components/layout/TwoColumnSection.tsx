import type React from "react";

interface TwoColumnSectionProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  className?: string;
  containerClassName?: string;
  leftColumnClassName?: string;
  rightColumnClassName?: string;
  reverseOnMobile?: boolean;
  paddingY?: string;
  paddingTop?: string;
  paddingBottom?: string;
  wrapInSection?: boolean;
}

const TwoColumnSection: React.FC<TwoColumnSectionProps> = ({
  leftColumn,
  rightColumn,
  className = "",
  containerClassName = "",
  leftColumnClassName = "",
  rightColumnClassName = "",
  reverseOnMobile = false,
  paddingY = "py-20",
  paddingTop,
  paddingBottom,
  wrapInSection = true,
}) => {
  const gridClasses =
    "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center";

  // Determine padding classes based on props
  const getPaddingClasses = () => {
    if (paddingTop && paddingBottom) {
      return `${paddingTop} ${paddingBottom}`;
    } else if (paddingTop) {
      return paddingTop;
    } else if (paddingBottom) {
      return paddingBottom;
    } else {
      return paddingY;
    }
  };

  const content = (
    <div className={`container mx-auto px-4 sm:px-6 ${getPaddingClasses()}`}>
      <div className={`max-w-6xl mx-auto ${gridClasses} ${containerClassName}`}>
        {/* Left column */}
        <div
          className={`overflow-x-hidden ${
            reverseOnMobile ? "order-2 lg:order-1" : ""
          } ${leftColumnClassName}`}
        >
          {leftColumn}
        </div>

        {/* Right column */}
        <div
          className={`overflow-x-hidden ${
            reverseOnMobile ? "order-1 lg:order-2" : ""
          } ${rightColumnClassName}`}
        >
          {rightColumn}
        </div>
      </div>
    </div>
  );

  if (wrapInSection) {
    return (
      <section className={`overflow-x-hidden ${className}`}>{content}</section>
    );
  }

  return content;
};

export default TwoColumnSection;
