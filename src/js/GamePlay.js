import Board from './Board';
import Goblin from './Goblin';

export default class GamePlay {
  constructor() {
    this.size = 5;
    this.modalEl = document.getElementById('modal');
    this.countDead = null;
    this.countLost = null;
    this.count = null;
  }

  startGame() {
    const board = new Board();
    board.initiationBoard(this.size);

    const goblin = new Goblin();

    this.onCellClick();
    this.onButtonClick();

    setInterval(() => {
      goblin.randomPositionGoblin(this.size);

      this.countLost.textContent = +this.countLost.textContent + this.count;

      if (this.count !== 1) {
        setTimeout(this.count = 1, 1000);
      }

      this.checkWinner();
    }, 1000);
  }

  onCellClick() {
    const fields = document.querySelectorAll('.field');

    this.countDead = document.getElementById('dead');
    this.countLost = document.getElementById('lost');

    for (let i = 0; i < fields.length; i += 1) {
      fields[i].addEventListener('click', () => {
        if (fields[i].classList.contains('goblin')) {
          fields[i].classList.remove('goblin');
          this.countDead.textContent = +this.countDead.textContent + 1;
        } else {
          this.countLost.textContent = +this.countLost.textContent + 1;
        }
        this.checkWinner();
        this.count = 0;
      });
    }
  }

  onButtonClick() {
    const resetButtons = document.querySelectorAll('.reset');

    for (const btn of resetButtons) {
      btn.addEventListener('click', () => {
        if (!this.modalEl.classList.contains('hidden')) {
          this.modalEl.classList.add('hidden');
        }
        this.reset();
      });
    }
  }

  reset() {
    this.countDead.textContent = 0;
    this.countLost.textContent = 0;
  }

  checkWinner() {
    if (this.countDead.textContent === 5) {
      this.showWinner('🍾 Победа! 🍾');
    }

    if (this.countLost.textContent > 5) {
      this.showWinner('Вы проиграли!');
    }
  }

  showWinner(status) {
    const header = this.modalEl.getElementsByTagName('h2')[0];
    header.textContent = status;
    this.modalEl.classList.remove('hidden');
    this.reset();
  }
}