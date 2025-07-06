// ➊ next/headers에서 headers, cookies 함수를 불러옴
import { headers, cookies } from 'next/headers';

export default async function Page({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  // ➋ headers() 함수는 동기적으로 호출하여 Headers 객체를 반환함
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');

  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');

  const { id } = await searchParams; // 쿼리 파라미터 추출

  return (
    <div>
      <h1>Dynamic Render</h1>
      <p>User Agent: {userAgent}</p>
      <p>Theme: {theme?.value}</p>
    </div>
  )
}