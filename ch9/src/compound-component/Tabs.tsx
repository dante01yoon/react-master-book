import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  Children,
  isValidElement,
  HTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  FC,
} from 'react';

interface TabsContextProps {
  activeTab: string | number;
  setActiveTab: (id: string | number) => void;
}

// 탭 상태 관리를 위한 컨텍스트 생성
const TabsContext = createContext<TabsContextProps | undefined>(undefined);

// 컨텍스트를 사용하기 위한 커스텀 훅
const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};

interface TabsProps {
  children: ReactNode;
  defaultValue: string | number; // 기본으로 활성화될 탭의 ID
}

// Tabs 루트 컴포넌트
const Tabs: FC<TabsProps> & {
  TabList: FC<TabListProps>;
  Tab: FC<TabProps>;
  TabPanels: FC<TabPanelsProps>;
  TabPanel: FC<TabPanelProps>;
} = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState<string | number>(defaultValue);

  // 컨텍스트 값 메모이제이션
  const contextValue = useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};

// --- TabList ---
interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// 탭 버튼들을 감싸는 컴포넌트
const TabList: FC<TabListProps> = ({ children, ...props }) => {
  return (
    <div role="tablist" {...props}>
      {children}
    </div>
  );
};

// --- Tab ---
interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  id: string | number; // 각 탭을 식별하는 고유 ID
}

// 개별 탭 버튼 컴포넌트
const Tab: FC<TabProps> = ({ children, id, ...props }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === id;

  // 탭 클릭 시 활성 탭 변경 핸들러
  const handleClick = useCallback(() => {
    setActiveTab(id);
  }, [id, setActiveTab]);

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`} // 연결된 패널 ID 명시
      tabIndex={isActive ? 0 : -1} // 활성 탭만 키보드 포커스 가능하도록 설정
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

// --- TabPanels ---
interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// 탭 패널들을 감싸는 컴포넌트
const TabPanels: FC<TabPanelsProps> = ({ children, ...props }) => {
  const { activeTab } = useTabs();

  // children을 순회하며 활성 탭에 해당하는 패널만 렌더링
  const activePanel = Children.toArray(children).find((child) => {
    return isValidElement(child) && child.props.id === activeTab;
  });

  return <div {...props}>{activePanel}</div>;
};

// --- TabPanel ---
interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  id: string | number; // 각 패널을 식별하는 고유 ID
}

// 개별 탭 패널 컴포넌트
const TabPanel: FC<TabPanelProps> = ({ children, id, ...props }) => {
  const { activeTab } = useTabs();
  const isActive = activeTab === id;

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`} // Tab에서 참조하는 ID
      aria-labelledby={`tab-${id}`} // 이 패널을 제어하는 탭 ID (Tab 컴포넌트에서 id 속성 설정 필요)
      hidden={!isActive} // 비활성 패널은 숨김 처리
      {...props}
    >
      {children}
    </div>
  );
};

// Tabs 컴포넌트에 하위 컴포넌트들을 정적 속성으로 할당
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

export default Tabs; 