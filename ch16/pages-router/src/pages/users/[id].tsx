import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { connectToDatabase, UserDto } from '@/lib/db'; // @는 src 폴더를 가리키는 alias

interface UserDetailPageProps {
  // user는 UserDto 타입이거나, 사용자를 찾지 못한 경우 undefined일 수 있음
  user?: UserDto;
  // 데이터 페칭 중 에러 발생 시 에러 메시지
  error?: string; 
}

// ➊ 사용자 상세 정보를 표시하는 페이지 컴포넌트
const UserDetailPage: NextPage<UserDetailPageProps> = ({ user, error }) => {
  // 번들 분석 실험용 코드
  // 다음 줄의 주석을 해제하면 클라이언트 번들에 DB 코드가 포함됨을 확인할 수 있음
  // const db = connectToDatabase();
  // console.log('[CLIENT] connectToDatabase 호출:', db);

  // getServerSideProps에서 에러가 발생하여 error prop이 전달된 경우
  if (error) {
    return (
      <>
        <Head>
          <title>Error</title>
        </Head>
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>데이터 로딩 오류</h1>
          <p>{error}</p>
        </div>
      </>
    );
  }

  // 사용자를 찾지 못한 경우 (getServerSideProps에서 notFound: true가 반환되면 이 컴포넌트는 렌더링되지 않음)
  // 하지만, 타입 안정성 및 예외 상황을 위해 방어 코드 추가
  if (!user) {
    return (
      <>
        <Head>
          <title>사용자 없음</title>
        </Head>
        <div style={{ padding: '20px' }}>
          <h1>사용자 정보를 찾을 수 없습니다.</h1>
        </div>
      </>
    );
  }

  // 정상적으로 사용자 정보를 받은 경우
  return (
    <>
      <Head>
        {/* 브라우저 탭 제목을 동적으로 설정 */}
        <title>{user.name}님의 프로필</title>
        <meta name="description" content={`${user.name}님의 상세 정보 페이지`} />
      </Head>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>사용자 상세 정보</h1>
        <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>이름:</strong> {user.name}</p>
          {
            /* lastLogin이 Date 객체인 경우 toLocaleString을 사용하고, 
               문자열인 경우 new Date()로 변환 후 사용 */
          }
          <p>
            <strong>마지막 로그인:</strong> {
              user.lastLogin instanceof Date
                ? user.lastLogin.toLocaleString('ko-KR')
                : new Date(user.lastLogin).toLocaleString('ko-KR')
            }
          </p>
        </div>
        
        {/* 번들 분석 안내 */}
        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>🔍 번들 분석 실험 가이드</h3>
          <p>1. <code>pnpm build:analyze</code> 명령어로 번들을 분석해보세요.</p>
          <p>2. 현재 상태에서는 DB 코드가 클라이언트 번들에 포함되지 않습니다.</p>
          <p>3. 컴포넌트 상단의 주석을 해제하고 다시 분석하면 DB 코드가 포함됩니다.</p>
        </div>
      </div>
    </>
  );
};

// ➋ 페이지 요청 시 서버 측에서 실행되는 함수
export const getServerSideProps: GetServerSideProps<UserDetailPageProps> = async (context) => {
  // context.params에서 동적 경로 세그먼트 [id] 값을 가져옴 (예: /users/1 -> id는 "1")
  const idFromQuery = context.params?.id as string;
  let numericId: number;

  // ➌ ID 유효성 검사: ID가 숫자인지 확인
  if (idFromQuery && !isNaN(parseInt(idFromQuery))) {
    numericId = parseInt(idFromQuery);
  } else {
    console.log(`[SSR_USER_PAGE] 유효하지 않은 ID 수신: ${idFromQuery}`);
    // 유효하지 않은 ID인 경우, 404 페이지를 표시
    return { notFound: true }; 
  }

  try {
    // ➍ 데이터베이스 연결 및 사용자 정보 조회
    const db = await connectToDatabase();
    // 'users'는 예시 컬렉션 이름
    const userFromDb = await db.collection('users').findOne({ id: numericId }); 

    // ➎ 사용자를 찾지 못한 경우, 404 페이지를 표시
    if (!userFromDb) {
      console.log(`[SSR_USER_PAGE] ID '${numericId}'에 해당하는 사용자 없음`);
      return { notFound: true };
    }

    console.log(`[SSR_USER_PAGE] 사용자 조회 성공: ID - ${numericId}, 이름 - ${userFromDb.name}`);

    // ➏ props로 전달될 객체는 JSON으로 직렬화 가능해야 함
    // Date 객체는 문자열로 변환하여 전달 (예: ISO 문자열)
    const serializableUser = {
      ...userFromDb,
      // lastLogin이 Date 객체인 경우 ISO 문자열로 변환, 이미 문자열이면 그대로 사용
      lastLogin: userFromDb.lastLogin instanceof Date 
                   ? userFromDb.lastLogin.toISOString() 
                   : userFromDb.lastLogin,
    };

    return {
      props: { user: serializableUser as UserDto }, // 타입 단언을 사용하여 전달
    };
  } catch (e) {
    // 데이터베이스 연결 또는 조회 중 에러 발생 시 처리
    const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류 발생';
    console.error(`[SSR_USER_PAGE] ID '${numericId}' 조회 중 서버 에러:`, errorMessage);
    // 에러 정보를 props로 전달하여 페이지 컴포넌트에서 표시하도록 함
    return { props: { error: `사용자 정보를 불러오는 중 문제가 발생했습니다: ${errorMessage}` } };
  }
};

export default UserDetailPage; 
