import { useCallback } from "react";

/**
 * Reusable hook to programmatically scroll to the top of the page.
 * It first attempts to scroll the 'page-scroll-container' if it exists,
 * otherwise it scrolls the window.
 */
export const useScrollToTop = () => {
  const scrollToTop = useCallback((smooth = false) => {
    const behavior = smooth ? "smooth" : "auto";
    const scrollContainer = document.getElementById("page-scroll-container");

    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior });
    }

    // Always also scroll the window to be safe, as some layouts might not use the container for scroll
    window.scrollTo({ top: 0, behavior });
  }, []);

  return scrollToTop;
};
