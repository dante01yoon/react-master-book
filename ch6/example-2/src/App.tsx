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
