import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useReducer } from "react";
import MemoDemoPage from "./react-memo/MemoDemoPage";
// import { BreadcrumbPage } from "./components/ui/breadcrumb";

const countReducer = (state: CountState, action: CountAction): CountState => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) }; // payload가 있으면 그 값만큼, 없으면 1만큼 증가함
    case 'decrement':
      return { count: state.count - (action.payload || 1) }; // payload가 있으면 그 값만큼, 없으면 1만큼 감소함
    case 'reset':
      return { count: 0 }; // count를 0으로 리셋함
    default:
      throw new Error('Unhandled action type'); // 처리할 수 없는 액션 타입에 대해 에러를 발생시킴
  }
};

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
};

export default App;
