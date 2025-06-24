import { PrismaClient, Prisma } from '@prisma/client';

// Prisma 클라이언트 인스턴스를 생성합니다.
// 개발 환경에서는 globalThis에 저장하여 Hot Reload 시 새로운 인스턴스가 계속 생성되는 것을 방지합니다.
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;


/**
 * 특정 에피소드의 댓글 목록을 가져오는 서버 함수
 * @param episodeId - 에피소드 ID
 * @returns 댓글 목록 (작성자, 반응 포함)
 */
export async function getComments(episodeId: number) {
  return prisma.comment.findMany({
    where: { episodeId },
    include: {
      author: true, // 작성자 정보 포함
      reactions: {   // 반응 정보 포함
        include: {
          user: true // 반응을 남긴 사용자 정보 포함
        }
      },
    },
    orderBy: {
      createdAt: 'asc', // 오래된 순으로 정렬
    },
  });
}

// getComments 함수의 반환값 타입을 기반으로 FullComment 타입을 정의하고 export
type FullCommentPayload = Prisma.PromiseReturnType<typeof getComments>;
export type FullComment = FullCommentPayload[number];

/**
 * 댓글을 생성하는 서버 함수
 * @param episodeId - 에피소드 ID
 * @param authorId - 작성자 ID
 * @param content - 댓글 내용
 * @returns 생성된 댓글
 */
export async function createComment(episodeId: number, authorId: number, content: string) {
  return prisma.comment.create({
    data: {
      episodeId,
      authorId,
      content,
    },
  });
}

/**
 * 댓글에 반응을 추가하는 서버 함수
 * @param commentId - 댓글 ID
 * @param userId - 반응을 추가한 사용자 ID
 * @param emoji - 반응 이모지
 * @returns 생성된 반응
 */
export async function addReaction(commentId: number, userId: number, emoji: string) {
  return prisma.reaction.create({
    data: {
      commentId,
      userId,
      emoji,
    },
  });
}

/**
 * 테스트용 사용자를 가져오거나 생성하는 서버 함수
 * @returns 사용자 정보
 */
export async function getTestUser() {
  const user = await prisma.user.findFirst({
    where: { name: '테스트유저' },
  });

  if (user) {
    return user;
  }

  return prisma.user.create({
    data: {
      name: '테스트유저',
    },
  });
}

export default prisma; 