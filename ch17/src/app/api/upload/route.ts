import { NextResponse, type NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

/**
 * POST /api/upload
 * 클라이언트로부터 파일을 업로드받아 서버에 저장하는 API 예시
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: '업로드할 파일이 없습니다.' },
        { status: 400 }
      );
    }

    // 파일을 바이트 배열(Buffer)로 변환함
    const buffer = Buffer.from(await file.arrayBuffer());

    // --- 파일 저장 로직 ---
    // 파일을 저장할 디렉터리 경로를 설정함 ('/public/uploads')
    const uploadDir = join(process.cwd(), 'public/uploads');

    // 디렉터리가 존재하지 않으면 생성함
    await mkdir(uploadDir, { recursive: true });

    // 파일 이름 충돌을 방지하기 위해 타임스탬프를 파일명 앞에 추가함
    const uniqueFilename = `${Date.now()}-${file.name}`;
    const filePath = join(uploadDir, uniqueFilename);

    // 버퍼 데이터를 사용하여 서버의 파일 시스템에 파일을 씀
    await writeFile(filePath, buffer);

    // 성공 응답을 반환함
    return NextResponse.json({
      success: true,
      filename: uniqueFilename,
      size: file.size,
      // 클라이언트에서 이미지 등을 바로 확인할 수 있도록 public 경로를 함께 전달함
      path: `/uploads/${uniqueFilename}`,
    });
  } catch (error) {
    console.error('파일 업로드 오류:', error);
    return NextResponse.json(
      { error: '파일 업로드 중 서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}