import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MemoDemoPage from "./react-memo/MemoDemoPage";
import CompilerDemoPage from "./react-compiler/ProductCatalog";
import ErrorPage from "./pages/ErrorPage";
import ErrorPropagate from "./components/ErrorPropagate";
import UseThrowErrorUseCase from "./components/useThrowErrorUseCase";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

const App = () => {
  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="p-4 md:p-6">
          <SidebarTrigger />
        </div>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppSidebar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/memo" element={<MemoDemoPage />} />
              <Route path="/compiler" element={<CompilerDemoPage />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/error-propagate" element={<ErrorPropagate />} />
              <Route path="/error-usecase" element={<UseThrowErrorUseCase />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default App;
