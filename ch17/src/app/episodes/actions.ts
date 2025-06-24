'use server';

import { revalidateTag } from 'next/cache';
import { createComment, addReaction, getTestUser } from '@/lib/db';

/**
 * 댓글 생성 서버 액션
 * @param formData - <form> 요소에서 전달된 데이터
 */
export async function createCommentAction(formData: FormData) {
  const content = formData.get('content') as string;
  const episodeId = Number(formData.get('episodeId'));

  if (!content || !episodeId) {
    throw new Error('댓글 내용과 에피소드 ID는 필수입니다.');
  }

  try {
    const user = await getTestUser();
    // 서버 함수 호출
    await createComment(episodeId, user.id, content);
    // 데이터 변경 후 'comments' 태그를 가진 캐시를 무효화하여 화면을 갱신
    revalidateTag(`comments:${episodeId}`);
  } catch (error) {
    console.error('댓글 생성 실패:', error);
    // 실제 프로덕션에서는 보다 정교한 에러 처리가 필요
    throw new Error('댓글을 생성하는 데 실패했습니다.');
  }
}

/**
 * 반응 추가 서버 액션
 * @param commentId - 반응을 추가할 댓글의 ID
 * @param emoji - 추가할 이모지
 */
export async function addReactionAction(commentId: number, episodeId: number, emoji: string) {
  if (!commentId || !emoji || !episodeId) {
    throw new Error('댓글 ID, 에피소드 ID, 이모지는 필수입니다.');
  }

  try {
    const user = await getTestUser();
    // 서버 함수 호출
    await addReaction(commentId, user.id, emoji);
    // 데이터 변경 후 'comments' 태그를 가진 캐시를 무효화하여 화면을 갱신
    revalidateTag(`comments:${episodeId}`);
  } catch (error) {
    console.error('반응 추가 실패:', error);
    throw new Error('반응을 추가하는 데 실패했습니다.');
  }
} 