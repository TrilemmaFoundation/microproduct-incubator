import { Link } from "react-router-dom";
import trilemmaLogo from "../../assets/landing/foundation_white.webp";
import { FOOTER_QUICK_LINKS, SOCIAL_LINKS } from "../../constants/navigation";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-brand-navy to-brand-black">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand Section */}
            <div className="col-span-1 xs:col-span-2 space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src={trilemmaLogo}
                  alt="Trilemma Foundation Logo"
                  width={120}
                  height={32}
                  className="h-6 sm:h-8 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="text-brand-white text-sm sm:text-base max-w-md leading-relaxed">
                Trilemma Foundation is a Canadian Registered Charity that
                incubates technical talent through global university
                partnerships, open source collaboration, and performance based
                opportunities. Our mission is to enable the brightest minds to
                rise based on performance.
              </p>
            </div>

            {/* Quick Links */}
            {FOOTER_QUICK_LINKS.length > 0 && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-brand-white">
                  Quick Links
                </h3>
                <nav className="flex flex-col">
                  {FOOTER_QUICK_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-sm sm:text-base text-brand-white hover:text-brand-orange transition-colors py-2 min-h-touch flex items-center touch-manipulation"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            )}

            {/* Connect */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-brand-white">
                Connect
              </h3>
              <div className="flex flex-col">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-brand-white hover:text-brand-orange transition-colors py-2 min-h-touch flex items-center touch-manipulation"
                  >
                    {/* Show short name on mobile, full name on sm+ */}
                    <span className="sm:hidden">{link.name}</span>
                    <span className="hidden sm:inline">{link.fullName}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-brand-white text-xs sm:text-sm">
                © 2025 Trilemma Foundation. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
