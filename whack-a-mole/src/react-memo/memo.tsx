// 두번째 인자인 arePropsEqual() 비교 함수는 선택인자
// React.memo(Component, arePropsEqual?) 

import React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"

// shadcn 스타일의 BreadcrumbSeparator 컴포넌트 (React.memo 적용)
const BreadcrumbSeparator = React.memo(() => {
  // 브레드크럼 구분자 역할을 하는 컴포넌트
  return (
    <li role="presentation" aria-hidden="true" className="flex items-center px-1 text-muted-foreground">
      <ChevronRight className="size-3.5" />
    </li>
  )
})

// shadcn 스타일의 BreadcrumbEllipsis 컴포넌트 (중간 생략 표시)
const BreadcrumbEllipsis = React.memo(() => {
  // 경로가 길 때 중간 생략을 표시하는 컴포넌트
  return (
    <li role="presentation" aria-hidden="true" className="flex h-9 w-9 items-center justify-center">
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
      <BreadcrumbSeparator />
    </li>
  )
})

const BreadcrumbPage = ({ paths, maxItems = 4 }: { paths: string[]; maxItems?: number }) => {
  // 경로가 maxItems보다 많으면 중간을 ...으로 생략함
  const shouldEllipsis = paths.length > maxItems
  const first = paths[0]
  const last = paths[paths.length - 1]
  const middle = shouldEllipsis ? paths.slice(-2, -1) : paths.slice(1, -1)

  return (
    <nav aria-label="breadcrumb" className="w-full py-4">
      <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
        {/* 첫 번째 경로 */}
        <li className="inline-flex items-center gap-1.5">
          <a className="transition-colors hover:text-foreground cursor-pointer">{first}</a>
        </li>
        {/* 구분자 */}
        {paths.length > 1 && <BreadcrumbSeparator />}
        {/* 중간 경로 (생략 처리) */}
        {shouldEllipsis ? (
          <>
            <BreadcrumbEllipsis />
            <li className="inline-flex items-center gap-1.5">
              <a className="transition-colors hover:text-foreground cursor-pointer">{middle[0]}</a>
            </li>
            <BreadcrumbSeparator />
          </>
        ) : (
          paths.slice(1, -1).map((path, idx) => (
            <React.Fragment key={path}>
              <li className="inline-flex items-center gap-1.5">
                <a className="transition-colors hover:text-foreground cursor-pointer">{path}</a>
              </li>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))
        )}
        {/* 마지막 경로 (현재 페이지) */}
        <li className="font-normal text-foreground" aria-current="page">
          {last}
        </li>
      </ol>
    </nav>
  )
}

// 사용 예시 (실제 페이지에서 아래처럼 사용할 수 있음)
// <BreadcrumbPage paths={["Home", "...", "Components", "Breadcrumb"]} />

export { BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } 
