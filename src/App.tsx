import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContractorsPage from "./pages/ContractorsPage";
import WebsitesPage from "./pages/WebsitesPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";

const QuestionnairePage = lazy(() => import("./pages/QuestionnairePage"));
const SteveProposalPage = lazy(() => import("./pages/SteveProposalPage"));
const MarioProposalPage = lazy(() => import("./pages/MarioProposalPage"));

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>404</h1>
      <p className="text-[#a3a3a3] text-lg mb-8">This page doesn't exist.</p>
      <a href="/" className="px-7 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium tracking-wide">Back to Home</a>
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
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/start" element={<QuestionnairePage />} />
          <Route path="/contractors" element={<ContractorsPage />} />
          <Route path="/websites" element={<WebsitesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/premierpartners" element={<SteveProposalPage />} />
          <Route path="/marioscape" element={<MarioProposalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
