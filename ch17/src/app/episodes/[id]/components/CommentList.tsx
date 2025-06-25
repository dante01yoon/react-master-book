'use client';

import { useOptimistic, useRef, useTransition } from 'react';
// import type { Comment, User, Reaction } from '@prisma/client'; // 타입 임포트 제거
import { type FullComment } from '@/lib/db';
import { createCommentAction, addReactionAction } from '@/app/episodes/actions';

// 필요한 타입을 컴포넌트 내에 직접 정의
interface User {
  id: number;
  name: string;
}
interface Reaction {
  id: number;
  emoji: string;
  userId: number;
  commentId: number;
  user: User;
}
type FullComment = {
  id: number;
  content: string;
  createdAt: Date;
  authorId: number;
  episodeId: number;
  author: User;
  reactions: Reaction[];
};

// 컴포넌트 Props 타입
interface CommentListProps {
  comments: FullComment[];
  episodeId: number;
}

export default function CommentList({ comments, episodeId }: CommentListProps) {
  const [isPending, startTransition] = useTransition();

  // 1. useOptimistic 훅으로 댓글 목록의 낙관적 업데이트를 설정
  const [optimisticComments, addOptimisticComment] = useOptimistic<FullComment[], FullComment>(
    comments,
    (state, newComment) => [...state, newComment]
  );

  // 폼 제출 핸들러
  async function handleCreateComment(formData: FormData) {
    const content = formData.get('content') as string;
    if (!content) return;

    // 2. 임시 댓글 객체를 만들어 낙관적 UI를 먼저 업데이트
    addOptimisticComment({
      id: Math.random(), // 임시 ID
      content,
      createdAt: new Date(),
      authorId: 0, // 임시 작성자 ID
      episodeId,
      author: { id: 0, name: '나' }, // 임시 작성자 정보
      reactions: [],
    });

    // 3. 서버 액션을 호출
    await createCommentAction(formData);
  }

  // 반응 추가 핸들러
  function handleAddReaction(commentId: number, emoji: string) {
    startTransition(async () => {
      // 낙관적 업데이트를 여기서도 적용할 수 있으나, 설명을 위해 서버 액션 직접 호출
      await addReactionAction(commentId, episodeId, emoji);
    });
  }

  return (
    <div>
      {/* 댓글 목록 */}
      <ul className="space-y-4">
        {optimisticComments.map((comment) => (
          <li key={comment.id} className="p-4 border rounded-md">
            <p>{comment.content}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">- {comment.author.name}</span>
              <div className="flex items-center space-x-2">
                {/* 반응 버튼 */}
                <button onClick={() => handleAddReaction(comment.id, '👍')} disabled={isPending}>
                  <span className="text-sm mr-1">👍</span>
                  <span className="text-sm">{comment.reactions.filter((r: FullComment['reactions'][number]) => r.emoji === '👍').length}</span>
                </button>
                <button onClick={() => handleAddReaction(comment.id, '❤️')} disabled={isPending}>
                  <span className="text-sm mr-1">❤️</span>
                  <span className="text-sm">{comment.reactions.filter((r: FullComment['reactions'][number]) => r.emoji === '❤️').length}</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 댓글 입력 폼 */}
      <form action={handleCreateComment} className="mt-6">
        <input type="hidden" name="episodeId" value={episodeId} />
        <textarea
          name="content"
          className="w-full p-2 border rounded-md"
          placeholder="댓글을 입력하세요..."
          required
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          댓글 작성
        </button>
      </form>
    </div>
  );
} 