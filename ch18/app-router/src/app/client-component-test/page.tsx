import InteractiveButton from "@/components/InteractiveButton";

/**
 * 서버 컴포넌트가 클라이언트 컴포넌트를 사용하는 예제 페이지
 */
export default function ClientComponentTestPage() {
  return (
    <main className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">클라이언트 컴포넌트 테스트</h1>
      <p className="mb-8">이 버튼은 클라이언트 컴포넌트입니다.</p>

      {/* 서버 컴포넌트 내에서 클라이언트 컴포넌트를 렌더링 */}
      <InteractiveButton />
    </main>
  );
} 