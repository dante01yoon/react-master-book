class StarRating extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Shadow DOM 활성화
    this._rating = 0;
    this._hover = 0;

    // Shadow DOM 내부에 스타일과 HTML 구조 정의
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-size: 30px;
          cursor: pointer;
        }
        .star {
          user-select: none;
          color: grey;
          display: inline-block;
          margin-right: 5px;
          transition: color 0.2s;
        }
        .star.filled {
          color: gold;
        }
        .star:hover,
        .star.hover {
          transform: scale(1.1);
        }
      </style>
      <div class="stars">
        ${[1, 2, 3, 4, 5].map(i => `<span class="star" data-value="${i}">★</span>`).join('')}
      </div>
    `;
  }

  // 관찰할 어트리뷰트 목록 정의
  static get observedAttributes() {
    return ['value'];
  }

  // 어트리뷰트 변경 시 호출될 콜백
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      const newRating = parseInt(newValue, 10) || 0;
      if (this._rating !== newRating) {
        this._rating = newRating;
        this._updateStars();
      }
    }
  }

  // 컴포넌트가 DOM에 추가될 때 호출
  connectedCallback() {
    this._stars = this.shadowRoot.querySelectorAll('.star');

    // 이벤트 리스너 추가
    this.shadowRoot.querySelector('.stars').addEventListener('click', (e) => {
      const star = e.target.closest('.star');
      if (star) {
        const newValue = parseInt(star.dataset.value, 10);
        if (this._rating !== newValue) {
          this.setAttribute('value', newValue.toString()); // 어트리뷰트 업데이트
          // 'change' 커스텀 이벤트 발생 (리액트에서 감지 가능)
          this.dispatchEvent(new CustomEvent('change', {
            bubbles: true, // 이벤트 버블링 활성화
            composed: true, // Shadow DOM 경계를 넘어 전파
            detail: { value: newValue } // 이벤트 데이터
          }));
        }
      }
    });

    this.shadowRoot.querySelector('.stars').addEventListener('mouseover', (e) => {
      const star = e.target.closest('.star');
      if (star) {
        this._hover = parseInt(star.dataset.value, 10);
        this._updateStars();
      }
    });

    this.shadowRoot.querySelector('.stars').addEventListener('mouseout', () => {
      this._hover = 0; // 호버 상태 초기화
      this._updateStars();
    });

    // 초기 별 상태 업데이트
    this._updateStars();
  }

  // 별 상태 업데이트 로직
  _updateStars() {
    if (!this._stars) return; // 아직 _stars가 설정되지 않았으면 종료
    const displayRating = this._hover || this._rating;
    this._stars.forEach(star => {
      const starValue = parseInt(star.dataset.value, 10);
      if (starValue <= displayRating) {
        star.classList.add('filled');
      } else {
        star.classList.remove('filled');
      }
      // 호버 효과 클래스 관리 (선택적)
      if (this._hover > 0 && starValue === this._hover) {
         star.classList.add('hover');
      } else {
         star.classList.remove('hover');
      }
    });
  }

  // JavaScript 프로퍼티로 value 접근/설정 가능하게 함
  get value() {
    return this._rating;
  }

  set value(newValue) {
    const newRating = parseInt(newValue, 10) || 0;
    if (this._rating !== newRating) {
      this.setAttribute('value', newRating.toString());
    }
  }
}

// 커스텀 엘리먼트 등록
customElements.define('star-rating', StarRating); 