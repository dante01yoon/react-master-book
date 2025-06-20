'use client';

/**
 * 클릭 이벤트에 반응하는 클라이언트 컴포넌트
 */
export default function InteractiveButton() {
  const handleClick = () => {
    alert('버튼이 클릭되었습니다!');
  };

  // onClick 핸들러는 사용자의 브라우저에서 실행되어야 하므로
  // 이 컴포넌트는 반드시 클라이언트 컴포넌트여야 함
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
    >
      클릭해보세요!
    </button>
  );
} 