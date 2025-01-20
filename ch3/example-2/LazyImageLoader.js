class LazyImageLoader extends HTMLElement { // HTMLElement에서 제공하는 인터페이스를 사용하기 위해 상속했습니다.
  constructor() {
    super();
    this._image = document.createElement('img');
    this._image.style.opacity = '0';
    this._image.style.transition = 'opacity 1s ease-in-out';
    this._spinner = document.createElement('div');
    this._spinner.className = 'loader';
    this._spinner.style.display = 'block';

    const indicatorColor = this.getAttribute('indicator-color'); // indicator-color 속성 값으로 전달되는 값을 가져옵니다.
    if (indicatorColor) {
      this._spinner.style.borderTopColor = indicatorColor;
    }
    this.applyBlur = this.hasAttribute('apply-blur'); // apply-blur 속성 값을 가지고 옵니다.

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      rootMargin: '0px 0px 200px 0px',
      threshold: 0,
    });
  }

  static get observedAttributes() { // attributeChangedCallback에서 참조할 수 있는 속성 값을 선언합니다.
    return ['border-radius'];
  }

  attributeChangedCallback(name, oldValue, newValue) { // 변경되는 속성 값을 관찰하고 있다가 UI 업데이트에 필요한 로직을 수행합니다.
    if (name === 'border-radius') {
      this._image.style.borderRadius = newValue;
    }
  }

  getObserver() {
    return this.observer;
  }

  connectedCallback() { // 커스텀 엘리먼트가 DOM에 추가될 때 실행됩니다.
    const shadowRoot = this.attachShadow({ mode: "closed" }); // 쉐도우 돔을 적용하고 외부 자바스크립트에서 쉐도우 돔 트리 내부에 있는 엘리먼트에 접근하지 못하게 합니다.
    const style = document.createElement('style');
    style.textContent = `
      .loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid blue;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    shadowRoot.appendChild(style); // 쉐도우 돔 트리에만 적용되어야 할 엘리먼트들을 주입합니다.
    shadowRoot.appendChild(this._spinner);
    shadowRoot.appendChild(this._image);
    this.observer.observe(this);
  }

  disconnectedCallback() { // 돔에서 엘리먼트가 삭제될 때 실행됩니다.
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
    const networkSpeed = this.getAttribute('data-network-speed'); // 속성 값으로 전달되는 네트워크 속도에 따라 이미지를 빠르게 혹은 느리게 다운로드 합니다.
    let delay = 0;
    if (networkSpeed === 'slow3g') {
      delay = 2000;
    } else if (networkSpeed === '2g') {
      delay = 5000;
    }

    if (this.applyBlur) {
      this.style.filter = 'blur(10px)';
    }

    setTimeout(() => {
      this._image.src = this.getAttribute('data-src');
      this._image.onload = () => {
        this._image.style.opacity = '1';
        this.style.filter = 'blur(0)';
        this._spinner.style.display = 'none';
      };
    }, delay); // delay만큼의 ms가 지난 후 
  }

  reset() { // 외부 스크립트에서도 쉐도우 돔 트리에 있는 엘리먼트의 스타일을 변경할 수 있게 메소드를 제공합니다.
    this._image.src = '';
    this._image.style.opacity = '0';
    this._image.style.display = 'block';
    this._spinner.style.display = 'block';
  }
}

customElements.define('lazy-image', LazyImageLoader);
