import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MemoDemoPage from "./react-memo/MemoDemoPage";
import CompilerDemoPage from "./react-compiler/ProductCatalog";

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* 모든 커스텀 라우트는 catch-all "*" 라우트 위에 추가함 */}
          <Route path="/memo" element={<MemoDemoPage/>} />
          <Route path="/compiler" element={<CompilerDemoPage/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
};

export default App;
