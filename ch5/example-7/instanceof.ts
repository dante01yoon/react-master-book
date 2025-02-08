// 커스텀 에러 클래스들 정의
class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
    }
}

class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

// 에러가 발생할 수 있는 함수
function processUserData(id: string): void {
    try {
        // 임의로 에러 발생시키기
        const random = Math.random();
        
        if (random < 0.33) {
            throw new DatabaseError('데이터베이스 연결 실패');
        } else if (random < 0.66) {
            throw new ValidationError('잘못된 사용자 ID 형식');
        } else {
            throw new Error('알 수 없는 에러 발생');
        }
    } catch (error) {
        // instanceof를 사용하여 에러 타입 체크
        if (error instanceof DatabaseError) {
            console.log('데이터베이스 에러 처리:', error.message);
            // 데이터베이스 관련 복구 로직
        } else if (error instanceof ValidationError) {
            console.log('유효성 검사 에러 처리:', error.message);
            // 유효성 검사 관련 처리 로직
        } else if (error instanceof Error) {
            console.log('일반 에러 처리:', error.message);
            // 기본 에러 처리 로직
        } else {
            console.log('알 수 없는 타입의 에러:', error);
        }
    }
}

// 함수 테스트
console.log('첫 번째 시도:');
processUserData('user123');

console.log('\n두 번째 시도:');
processUserData('user456');

console.log('\n세 번째 시도:');
processUserData('user789');
