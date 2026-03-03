import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import trilemmaLogo from "../../assets/landing/foundation_white.webp";
import { NAV_ITEMS } from "../../constants/navigation";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        mobileMenuOpen &&
        !target.closest(".mobile-nav") &&
        !target.closest(".mobile-menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useBodyScrollLock(mobileMenuOpen);

  // Focus first menu item when menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      firstFocusableRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  // Close menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: location.pathname triggers menu close on route change intentionally
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when screen size increases to desktop wide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-brand-black to-brand-navy">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center h-14 sm:h-16">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link
              to="/"
              className="flex items-center space-x-2 group min-h-touch"
            >
              <img
                src={trilemmaLogo}
                alt="Trilemma Foundation Logo"
                width={120}
                height={32}
                className="h-6 sm:h-8 w-auto group-hover:scale-105 transition-transform"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center space-x-2 transition-colors group min-h-touch ${
                  location.pathname === item.href
                    ? "text-brand-orange"
                    : "text-brand-white hover:text-brand-orange"
                }`}
              >
                <span
                  className={`text-base xl:text-lg group-hover:scale-110 transition-transform ${
                    location.pathname === item.href
                      ? "text-brand-orange"
                      : "text-brand-white group-hover:text-brand-orange"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-sm xl:text-base">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right: Mobile Menu Button and Desktop CTAs */}
          <div className="flex-1 flex items-center justify-end space-x-3 sm:space-x-4">
            <div className="hidden lg:flex items-center space-x-3">
              {/* CTAs removed per request */}
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMobileMenu}
              className="lg:hidden mobile-menu-button w-11 h-11 flex items-center justify-center rounded-lg hover:bg-brand-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange text-brand-white touch-manipulation active:scale-95"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span
                className="text-xl text-brand-white transition-transform duration-200"
                style={{
                  transform: mobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Slide down animation */}
        <nav
          ref={menuRef}
          id="mobile-navigation"
          className={`lg:hidden mobile-nav border-t border-brand-white/20 overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen
              ? "max-h-[calc(100dvh-56px)] opacity-100 py-4"
              : "max-h-0 opacity-0 py-0"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="max-w-7xl mx-auto space-y-2">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.label}
                ref={index === 0 ? firstFocusableRef : undefined}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-lg transition-colors group touch-manipulation min-h-touch active:scale-[0.98] ${
                  location.pathname === item.href
                    ? "bg-brand-orange/20 text-brand-orange"
                    : "hover:bg-brand-white/10 text-brand-white hover:text-brand-orange active:bg-brand-white/15"
                }`}
                tabIndex={mobileMenuOpen ? 0 : -1}
              >
                <span
                  className={`text-lg group-hover:scale-110 transition-transform ${
                    location.pathname === item.href
                      ? "text-brand-orange"
                      : "text-brand-white group-hover:text-brand-orange"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`font-medium text-base transition-colors ${
                    location.pathname === item.href
                      ? "text-brand-orange"
                      : "text-brand-white group-hover:text-brand-orange"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            {/* CTAs removed per request */}
          </div>
        </nav>
      </div>

      {/* Mobile menu backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-brand-black/50 backdrop-blur-sm -z-10"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Header;
