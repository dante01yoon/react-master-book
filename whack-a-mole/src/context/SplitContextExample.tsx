// contexts/SplitContextExample.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';

// --- 1. 단일 거대 컨텍스트 사용 시 ---
interface AppSettings {
  theme: string;
  notificationsEnabled: boolean;
  userPreferences: { fontSize: string };
}

const AppSettingsContext = createContext<AppSettings | undefined>(undefined);

const ThemeDisplay = () => {
  const settings = useContext(AppSettingsContext);
  console.log('ThemeDisplay 렌더링됨 (단일 컨텍스트)');
  return <p>현재 테마: {settings?.theme}</p>;
};

const NotificationToggle = () => {
  // 이 컴포넌트는 notificationsEnabled만 관심 있지만, AppSettingsContext 전체를 구독
  const settings = useContext(AppSettingsContext);
  console.log('NotificationToggle 렌더링됨 (단일 컨텍스트)');
  // 실제 상태 변경 로직은 편의상 생략
  return <p>알림 설정: {settings?.notificationsEnabled ? '켜짐' : '꺼짐'}</p>;
};

const MonolithicContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 모든 설정을 하나의 객체로 묶어 제공
  const settingsValue = useMemo(() => ({
    theme, // 테마 상태
    notificationsEnabled, // 알림 설정 상태
    userPreferences: { fontSize: 'medium' } // 이 값은 변경되지 않는다고 가정
  }), [theme, notificationsEnabled]);

  return (
    <AppSettingsContext value={settingsValue}>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>테마 변경</button>
      <button onClick={() => setNotificationsEnabled(n => !n)}>알림 설정 변경</button>
      {children}
    </AppSettingsContext>
  );
};


// --- 2. 관심사별로 분리된 컨텍스트 사용 시 ---
const ThemeContext = createContext<{ theme: string } | undefined>(undefined);
const NotificationsContext = createContext<{ notificationsEnabled: boolean } | undefined>(undefined);
// UserPreferencesContext 등 필요에 따라 추가 분리 가능

const SeparatedThemeDisplay = () => {
  const themeContext = useContext(ThemeContext);
  console.log('SeparatedThemeDisplay 렌더링됨 (분리된 컨텍스트)');
  return <p>현재 테마: {themeContext?.theme}</p>;
};

const SeparatedNotificationToggle = () => {
  const notificationsContext = useContext(NotificationsContext);
  console.log('SeparatedNotificationToggle 렌더링됨 (분리된 컨텍스트)');
  return <p>알림 설정: {notificationsContext?.notificationsEnabled ? '켜짐' : '꺼짐'}</p>;
};

const SeparatedContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 테마 관련 상태만 포함하는 컨텍스트 값
  // 단일 컨텍스트에서는 theme, notificationsEnabled 등 모든 상태가 하나의 객체에 포함됨
  const themeValue = useMemo(() => ({ theme }), [theme]);

  // 알림 설정 관련 상태만 포함하는 컨텍스트 값
  // 단일 컨텍스트에서는 이 값의 변경이 theme를 사용하는 컴포넌트까지 리렌더링 시킴
  const notificationsValue = useMemo(() => ({ notificationsEnabled }), [notificationsEnabled]);

  return (
    // ThemeContext.Provider는 theme 상태만 제공함
    // 따라서 theme 상태가 변경될 때만 이 컨텍스트를 구독하는 컴포넌트가 리렌더링됨
    <ThemeContext.Provider value={themeValue}>
      {/* NotificationsContext.Provider는 notificationsEnabled 상태만 제공함 */}
      {/* 이를 통해 notificationsEnabled 상태 변경이 ThemeContext를 사용하는 컴포넌트에 영향을 주지 않음 */}
      {/* 단일 컨텍스트를 사용했다면, 알림 설정 변경 시 테마 관련 컴포넌트도 불필요하게 리렌더링될 수 있음 */}
      <NotificationsContext.Provider value={notificationsValue}>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>테마 변경</button>
        <button onClick={() => setNotificationsEnabled(n => !n)}>알림 설정 변경</button>
        {children}
      </NotificationsContext.Provider>
    </ThemeContext.Provider>
  );
};


export const App = () => {
  return (
    <div>
      <h2>단일 거대 컨텍스트 예시</h2>
      <MonolithicContextProvider>
        {/* 단일 컨텍스트 사용 시 모든 컴포넌트가 리렌더링됨 */}
        <ThemeDisplay />
        <NotificationToggle />
      </MonolithicContextProvider>

      <hr style={{ margin: '20px 0' }} />

      <h2>분리된 컨텍스트 예시</h2>
      <SeparatedContextProvider>
        {/* 분리된 컨텍스트 사용 시 해당 컴포넌트만 리렌더링됨 */}
        <SeparatedThemeDisplay />
        <SeparatedNotificationToggle />
      </SeparatedContextProvider>
    </div>
  );
};

// 사용 예시:
// 위 App 컴포넌트를 렌더링하고 콘솔을 확인합니다.
// 단일 컨텍스트 예시에서 "알림 설정 변경" 버튼을 클릭하면,
// theme 값에는 변화가 없음에도 ThemeDisplay 컴포넌트가 리렌더링됩니다.
// 반면, 분리된 컨텍스트 예시에서 "알림 설정 변경" 버튼을 클릭하면,
// NotificationsContext만 변경되므로 SeparatedNotificationToggle만 리렌더링되고,
// SeparatedThemeDisplay는 리렌더링되지 않습니다.