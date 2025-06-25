"use client";

import { useActionState } from "react";

// import { uploadImage } from './actions';

/**
 * 이미지 업로드용 클라이언트 컴포넌트 폼
 * 서버 액션(uploadImage)을 action 속성으로 받아 전송함
 */
function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? '업로드 중...' : '업로드'}
    </button>
  );
}

export default function UploadActionState({ uploadAction }: { uploadAction: (...args: any[]) => Promise<any> }) {
  // useActionState의 초기 상태를 정의함
  const initialState = {
    success: false,
    filename: '',
    path: '',
    error: null,
  };

  // 첫 번째 인수로 실행할 액션 함수(uploadAction), 두 번째 인수로 초기 상태(initialState)를 전달함
  // 반환값:
  // - state: 액션의 현재 상태. 액션이 실행되면 액션의 반환값으로 업데이트됨
  // - formAction: form의 action 속성에 전달할 함수. 이 함수가 호출되면 useActionState에 전달된 액션(uploadAction)이 실행됨
  // - isPending: 액션이 실행 중인지 여부를 나타내는 boolean 값
  const [state, formAction, isPending] = useActionState(
    uploadAction,
    initialState
  );

  return (
    // 폼의 action 속성에 useActionState가 반환한 formAction을 전달함
    <form
      action={formAction}
      className="flex flex-col gap-4 border p-4 rounded"
    >
      <div className="text-lg font-bold">useActionState() 사용한 서버 액션</div>
      {/* 파일 입력 필드 */}
      <div className="flex flex-col gap-2">
        <input type="file" name="file" accept="image/*" required />
      </div>
      {/* isPending 상태를 SubmitButton에 전달하여 로딩 상태를 표시함 */}
      <SubmitButton isPending={isPending} />
      {/* state 객체를 사용하여 액션의 결과(성공 또는 실패)를 UI에 표시함 */}
      {state?.success && <div className="text-green-500">업로드 성공: {state.filename}</div>}
      {state?.error && <div className="text-red-500">업로드 실패: {state.error.message}</div>}
    </form>
  );
} 