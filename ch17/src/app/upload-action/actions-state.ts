import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { revalidatePath } from 'next/cache';

/**
 * useActionState 사용을 위한 이미지 업로드 서버 액션
 * @param currentState - 이전에 호출된 액션에서 반환된 값
 * @param formData - <form> 요소에서 전달된 데이터
 */
export async function uploadImage(currentState: any, formData: FormData) {
  "use server";
  // <input type="file" name="file"> 로 전송된 파일 추출함
  const file = formData.get('file') as File | null;

  if (!file) {
    return {
      success: false,
      filename: '',
      path: '',
      error: {
        message: '업로드할 파일이 없습니다.',
      },
    };
  }

  // 파일 크기 체크 2mb 이상 업로드 불가
  if (file.size >= 2 * 1024 * 1024) {
    return {
      success: false,
      filename: '',
      path: '',
      error: {
        message: '파일 크기가 너무 큽니다.',
      },
    };
  }

  // File → Buffer 변환
  const buffer = Buffer.from(await file.arrayBuffer());

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // 업로드 디렉터리 (/public/uploads) 보장
  const uploadDir = join(process.cwd(), 
    process.env.NODE_ENV === 'production' 
      ? '.next/static/media' 
      : 'public/uploads'
    );
  await mkdir(uploadDir, { recursive: true });

  // 동일 파일명 충돌 방지를 위해 타임스탬프 접두사 추가
  const uniqueFilename = `${Date.now()}-${file.name}`;
  const filePath = join(uploadDir, uniqueFilename);

  // 파일 저장
  await writeFile(filePath, buffer);

  // 페이지 리렌더링을 위해 캐시 무효화
  revalidatePath('/upload-action');

  // 성공 응답 반환
  return {
    success: true,
    filename: uniqueFilename,
    path: `/uploads/${uniqueFilename}`,
    error: null,
  };
} 