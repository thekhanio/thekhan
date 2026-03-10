import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionnairePage from "./pages/QuestionnairePage";
import PackagesPage from "./pages/PackagesPage";
import ContractorsPage from "./pages/ContractorsPage";
import ServicesPage from "./pages/ServicesPage";
import SteveProposalPage from "./pages/SteveProposalPage";
import MarioProposalPage from "./pages/MarioProposalPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/start" element={<QuestionnairePage />} />
      <Route path="/packages" element={<PackagesPage />} />
      <Route path="/contractors" element={<ContractorsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/premierpartners" element={<SteveProposalPage />} />
      <Route path="/marioscape" element={<MarioProposalPage />} />
    </Routes>
  );
}
