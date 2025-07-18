const chars = '!<>-_\/[]{}—=+*^#________';

export class TextScramble {
  private el: HTMLElement;
  private chars: string;
  private update: FrameRequestCallback;
  private resolvePromise: (() => void) | null = null;
  private frameRequest: number | null = null;
  private frame: number = 0;
  private queue: { from: string; to: string; start: number; end: number; resolve?: () => void }[] = [];

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = chars;
    this.update = this.updateText.bind(this);
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>(resolve => (this.resolvePromise = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest!);
    this.frame = 0;
    this.updateText();
    return promise;
  }

  private updateText(): void {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (to === '') {
          output += this.randomChar();
        } else {
          output += this.randomChar();
        }
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolvePromise!();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
