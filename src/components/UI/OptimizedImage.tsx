import type React from "react";

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
  fallbackSrc?: string;
}

/**
 * OptimizedImage component with built-in lazy loading and CLS prevention.
 *
 * Features:
 * - Automatic `loading="lazy"` and `decoding="async"` for below-fold images
 * - Use `eager={true}` for above-the-fold critical images
 * - Required width/height to prevent Cumulative Layout Shift (CLS)
 * - Optional fallback image on error
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  eager = false,
  fallbackSrc,
  className = "",
  ...props
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      className={className}
      onError={fallbackSrc ? handleError : undefined}
      {...props}
    />
  );
};

export default OptimizedImage;
