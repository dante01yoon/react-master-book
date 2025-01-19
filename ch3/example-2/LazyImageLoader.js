class LazyImageLoader extends HTMLElement {
  constructor() {
    super();
    this._image = document.createElement('img'); // img 엘리먼트를 생성합니다.
    this._image.style.opacity = '0'; // 레이지 로딩을 위한 스타일링 입니다.
    this._image.style.filter = 'blur(10px)';
    this._image.style.transition = 'opacity 1s ease-in-out';
    this._spinner = document.createElement('span');
    this._spinner.className = 'loader';
    this._spinner.style.display = 'block';

    const indicatorColor = this.getAttribute('indicator-color'); // 커스텀 엘리먼트로 전달되는 속성 값을 가져옵니다.
    if (indicatorColor) {
      this._spinner.style.borderTopColor = indicatorColor;
    }
    this.applyBlur = this.hasAttribute('apply-blur');

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), { // 커스텀 엘리먼트를 관찰할 인터섹션 옵져버 객체를 생성합니다.
      rootMargin: '0px 0px 200px 0px',
      threshold: 0,
    });
  }

  static get observedAttributes() { // 웹 컴포넌트에서 관찰해야 하는 엘리먼트 속성을 정의합니다.
    return ['border-radius'];
  }

  attributeChangedCallback(name, oldValue, newValue) { // 엘리먼트 속성이 변경되었을 때 실행되어야 할 로직을 작성합니다.
    if (name === 'border-radius') {
      this._image.style.borderRadius = newValue;
    }
  }

  getObserver() {
    return this.observer;
  }

  connectedCallback() { // 웹 컴포넌트의 라이프 사이클을 담당하는 메소드입니다.
    this.appendChild(this._spinner);
    this.appendChild(this._image);
    this.observer.observe(this);
  }

  disconnectedCallback() { // 웹 컴포넌트가 돔에서 없어질 때 실행될 클린업 메소드를 작성합니다.
    this.observer.unobserve(this);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage();
        this.observer.unobserve(this);
      }
    });
  }

  loadImage() {
    const networkSpeed = this.getAttribute('data-network-speed');
    let delay = 0;
    if (networkSpeed === 'slow3g') {
      delay = 2000;
    } else if (networkSpeed === '2g') {
      delay = 5000;
    }

    if (this.applyBlur) {
      this._image.style.filter = 'blur(10px)';
    }

    setTimeout(() => {
      this._image.src = this.getAttribute('data-src');
      this._image.onload = () => {
        this._image.style.opacity = '1';
        this._image.style.filter = 'blur(0)'; // Remove blur after loading
        this._spinner.style.display = 'none';
      };
    }, delay);
  }

  reset() {
    this._image.src = '';
    this._image.style.opacity = '0';
  }
}

customElements.define('lazy-image', LazyImageLoader);
