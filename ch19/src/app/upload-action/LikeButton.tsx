"use client";
import { ThumbsUp } from "lucide-react";
import { useActionState, startTransition } from "react";

// ms만큼 지연시키는 간단한 Promise 기반의 delay 함수
function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export default function LikeButton() {
  // useActionState 훅을 사용하여 상태(count), 액션(like), 펜딩 상태(pending)를 관리함
  const [count, like, pending] = useActionState(
    // 이 액션은 서버 액션이 아닌 클라이언트 측 비동기 함수임
    // 이전 상태(prev)를 받아 새로운 상태를 반환함
    async (prev: number) => {
      await delay(400); // 네트워크 요청 등 비동기 작업을 모방하기 위한 지연
      return prev + 1; // 이전 값에 1을 더한 값을 새로운 상태로 반환함
    },
    0 // count의 초기값
  );

  return (
    <button
      // 액션이 실행 중(pending)일 때 버튼을 비활성화함
      disabled={pending}
      // 클릭 시 startTransition으로 like 액션을 감싸서 호출함
      // 액션 실행 중에도 UI가 멈추지 않고 반응성을 유지하게 함
      onClick={() => startTransition(() => like())}
    >
      {/* pending 상태에 따라 버튼의 내용을 동적으로 변경함 */}
      <div className="flex items-center">
        <ThumbsUp className="w-4 h-4" />
        <span className="ml-2">{pending ? "로딩중..." : count}</span>
      </div>
    </button>
  );
}