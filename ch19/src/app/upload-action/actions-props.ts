import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { revalidatePath } from 'next/cache';

/**
 * 이미지 업로드 서버 액션
 * FormData로 전달받은 이미지 파일을 /public/uploads 경로에 저장함
 * 저장 후 업로드 페이지 캐시를 무효화해 최신 목록을 표시함
 * @param formData - <form> 요소에서 전달된 데이터
 */
export async function uploadImage(formData: FormData) {
  "use server";
  // <input type="file" name="file"> 로 전송된 파일 추출함
  const file = formData.get('file') as File | null;

  if (!file) {
    throw new Error('업로드할 파일이 없습니다.');
  }

  // File → Buffer 변환
  const buffer = Buffer.from(await file.arrayBuffer());

  await new Promise((resolve) => setTimeout(resolve, 1000));

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

  // 클라이언트에서 사용 가능한 경로 반환 (선택)
  return {
    success: true,
    filename: uniqueFilename,
    path: `/uploads/${uniqueFilename}`,
  };
} 