import React, { createContext, useContext, useEffect, useState } from 'react';

// 테마 타입 정의
type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple';

// 테마 컨텍스트 타입 정의
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 테마 사용을 위한 훅
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme은 ThemeProvider 내에서 사용되어야 합니다');
  }
  return context;
};

// 테마 프로바이더 프롭스 타입 정의
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

// 테마 프로바이더 컴포넌트
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light'
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 로컬 스토리지에서 테마 가져오기
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || defaultTheme;
  });

  useEffect(() => {
    // 테마를 로컬 스토리지에 저장
    localStorage.setItem('theme', theme);
    
    // 문서에 테마 클래스 적용
    const isDark = theme === 'dark';
    
    // 다크 모드 처리
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // 컬러 테마 처리
    document.documentElement.classList.remove('theme-blue', 'theme-green', 'theme-purple');
    if (theme !== 'light' && theme !== 'dark') {
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme]);
  
  // 라이트/다크 모드 전환
  const toggleDarkMode = () => {
    setTheme(prev => {
      // 컬러 테마에 있는 경우 다크로 전환
      if (prev !== 'light' && prev !== 'dark') {
        return 'dark';
      }
      // 아니면 라이트/다크 간 전환
      return prev === 'light' ? 'dark' : 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 