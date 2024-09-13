class CardController {
  constructor(containerSelector) {
    this.isAnimating = false;
    this.pullDeltaX = 0;
    this.DECISION_THRESHOLD = 100; // Define el umbral para una decisión
    this.container = document.querySelector(containerSelector);

    this.startDrag = this.startDrag.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.init();
  }

  init() {
    this.container.addEventListener('mousedown', this.startDrag);
    this.container.addEventListener('touchstart', this.startDrag, { passive: true });
  }

  startDrag(event) {
    if (this.isAnimating) return;

    const actualCard = event.target.closest('article');
    if (!actualCard) return;

    const startX = event.pageX ?? event.touches[0].pageX;
    this.actualCard = actualCard;

    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseup', this.onEnd);

    document.addEventListener('touchmove', this.onMove, { passive: true });
    document.addEventListener('touchend', this.onEnd, { passive: true });

    this.startX = startX;
  }

  onMove(event) {
    const currentX = event.pageX ?? event.touches[0].pageX;
    this.pullDeltaX = currentX - this.startX;

    if (this.pullDeltaX === 0) return;

    this.isAnimating = true;
    const deg = this.pullDeltaX / 14;

    // Aplica las transformaciones a la tarjeta
    this.actualCard.style.transform = `translateX(${this.pullDeltaX}px) rotate(${deg}deg)`;
    this.actualCard.style.cursor = 'grabbing';

    const opacity = Math.abs(this.pullDeltaX) / 100;
    const isRight = this.pullDeltaX > 0;

    const choiceEl = isRight
      ? this.actualCard.querySelector('.choice.like')
      : this.actualCard.querySelector('.choice.nope');

    if (choiceEl) {
      choiceEl.style.opacity = opacity;
    }
  }

  onEnd() {
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseup', this.onEnd);

    document.removeEventListener('touchmove', this.onMove);
    document.removeEventListener('touchend', this.onEnd);

    const decisionMade = Math.abs(this.pullDeltaX) >= this.DECISION_THRESHOLD;

    if (decisionMade) {
      const goRight = this.pullDeltaX >= 0;
      this.actualCard.classList.add(goRight ? 'go-right' : 'go-left');
      this.actualCard.addEventListener('transitionend', () => {
        this.actualCard.remove();
      });
    } else {
      this.actualCard.classList.add('reset');
      this.actualCard.classList.remove('go-right', 'go-left');
      this.actualCard.querySelectorAll('.choice').forEach(choice => {
        choice.style.opacity = 0;
      });
    }

    this.actualCard.addEventListener('transitionend', () => {
      this.actualCard.removeAttribute('style');
      this.actualCard.classList.remove('reset');
      this.pullDeltaX = 0;
      this.isAnimating = false;
    });
  }
}

// Para inicializar el controlador de las tarjetas
const cardController = new CardController('#card-container');
