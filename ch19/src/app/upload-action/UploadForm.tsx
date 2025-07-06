"use client";

// import { uploadImage } from './actions';

/**
 * 이미지 업로드용 클라이언트 컴포넌트 폼
 * 서버 액션(uploadImage)을 action 속성으로 받아 전송함
 */
function SubmitButton() {
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
    >
      업로드
    </button>
  );
}

export default function UploadForm({ uploadAction }: { uploadAction: (...args: any[]) => Promise<any> }) {
  return (
    <form
      action={uploadAction}
      // action={uploadImage as any /* 서버 액션 호출을 위해 업로드 함수 전달 */}
      // encType="multipart/form-data" /* multipart/form-data 지정할 필요 없음 */
      className="flex flex-col gap-4 border p-4 rounded"
    >
      <div className="text-lg font-bold">폼을 사용한 서버 액션</div>
      {/* 파일 입력 필드 */}
      <div className="flex flex-col gap-2">
        <input type="file" name="file" accept="image/*" required />
      </div>
      {/* 전송 버튼 */}
      <SubmitButton />
    </form>
  );
} 