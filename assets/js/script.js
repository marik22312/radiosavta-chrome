const playerStateChanged = 'playerStateChanged';
const titleChanged = 'titleChanged';

class Player {
  constructor(player) {
    this.player = player;
    this.isPlaying = false;
  }

  play() {
    this.dispatchPlayingStateEvent();
    this.isPlaying ? this.player.pause() : this.player.play();
    this.isPlaying = !this.isPlaying;
  }

  dispatchPlayingStateEvent() {
    const { isPlaying } = this;
    const event = new Event(playerStateChanged, { isPlaying });
    this.player.dispatchEvent(event);
  }

  addEventListener(eventName, cb) {
    this.player.addEventListener(eventName, cb);
  }
}


window.onload = () => {
  const playPauseBtn = document.querySelector('.play-pause');
  const playerNode = document.querySelector('.player');
  const player = new Player(playerNode);

  player.addEventListener(playerStateChanged, (e) => {
    alert(e.target.paused);
  });

  playPauseBtn.addEventListener('click', (e) => {
    e.preventDefault();

    player.play();
  });
};
