import React, { 
  createContext, 
  useContext, 
  useState, 
  useMemo, 
  ReactNode, 
  FC, 
  ButtonHTMLAttributes,
  HTMLAttributes
} from 'react';

// 상태 공유를 위한 Context 생성
interface TabsContextProps {
  activeTab: string | number;
  setActiveTab: (id: string | number) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

// Context 사용을 위한 커스텀 훅
const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a Tabs component');
  }
  return context;
};

// --- 컴포넌트 정의 ---

// 개별 탭 버튼 (상태 소비자)
interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
}
const Tab: FC<TabProps> = ({ children, id, ...props }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === id;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(id)}
      {...props}
    >
      {children}
    </button>
  );
};

// 개별 탭 패널 (상태 소비자)
interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}
const TabPanel: FC<TabPanelProps> = ({ children, id, ...props }) => {
  const { activeTab } = useTabs();
  const isActive = activeTab === id;
  return (
    <div role="tabpanel" hidden={!isActive} {...props}>
      {children}
    </div>
  );
};

// 단순 컨테이너 역할의 컴포넌트들
const TabList: FC<{ children: ReactNode }> = ({ children }) => <div role="tablist">{children}</div>;
const TabPanels: FC<{ children: ReactNode }> = ({ children }) => <div>{children}</div>;

// 2. Tabs 루트 컴포넌트 (상태 제공자)
interface TabsProps {
  children: ReactNode;
  defaultValue: string | number;
}
type TabsComponent = FC<TabsProps> & {
  TabList: typeof TabList;
  Tab: typeof Tab;
  TabPanels: typeof TabPanels;
  TabPanel: typeof TabPanel;
};

const Tabs: TabsComponent = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState<string | number>(defaultValue);
  const contextValue = useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};

// 4. 하위 컴포넌트들을 정적 속성으로 할당 (API 설계)
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

export default Tabs;

const App = () => (
  <Tabs defaultValue="tab1">
    {/* 탭 버튼 목록 */}
    <Tabs.TabList aria-label="샘플 탭">
      <Tabs.Tab id="tab1">탭 1</Tabs.Tab>
      <Tabs.Tab id="tab2">탭 2</Tabs.Tab>
      <Tabs.Tab id="tab3">탭 3</Tabs.Tab>
    </Tabs.TabList>

    {/* 탭 패널 내용 */}
    <Tabs.TabPanels>
      <Tabs.TabPanel id="tab1">
        <p>탭 1의 내용입니다.</p>
      </Tabs.TabPanel>
      <Tabs.TabPanel id="tab2">
        <p>탭 2의 내용입니다. 다른 내용을 포함할 수 있습니다.</p>
      </Tabs.TabPanel>
      <Tabs.TabPanel id="tab3">
        <p>탭 3의 내용입니다. 이미지를 넣을 수도 있습니다.</p>
      </Tabs.TabPanel>
    </Tabs.TabPanels>
  </Tabs>
);