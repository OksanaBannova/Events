export default class Goblin {
  constructor() {
    this.goblin = 'goblin';
    this.positionGoblin = -1;
  }

  randomPositionGoblin(size) {
    const divs = document.querySelectorAll('.field');

    const randomInt = Math.floor(Math.random() * (size ** 2));
    if (this.positionGoblin >= 0) {
      divs[this.positionGoblin].classList.remove(this.goblin);
      this.positionGoblin = -1;
    }

    divs[randomInt].classList.add(this.goblin);
    this.positionGoblin = randomInt;
  }
}