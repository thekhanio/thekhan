import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import HomePage from "./pages/HomePage";
import MarketingPage from "./pages/MarketingPage";
import WebsitesPage from "./pages/WebsitesPage";
import WhyIntentPage from "./pages/WhyIntentPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";

const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const SteveReportPage = lazy(() => import("./pages/SteveReportPage"));
const MarioReportPage = lazy(() => import("./pages/MarioReportPage"));
const CalvinProposalPage = lazy(() => import("./pages/CalvinProposalPage"));
const ProposalPage = lazy(() => import("./pages/ProposalPage"));
const IntakePage = lazy(() => import("./pages/IntakePage"));

// Proposal template previews. Real prospects get their own routes + data files.
import { sampleTwoPathProposal } from "./data/proposals/sample-two-path";
import { sampleSingleProposal } from "./data/proposals/sample-single";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-bg">
      <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">404</p>
      <h1 className="display-h1 text-5xl md:text-6xl text-ink mb-4">This page doesn&apos;t exist.</h1>
      <a href="/" className="btn-primary mt-6">Back to home</a>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/start" element={<OnboardingPage />} />
          <Route path="/start/:scopeParam" element={<OnboardingPage />} />
          <Route path="/intake" element={<IntakePage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/websites" element={<WebsitesPage />} />
          <Route path="/why-intent" element={<WhyIntentPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/premierpartners" element={<SteveReportPage />} />
          <Route path="/marioscape" element={<MarioReportPage />} />
          <Route path="/crystalclear" element={<CalvinProposalPage />} />
          <Route path="/proposal-temp-multi" element={<ProposalPage data={sampleTwoPathProposal} />} />
          <Route path="/proposal-temp-single" element={<ProposalPage data={sampleSingleProposal} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LazyMotion>
  );
}
