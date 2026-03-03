import { useEffect } from "react";

/**
 * Hook to lock body scroll when a modal/overlay is open.
 * Prevents background scrolling on mobile menus, modals, etc.
 *
 * @param isLocked - Whether the body scroll should be locked
 */
export const useBodyScrollLock = (isLocked: boolean): void => {
  useEffect(() => {
    const scrollContainer = document.getElementById("page-scroll-container");

    if (isLocked) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      if (scrollContainer) {
        scrollContainer.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      if (scrollContainer) {
        scrollContainer.style.overflow = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      if (scrollContainer) {
        scrollContainer.style.overflow = "";
      }
    };
  }, [isLocked]);
};
