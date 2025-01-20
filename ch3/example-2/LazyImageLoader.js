class LazyImageLoader extends HTMLElement {
  constructor() {
    super();
    this._image = document.createElement('img');
    this._image.style.opacity = '0';
    this._image.style.transition = 'opacity 1s ease-in-out';
    this._spinner = document.createElement('div');
    this._spinner.className = 'loader';
    this._spinner.style.display = 'block';

    const indicatorColor = this.getAttribute('indicator-color');
    if (indicatorColor) {
      this._spinner.style.borderTopColor = indicatorColor;
    }
    this.applyBlur = this.hasAttribute('apply-blur');

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      rootMargin: '0px 0px 200px 0px',
      threshold: 0,
    });
  }

  static get observedAttributes() {
    return ['border-radius'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'border-radius') {
      this._image.style.borderRadius = newValue;
    }
  }

  getObserver() {
    return this.observer;
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });
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
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(this._spinner);
    shadowRoot.appendChild(this._image);
    this.observer.observe(this);
  }

  disconnectedCallback() {
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
      this.style.filter = 'blur(10px)';
    }

    setTimeout(() => {
      this._image.src = this.getAttribute('data-src');
      this._image.onload = () => {
        this._image.style.opacity = '1';
        this.style.filter = 'blur(0)';
      };
    }, delay);
  }

  reset() {
    this._image.src = '';
    this._image.style.opacity = '0';
    this._image.style.display = 'block';
  }
}

customElements.define('lazy-image', LazyImageLoader);
