import { marked } from 'marked'; // 35.9K (11.2K gzipped)
import sanitizeHtml from 'sanitize-html'; // 206K (63.3K gzipped)

/**
 * 마크다운 렌더링 페이지 (서버 컴포넌트)
 * - marked: 마크다운을 HTML로 변환 (서버에서만 사용)
 * - sanitize-html: XSS 공격을 방지하기 위해 HTML을 정제 (서버에서만 사용)
 */
export default async function MarkdownPage() {
  const markdownContent = `
# 안녕하세요, 마크다운!

이것은 서버 컴포넌트에서 렌더링된 마크다운 예제입니다.

- 리스트 아이템 1
- 리스트 아이템 2

**볼드체 텍스트**와 *이탤릭체 텍스트*를 포함합니다.

\`\`\`javascript
// 코드 블록 예제
console.log('Hello, Server Component!');
\`\`\`

<script>alert('XSS 공격 시도!');</script>
`;

  // 서버에서 마크다운을 HTML로 변환
  const unsafeHtml = await marked.parse(markdownContent);

  // 서버에서 잠재적인 악성 스크립트를 제거
  const safeHtml = sanitizeHtml(unsafeHtml);

  // 3. 최종적으로 안전한 HTML을 렌더링
  // 클라이언트는 'marked', 'sanitize-html' 라이브러리 코드를 받지 않고,
  // 아래 dangerouslySetInnerHTML에 들어가는 HTML 문자열만 받게 됨
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        서버 컴포넌트 번들 사이즈 최적화 예제
      </h1>
      <div className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
      </div>
    </main>
  );
} 