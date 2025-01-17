export class LazyImageLoader {
    #loadingStates;

    constructor(options = {}) {
        this.options = {
            root: null,
            rootMargin: '50px 0px',
            threshold: 0.1,
            blurEffect: options.blurEffect || false,
            loadingIndicator: options.loadingIndicator || false,
            blurAmount: options.blurAmount || '5px',
            loadingSpinnerColor: options.loadingSpinnerColor || 'green',
            ...options
        };

        this.observer = new IntersectionObserver(
            this.#handleIntersection.bind(this),
            {
                root: this.options.root,
                rootMargin: this.options.rootMargin,
                threshold: this.options.threshold
            }
        );

        this.#loadingStates = new WeakMap();
    }

    observe(selector) {
        const images = document.querySelectorAll(selector);
        images.forEach(img => this.#setupImage(img));
    }

    #setupImage(img) {
        if (img.dataset.lazyLoaderInitialized) return;

        img.dataset.lazyLoaderInitialized = 'true';
        const originalSrc = img.src;
        img.dataset.src = originalSrc;

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        img.style.transition = 'filter 0.3s ease-out';

        if (this.options.blurEffect) {
            img.style.filter = `blur(${this.options.blurAmount})`;
        }

        if (this.options.loadingIndicator) {
            const spinner = this.#createLoadingSpinner();
            wrapper.appendChild(spinner);
            this.#loadingStates.set(img, { spinner });
        }

        img.src = '';
        this.observer.observe(img);
    }

    #handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.#loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }

    #loadImage(img) {
        const originalSrc = img.dataset.src;

        // Simulate network delay
        const networkSpeed = document.getElementById('networkSelect').value;
        const { min, max } = NETWORK_CONDITIONS[networkSpeed];
        const delay = Math.random() * (max - min) + min;

        setTimeout(() => {
            img.src = originalSrc;

            if (this.options.blurEffect) {
                img.style.filter = 'blur(0)';
            }

            if (this.options.loadingIndicator) {
                const state = this.#loadingStates.get(img);
                if (state && state.spinner) {
                    state.spinner.remove();
                }
            }
        }, delay);
    }

    #createLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid ${this.options.loadingSpinnerColor};
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;

        if (!document.querySelector('#lazy-loader-spinner-keyframes')) {
            const style = document.createElement('style');
            style.id = 'lazy-loader-spinner-keyframes';
            style.textContent = `
                @keyframes spin {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        return spinner;
    }
}
