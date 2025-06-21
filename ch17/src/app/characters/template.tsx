"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";

/**
 * /characters 세그먼트와 그 하위 경로에 적용되는 템플릿
 * 페이지 이동 시마다 다시 마운트되어 상태가 초기화됨
 */
export default function CharactersTemplate({
  children,
}: {
  children: ReactNode;
}) {
  const [count, setCount] = useState(0);

  // 페이지 이동 시마다 이 로그가 콘솔에 찍힘
  useEffect(() => {
    console.log("✅ CharactersTemplate이 다시 마운트되었습니다.");
  }, []);

  return (
    <div className="p-4 my-4 border rounded-lg bg-amber-100 dark:bg-amber-900/30">
      <h2 className="text-lg font-bold">/characters/template.tsx</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        이 카운터 값은 캐릭터 페이지를 이동하면 0으로 초기화됩니다.
      </p>
      <div className="flex items-center gap-4 my-2">
        <button
          className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
          onClick={() => setCount((c) => c + 1)}
        >
          Template Increment
        </button>
        <p className="text-2xl font-mono">{count}</p>
      </div>
      <div className="mt-4 p-4 border-t border-gray-300 dark:border-gray-700">{children}</div>
    </div>
  );
} 