import Image from 'next/image';
import { join } from 'path';
import { existsSync, readdirSync } from 'fs';
import UploadForm from './UploadForm';
import UploadTransition from './UploadTransition';
import { uploadImage } from './actions-props';
/**
 * 서버 액션을 활용한 이미지 업로드 예제 페이지
 * 라우트 핸들러(route.ts) 없이 파일 업로드 로직을 구현함
 */
export default async function UploadActionPage() {
  // 업로드된 파일 목록을 읽어 UI에 표시 (빌드 시점 캐시 X)
  const uploadDir = join(process.cwd(), 
    process.env.NODE_ENV === 'production' 
      ? '.next/static/media' 
      : 'public/uploads'
    );
  const images = existsSync(uploadDir) ? readdirSync(uploadDir) : [];
  const imagePrefix = process.env.NODE_ENV === 'production' 
    ? '/_next/static/media' 
    : '/uploads';

  return (
    <main className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">서버 액션 이미지 업로드</h1>

      {/* 업로드 폼 (클라이언트 컴포넌트) */}
      <UploadForm uploadAction={uploadImage} />
      <UploadTransition uploadAction={uploadImage} />

      {/* 업로드된 이미지 미리보기 */}
      {images.length > 0 ? (
        <section className="grid grid-cols-2 gap-4">
          {images.filter((filename) => /\.jpg|\.png|\.jpeg|\.gif|\.webp$/.test(filename)).map((filename) => (
            <div key={filename} className="relative h-48">
              <Image
                src={`${imagePrefix}/${filename}`}
                alt={filename}
                fill
                sizes="200px"
                className="object-cover rounded"
              />
            </div>
          ))} 
        </section>
      ) : (
        <p className="text-sm text-gray-500">업로드된 이미지가 없습니다.</p>
      )}
    </main>
  );
} 