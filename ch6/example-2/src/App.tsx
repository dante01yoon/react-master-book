import { useState, useEffect } from 'react'
import './App.css'
import ExpensiveList from './components/ExpensiveList'
import SearchFilter from './components/SearchFilter'
import Summary from './components/Summary'
import { onRender } from 'react-scan'

// DataItem 인터페이스 정의
interface DataItem {
  id: number
  name: string
  value: number
  category: string
}

export const EscapeSequenceExample = () => {
  // 자바스크립트 문자열에서의 이스케이프 시퀀스
  const jsString = "첫째줄\n둘째줄\n셋째줄";
  const jsTabString = "이름:\t김토끼";
  
  // HTML을 직접 설정하는 방법
  const htmlWithLineBreaks = {
    __html: "첫째줄<br/>둘째줄<br/>셋째줄"
  };
  
  return (
    <div className="example">
      <h2>이스케이프 시퀀스 예제</h2>
      
      {/* JSX 텍스트 노드에서의 이스케이프 시퀀스 */}
      <div className="escape-in-jsx">
        <h3>1. JSX 텍스트 노드에서의 이스케이프 시퀀스</h3>
        <p>다음 줄로 이동: 첫째줄\n둘째줄 (동작하지 않음)</p>
        <p>탭 문자: 이름:\t김토끼 (동작하지 않음)</p>
      </div>
      
      {/* 자바스크립트 변수에서의 이스케이프 시퀀스 */}
      <div className="escape-in-js-vars">
        <h3>2. 자바스크립트 변수에서의 이스케이프 시퀀스</h3>
        <pre>{jsString}</pre>
        <p>{jsTabString}</p>
        <p><strong>참고:</strong> 변수 내 이스케이프 시퀀스는 처리되지만, 브라우저에서 '\n'은 공백으로 표시됩니다.</p>
      </div>
      
      {/* 올바른 줄바꿈 처리 방법 */}
      <div className="proper-line-breaks">
        <h3>3. 줄바꿈을 올바르게 처리하는 방법</h3>
        
        {/* 방법 1: <br/> 태그 사용 */}
        <div className="using-br">
          <h4>방법 1: &lt;br/&gt; 태그 사용</h4>
          <p>첫째줄<br/>둘째줄<br/>셋째줄</p>
        </div>
        
        {/* 방법 2: CSS white-space 속성 사용 */}
        <div className="using-whitespace">
          <h4>방법 2: CSS white-space 속성 사용</h4>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{jsString}</pre>
        </div>
        
        {/* 방법 3: dangerouslySetInnerHTML 사용 (주의 필요) */}
        <div className="using-innerhtml">
          <h4>방법 3: dangerouslySetInnerHTML 사용 (주의 필요)</h4>
          <p dangerouslySetInnerHTML={htmlWithLineBreaks} />
          <p className="warning">⚠️ 주의: 사용자 입력을 이 방식으로 렌더링하면 XSS 공격에 취약해질 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};


function App() {
  const [data, setData] = useState<DataItem[]>([])
  const [filter, setFilter] = useState('')
  const [count, setCount] = useState(0)
  
  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    const generateData = () => {
      return Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `항목 ${i}`,
        value: Math.floor(Math.random() * 1000),
        category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
      }))
    }
    
    setData(generateData())
  }, [])
  
  // 불필요한 리렌더링을 유발하기 위해 1초마다 카운터 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  // 필터 변경 처리
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }
  
  // 데이터 필터링 - 매 렌더링마다 계산 발생
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.category.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="app">
      <EscapeSequenceExample/>
      <h1>데이터 대시보드 (카운터: {count})</h1>
      <div className="dashboard-container">
        <SearchFilter filter={filter} onFilterChange={handleFilterChange} />
        <div className="dashboard-layout">
          <ExpensiveList data={filteredData} />
          <Summary data={filteredData} />
        </div>
      </div>
    </div>
  )
}

export default App
