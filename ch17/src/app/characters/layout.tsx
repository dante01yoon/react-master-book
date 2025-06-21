"use client";

import { useState } from "react";
import type { ReactNode } from "react";

/**
 * /characters 세그먼트와 그 하위 경로에 적용되는 레이아웃
 * 페이지 이동 시에도 상태(state)를 그대로 유지함
 */
export default function CharactersLayout({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0); // 클라이언트 컴포넌트에서 상태 관리

  return (
    <>
      <div className="p-4 mb-4 border rounded-lg bg-slate-100 dark:bg-slate-800">
        <h2 className="text-lg font-bold">/characters/layout.tsx</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          이 카운터 값은 캐릭터 페이지를 이동해도 유지됩니다.
        </p>
        <div className="flex items-center gap-4 my-2">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setCount((c) => c + 1)}
          >
            Layout Increment
          </button>
          <p className="text-2xl font-mono">{count}</p>
        </div>
      </div>
      {children}
    </>
  );
} 