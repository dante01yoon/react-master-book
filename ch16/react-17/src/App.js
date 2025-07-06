import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Home 컴포넌트를 동적으로 임포트함
// 해당 라우트에 접근할 때까지 Home 컴포넌트의 코드는 로드되지 않음
const Home = lazy(() => import('./routes/Home'));
// About 컴포넌트를 동적으로 임포트함
const About = lazy(() => import('./routes/About'));
// Profile 컴포넌트를 동적으로 임포트함
const Profile = lazy(() => import('./routes/Profile'));

// 애플리케이션의 메인 컴포넌트
const App = () => (
  // BrowserRouter를 사용하여 라우팅 기능을 활성화함
  <Router>
    {/* 네비게이션 링크 목록 */}
    <nav>
      <ul>
        <li>
          {/* Home 페이지로 이동하는 링크 */}
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* About 페이지로 이동하는 링크 */}
          <Link to="/about">About</Link>
        </li>
        <li>
          {/* Profile 페이지로 이동하는 링크 */}
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
    {/* Suspense는 하위 컴포넌트가 로드될 때까지 fallback UI를 보여줌 */}
    {/* lazy로 로드되는 컴포넌트들을 감싸서 사용함 */}
    <Suspense fallback={<div>Loading...</div>}>
      {/* Routes는 여러 Route 컴포넌트를 그룹화하고, 현재 URL에 맞는 첫 번째 Route를 렌더링함 */}
      <Routes>
        {/* 루트 경로 ("/")에 Home 컴포넌트를 매칭함 */}
        <Route path="/" element={<Home />} />
        {/* "/about" 경로에 About 컴포넌트를 매칭함 */}
        <Route path="/about" element={<About />} />
        {/* "/profile" 경로에 Profile 컴포넌트를 매칭함 */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;