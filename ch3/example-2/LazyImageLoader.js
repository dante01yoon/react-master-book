class LazyImageLoader extends HTMLElement {
  constructor() {
    super();
    this._image = document.createElement('img');
    this._image.style.opacity = '0';
    this._image.style.filter = 'blur(10px)';
    this._image.style.transition = 'opacity 1s ease-in-out';
    this._spinner = document.createElement('span');
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

  getObserver() {
    return this.observer;
  }

  connectedCallback() {
    this.appendChild(this._spinner);
    this.appendChild(this._image);
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
