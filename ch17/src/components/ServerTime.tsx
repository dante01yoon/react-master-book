/**
 * 현재 시간을 표시하는 서버 컴포넌트
 */
export default function ServerTime() {
  const timestamp = new Date().toLocaleString();
  // 이 로그는 빌드 시 또는 페이지 요청 시 서버(터미널)에 한 번만 출력됨
  console.log(`[서버 컴포넌트] ServerTime 렌더링됨: ${timestamp}`);

  return (
    <div className="mt-4 p-4 border-dashed border-2 border-gray-400 bg-gray-50">
      <h3 className="text-lg font-bold text-gray-700">여기는 서버 컴포넌트 영역</h3>
      <p>이 컴포넌트는 서버에서 단 한 번만 렌더링되고, 그 결과가 클라이언트로 전달됩니다.</p>
      <p className="text-blue-600 font-semibold mt-2">
        서버에서 렌더링된 시간: {timestamp}
      </p>
    </div>
  );
} 