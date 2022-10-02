import Phaser from 'phaser';
export default class Welcome extends Phaser.Scene {
  container!: Phaser.GameObjects.Container;
  constructor() {
    super('welcome');
  }

  preload() {
    this.load.image('bg', 'assets/bg.png');

    this.load.image('light', 'assets/light.svg');
    this.load.image('room', 'assets/room.svg');
    this.load.image('eclipse2', 'assets/eclipse2.svg');
    this.load.image('eclipse', 'assets/eclipse.svg');
    this.load.image('crank', 'assets/crank.svg');

    this.load.audio('test', '/assets/test.mp3');
  }

  create() {
    this.createEmitter();
  }

  update() {}

  createEmitter() {
    const { width, height } = this.sys.game.canvas;

    const bg = this.add.image(0, 0, 'bg').setOrigin(0);
    const eclipse2 = this.add.image(0, 0, 'eclipse2');
    const light = this.add.image(0, 0, 'light');
    const eclipse = this.add.image(0, 200, 'eclipse');
    const crank = this.add.image(0, 0, 'crank');
    const room = this.add.image(0, 0, 'room');
    light.setScale(2);
    crank.setScale(1.8);
    room.setDisplaySize(348, 600);
    eclipse2.setDisplaySize(348, 90);
    eclipse.setDisplaySize(348, 90);
    Phaser.Display.Align.In.Center(light, bg, 0, -light.height / 2);
    // Phaser.Display.Align.In.Center(room, bg, 0, 100);
    // Phaser.Display.Align.In.Center(eclipse2, room, 0, -300);
    // Phaser.Display.Align.In.Center(eclipse, room, 0, 253);
    // Phaser.Display.Align.In.Center(crank, room, 0, 200);

    this.container = this.add
      .container(width / 2, height / 2, [crank, room, eclipse2, eclipse])
      .setSize(50, 50);

    const container = this.add
      .container(width / 4, height / 4, [crank, room, eclipse2, eclipse])
      .setSize(50, 50);
  }
}
