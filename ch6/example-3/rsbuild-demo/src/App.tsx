import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';

import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Performance from './pages/Performance';
import RocketAnimation from './pages/RocketAnimation';
import CssTransform from './pages/CssTransform';
import NotFound from './pages/NotFound';

// 메인 앱 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/rocket" element={<RocketAnimation />} />
              <Route path="/css" element={<CssTransform />} />
              <Route path="/animation" element={<RocketAnimation />} />
              <Route path="/*" element={<RocketAnimation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App; 