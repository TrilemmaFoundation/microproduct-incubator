import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";

// Lazy load all route components for code splitting
const Landing = lazy(() => import("./components/pages/landing/Landing"));

// Premium loading fallback with pulse and spin
const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center justify-center"
    >
      <div className="absolute w-12 h-12 border-2 border-brand-orange/30 rounded-full animate-ping" />
      <div className="w-10 h-10 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-4 text-white/40 text-xs uppercase tracking-widest font-medium"
    >
      Loading Foundation
    </motion.p>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <PageContent />
      </Suspense>
    </Router>
  );
}

// Wrapper component to use useLocation for AnimatePresence
const PageContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;

