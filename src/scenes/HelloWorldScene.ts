import Phaser from 'phaser';
import { metamaskChecking } from '../service';
export default class HelloWorldScene extends Phaser.Scene {
  talkText!: Phaser.GameObjects.Text;
  container!: Phaser.GameObjects.Container;
  zombie!: Phaser.GameObjects.Sprite;
  graphics2!: Phaser.GameObjects.Graphics;

  constructor() {
    super('hello');
  }

  preload() {
    this.load.image('bg', 'assets/bg.png');

    this.load.image('light', 'assets/light.svg');
    this.load.image('zombie', 'assets/zombie.svg');

    this.load.image('z1', 'assets/animations/zombie/z1.svg');
    this.load.image('z2', 'assets/animations/zombie/z2.svg');
    this.load.image('z3', 'assets/animations/zombie/z3.svg');
    this.load.image('z4', 'assets/animations/zombie/z4.svg');
    this.load.image('z5', 'assets/animations/zombie/z5.svg');
    this.load.image('z6', 'assets/animations/zombie/z6.svg');
    this.load.image('z7', 'assets/animations/zombie/z7.svg');
    this.load.image('z8', 'assets/animations/zombie/z8.svg');

    this.load.audio('test', '/assets/test.mp3');

    this.load.image('circle', 'assets/circle.svg');

    this.load.image('soldier', 'assets/soldier.svg');
    this.load.image('pvp', 'assets/pvp.svg');
  }

  create() {
    this.createEmitter();
  }

  update() {
    if (
      this.container.x > 800 &&
      this.container.x < 1300 &&
      !this.zombie.flipX
    ) {
      this.talkText.visible = true;
      this.graphics2.visible = true;
    } else {
      this.talkText.visible = false;
      this.graphics2.visible = false;
    }
  }

  createEmitter() {
    const { width, height } = this.sys.game.canvas;

    const bg = this.add.image(0, 0, 'bg').setOrigin(0);
    const light = this.add.image(0, 0, 'light');
    light.setScale(2);
    Phaser.Display.Align.In.Center(light, bg, 0, -light.height / 2);

    this.zombie = this.add.sprite(0, 0, 'zombie');

    const name = this.add.text(-120, -200, 'Dog man', {
      fontSize: '50px',
      align: 'center',
    });

    const level = this.add.text(135, -195, '5', {
      fontSize: '50px',
      align: 'center',
    });

    const graphics = this.add.graphics();
    graphics.fillStyle(0x70247b, 1);

    //  32px radius on the corners
    graphics.fillRoundedRect(120, -200, 60, 50, 10);

    this.graphics2 = this.add.graphics();
    this.graphics2.fillStyle(0xffffff, 1);

    this.graphics2.fillRoundedRect(0, 0, 350, 100, {
      tl: 0,
      tr: 20,
      bl: 20,
      br: 20,
    });

    this.talkText = this.add
      .text(0, 0, 'TESTING 12', {
        fontSize: '50px',
        align: 'center',
        color: 'black',
      })
      .setPadding(20);

    this.container = this.add
      .container(0, 0, [
        this.zombie,
        name,
        graphics,
        this.graphics2,
        this.talkText,
        level,
      ])
      .setSize(50, 50);

    // container.setOrigin(1, 1);
    this.container.setPosition(
      this.zombie.width,
      height / 2 + this.container.height
    );

    this.tweens.add({
      targets: this.container,
      props: {
        x: { value: width, duration: 5000 },
      },
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
      onYoyo: (_, target) => {
        target.list[0].flipX = true;
      },
      onRepeat: (_, target) => {
        target.list[0].flipX = false;
      },
    });

    this.anims.create({
      key: 'walk',
      frames: [
        { key: 'z1' },
        { key: 'z2' },
        { key: 'z3' },
        { key: 'z4' },
        { key: 'z4' },
        { key: 'z6' },
        { key: 'z7' },
        { key: 'z8' },
      ],
      frameRate: 8,
      repeat: -1,
    });

    const walkingZombie = this.add
      .sprite(400, 300, 'z1')
      .play('walk')
      .setScale(4);

    this.tweens.add({
      targets: walkingZombie,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
      props: {
        x: { value: width, duration: 5000, flipX: true },
      },
    });

    // const a = this.sound.add('test', {
    //   volume: 1,
    //   loop: true,
    // });
    // a.play();

    const circle = this.add.image(0, 0, 'circle').setDisplaySize(450, 500);
    const soldier = this.add.image(-190, 30, 'soldier').setScale(2);
    const pvp = this.add.image(0, 0, 'pvp').setScale(2);

    this.add
      .container(width - 600, height - 400, [circle, soldier, pvp])
      .setSize(450, 500);
  }
}
