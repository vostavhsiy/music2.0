export class AudioPlayer {
  player: HTMLAudioElement;
  constructor(src?: string) {
    this.player = new Audio(src);
  }

  async play() {
    await this.player.play();
  }

  stop() {
    this.player.pause();
  }

  async src(src: string) {
    this.player.src = src;
    this.player.load();
    if (this.player.paused) await this.player.play();
  }

  set time(value: number) {
    this.player.currentTime = value;
  }

  set volume(value: number) {
    this.player.volume = value;
  }
}
