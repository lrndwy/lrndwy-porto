declare module 'smooth-scroll' {
  interface SmoothScrollOptions {
    speed?: number;
    speedAsDuration?: boolean;
    updateURL?: boolean;
    clip?: boolean;
    easing?: string;
  }

  class SmoothScroll {
    constructor(selector: string, options?: SmoothScrollOptions);
    destroy(): void;
  }

  export = SmoothScroll;
  export default SmoothScroll;
}
