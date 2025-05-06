import Tabs from './Tabs'; // 위에서 작성한 Tabs 컴포넌트 임포트

export default function TabExamplePage() {
  return (
    <div>
      <Tabs defaultValue="tab1">
        {/* 탭 버튼 목록 */}
        <Tabs.TabList aria-label="샘플 탭">
          {/* 각 탭 버튼, id는 TabPanel의 id와 일치해야 함 */}
          <Tabs.Tab id="tab1">탭 1</Tabs.Tab>
          <Tabs.Tab id="tab2">탭 2</Tabs.Tab>
          <Tabs.Tab id="tab3">탭 3</Tabs.Tab>
        </Tabs.TabList>

        {/* 탭 패널 내용 */}
        <Tabs.TabPanels>
          {/* 각 탭 패널, id는 Tab의 id와 일치해야 함 */}
          <Tabs.TabPanel id="tab1">
            <p>탭 1의 내용입니다.</p>
          </Tabs.TabPanel>
          <Tabs.TabPanel id="tab2">
            <p>탭 2의 내용입니다. 다른 내용을 포함할 수 있음.</p>
            <ul>
              <li>항목 1</li>
              <li>항목 2</li>
            </ul>
          </Tabs.TabPanel>
          <Tabs.TabPanel id="tab3">
            <p>탭 3의 내용입니다. 이미지를 넣을 수도 있음.</p>
            {/* <img src="/path/to/image.jpg" alt="샘플 이미지" /> */}
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>

      <style jsx global>{`
        [role='tablist'] {
          border-bottom: 1px solid #ccc;
          margin-bottom: 10px;
          padding-left: 0; /* 기본 ul/ol 스타일 제거 */
        }
        [role='tab'] {
          padding: 8px 16px;
          border: 1px solid transparent;
          border-bottom: none;
          margin-right: 2px;
          cursor: pointer;
          background-color: #f0f0f0;
          border-radius: 4px 4px 0 0; /* 상단 모서리 둥글게 */
        }
        [role='tab'][aria-selected='true'] {
          border-color: #ccc;
          border-bottom: 1px solid white; /* 활성 탭 하단 테두리 제거 효과 */
          background-color: white;
          font-weight: bold;
          position: relative;
          bottom: -1px; /* 아래 테두리와 겹치도록 조정 */
        }
        [role='tabpanel'] {
          padding: 10px;
          border: 1px solid #ccc;
          border-top: none; /* TabList 경계선과 중복 제거 */
          border-radius: 0 0 4px 4px; /* 하단 모서리 둥글게 */
        }
        [role='tabpanel'][hidden] {
          display: none;
        }
      `}</style>
    </div>
  );
} 