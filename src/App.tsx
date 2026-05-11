import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import HomePage from "./pages/HomePage";
import HomeServicesPage from "./pages/HomeServicesPage";
import LocalServicesPage from "./pages/LocalServicesPage";
import WebsitesPage from "./pages/WebsitesPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";

const QuestionnairePage = lazy(() => import("./pages/QuestionnairePage"));
const SteveReportPage = lazy(() => import("./pages/SteveReportPage"));
const MarioReportPage = lazy(() => import("./pages/MarioReportPage"));
const CalvinProposalPage = lazy(() => import("./pages/CalvinProposalPage"));
const IntakePage = lazy(() => import("./pages/IntakePage"));

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
          <Route path="/form" element={<QuestionnairePage />} />
          <Route path="/intake" element={<IntakePage />} />
          <Route path="/home-services" element={<HomeServicesPage />} />
          <Route path="/local-services" element={<LocalServicesPage />} />
          <Route path="/websites" element={<WebsitesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/premier" element={<SteveReportPage />} />
          <Route path="/premierpartners" element={<SteveReportPage />} />
          <Route path="/marioscape" element={<MarioReportPage />} />
          <Route path="/crystalclear" element={<CalvinProposalPage />} />
          <Route path="/calvin" element={<CalvinProposalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LazyMotion>
  );
}
