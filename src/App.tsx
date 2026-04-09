import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionnairePage from "./pages/QuestionnairePage";
import PackagesPage from "./pages/PackagesPage";
import ContractorsPage from "./pages/ContractorsPage";
import WebsitesPage from "./pages/WebsitesPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import SteveProposalPage from "./pages/SteveProposalPage";
import MarioProposalPage from "./pages/MarioProposalPage";

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<QuestionnairePage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/contractors" element={<ContractorsPage />} />
        <Route path="/websites" element={<WebsitesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/premierpartners" element={<SteveProposalPage />} />
        <Route path="/marioscape" element={<MarioProposalPage />} />
      </Routes>
    </>
  );
}
