import React, { useState } from 'react';
import './StarRating.css';

function StarRating() {
  // 현재 선택된 별점 상태를 저장함
  const [rating, setRating] = useState(0); 
  // 마우스가 올라간 별의 인덱스를 저장함 (호버 효과)
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div>
      {/* 접근성을 위한 레이블 */}
      <h2 id="rating-label">별점 컴포넌트 만들기</h2>
      {/* 라디오 그룹으로 별점을 묶고, 레이블을 참조함 */}
      <div className="stars" role="radiogroup" aria-labelledby="rating-label">
        {/* 1부터 5까지의 배열을 순회하여 별과 라디오 버튼을 생성함 */}
        {[1, 2, 3, 4, 5].map((index) => (
          <React.Fragment key={index}>
            {/* 숨겨진 라디오 버튼 */}
            <input
              id={`star${index}`}  // 각 라디오 버튼의 고유 ID. htmlFor와 연결됨
              type="radio"        // 라디오 버튼 타입
              name="rating"        // 라디오 버튼 그룹 이름
              value={index}       // 선택 시 rating 상태로 설정될 값
              checked={rating === index} // 현재 rating 상태와 일치 여부에 따라 체크됨
              onChange={() => setRating(index)} // 변경 시 rating 상태 업데이트
              className="star-radio" // CSS에서 숨기기 위한 클래스
            />
            {/* 별 모양을 표시하고 인터랙션을 처리하는 레이블 */}
            <label
              htmlFor={`star${index}`}  // 클릭 시 연결된 input 요소 제어
              // 호버 또는 선택된 상태에 따라 'filled' 또는 'empty' 클래스를 동적 적용함
              className={`star ${index <= (hover || rating) ? 'filled' : 'empty'}`}
              onMouseEnter={() => setHover(index)} // 마우스 진입 시 hover 상태 업데이트
              onMouseLeave={() => setHover(null)}  // 마우스 이탈 시 hover 상태 초기화
            >
              ★
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
export default StarRating; 