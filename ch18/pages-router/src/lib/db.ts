// src/lib/db.ts

// ➊ 이 콘솔 로그는 이 모듈이 로드될 때 서버 환경에서만 출력되어야 함
console.log('[DB_MODULE] db.ts 모듈 로드됨 (서버 환경 실행 확인용)');

export interface UserDto {
  id: number;
  name: string;
  // lastLogin은 Date 객체 또는 직렬화된 문자열 형태를 가질 수 있음
  lastLogin: Date | string; 
}

// ➋ 더미 사용자 데이터. lastLogin은 Date 객체로 초기화함
const mockUsers: UserDto[] = [
  { id: 1, name: 'Alice', lastLogin: new Date('2023-01-01T10:00:00Z') },
  { id: 2, name: 'Bob', lastLogin: new Date('2023-01-02T11:30:00Z') },
  { id: 3, name: 'Charlie', lastLogin: new Date('2023-01-03T15:45:00Z') },
];

// ➌ 데이터베이스 연결 및 조회 로직 모방 객체
const mockDb = {
  collection: (collectionName: string) => ({ // 컬렉션 이름을 받을 수 있도록 함 (예시)
    /**
     * ID를 기준으로 사용자를 조회하는 함수 모방.
     * @param query 조회할 사용자의 ID를 포함한 객체
     * @returns Promise<UserDto | undefined> 조회된 사용자 객체 또는 undefined
     */
    findOne: async (query: { id: number }): Promise<UserDto | undefined> => {
      console.log(`[DB] '${collectionName}' 컬렉션에서 ID '${query.id}' 조회 시도...`);
      // 실제 DB 조회 시 발생할 수 있는 지연 시간 모방
      await new Promise(resolve => setTimeout(resolve, 100)); 
      const user = mockUsers.find(u => u.id === query.id);
      if (user) {
        console.log(`[DB] 사용자 조회 성공: ${user.name}`);
      } else {
        console.log(`[DB] ID '${query.id}'에 해당하는 사용자 없음`);
      }
      return user;
    },
  }),
};

/**
 * ➍ 데이터베이스 연결 과정을 모방하는 비동기 함수.
 * @returns Promise<typeof mockDb> 데이터베이스 작업을 수행할 수 있는 객체
 */
export const connectToDatabase = async (): Promise<typeof mockDb> => {
  console.log('[DB_CONNECT] 데이터베이스 연결 시도 중...');
  // 실제 DB 연결 시 발생할 수 있는 지연 시간 모방
  await new Promise(resolve => setTimeout(resolve, 500)); 
  console.log('[DB_CONNECT] 데이터베이스 연결 완료.');
  return mockDb;
}; 