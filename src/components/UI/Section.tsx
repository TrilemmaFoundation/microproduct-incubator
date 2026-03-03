import type React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Maximum width class for the inner content container.
   * Set to null or empty string to disable max-width wrapper.
   * @default "max-w-6xl"
   */
  maxWidth?:
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | null
    | "";
  /**
   * Whether to include extra top padding for pages with fixed header.
   * @default false
   */
  isHero?: boolean;
  /**
   * Custom padding classes. Overrides default py-20.
   */
  padding?: string;
  /**
   * HTML id attribute for anchor linking.
   */
  id?: string;
}

/**
 * Reusable section wrapper with consistent container and padding.
 * Use for page sections to maintain consistent spacing and max-width.
 */
const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  maxWidth = "max-w-6xl",
  isHero = false,
  padding,
  id,
}) => {
  const basePadding = isHero ? "py-20 pt-28" : "py-14 sm:py-16 lg:py-24";
  const paddingClasses = padding || basePadding;

  return (
    <section
      id={id}
      className={`bg-background text-white ${paddingClasses} ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {maxWidth ? (
          <div className={`${maxWidth} mx-auto`}>{children}</div>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default Section;
