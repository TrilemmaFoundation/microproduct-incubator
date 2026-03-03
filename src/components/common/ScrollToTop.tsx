import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScrollToTop } from "../../hooks/useScrollToTop";

/**
 * Component that triggers a scroll to top on every route change.
 * Should be placed inside the Router but outside the Routes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const scrollToTop = useScrollToTop();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname triggers scroll on route change
  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);

  return null;
};

export default ScrollToTop;
