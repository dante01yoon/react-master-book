"use client";
import { useRef, useTransition } from "react";

/**
 * 이미지 업로드용 클라이언트 컴포넌트 버튼
 * 버튼 클릭 시 서버 액션(uploadImage)을 호출함
 */
export default function UploadTransition({ uploadAction }: { uploadAction: (formData: FormData) => Promise<any> }) {
  const [isPending, startTransition] = useTransition(); // 서버 액션 호출 중 표시
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;
    // 파일 선택 후 버튼 클릭 시 서버 액션 호출
    startTransition(async () => { 
      const formData = new FormData();
      formData.append('file', fileInputRef.current?.files?.[0] as File); // 파일 추가
      await uploadAction(formData); // 서버 액션 호출
    });
  };
  return (
    <div className="flex flex-col gap-4 border p-4 rounded">
      <div className="text-lg font-bold">useTransition 훅을 사용한 서버 액션</div>
      <div className="flex flex-col gap-2">
        <input ref={fileInputRef} type="file" name="file" accept="image/*" required />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? '업로드 중...' : '업로드'}
      </button>
    </div>
  );
}
