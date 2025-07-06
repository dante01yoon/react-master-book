import { PrismaClient } from '@prisma/client';

// PrismaClient를 개발 환경에서 global 객체에 연결해
// 데이터베이스 연결 제한이 소진되는 것을 방지함
// 참고: https://pris.ly/d/help/next-js-best-practices

const prismaClientSingleton = () => {
  // 실제 프로덕션에서는 Prisma 쿼리를 확인하기 위해 아래 코드를 제거하는 것이 좋음
  return new PrismaClient({ log: ['query'] });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 