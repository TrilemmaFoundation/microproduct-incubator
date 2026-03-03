import type React from "react";

interface SectionTitleProps {
  /**
   * Text to display in brand-orange color (first part of title).
   */
  orange: string;
  /**
   * Text to display in white color (second part of title).
   * Optional - if not provided, only orange text is shown.
   */
  white?: string;
  /**
   * HTML heading level to render.
   * @default "h1"
   */
  as?: "h1" | "h2" | "h3";
  /**
   * Additional classes for the heading element.
   */
  className?: string;
  /**
   * Text alignment.
   * @default "center"
   */
  align?: "left" | "center";
  /**
   * Optional subtitle text below the main title.
   */
  subtitle?: string;
}

/**
 * Consistent section title component with orange/white color split.
 * Used across hero sections and page headers.
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  orange,
  white,
  as: Tag = "h1",
  className = "",
  align = "center",
  subtitle,
}) => {
  const alignClasses = align === "center" ? "text-center" : "text-left";
  const baseClasses = "text-3xl sm:text-4xl lg:text-5xl font-bold";

  return (
    <div className={`${alignClasses} mb-8 sm:mb-12 ${className}`}>
      <Tag className={baseClasses}>
        <span className="text-brand-orange">{orange}</span>
        {white && <span className="text-white">{white}</span>}
      </Tag>
      {subtitle && (
        <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mt-3 sm:mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
