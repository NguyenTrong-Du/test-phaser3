import Phaser from 'phaser';
import { metamaskChecking } from '../service';
import { metamaskState } from '../store/metamask';
import { setRecoil, getRecoil } from 'recoil-nexus';
export default class Welcome extends Phaser.Scene {
  container!: Phaser.GameObjects.Container;
  loadingText2!: Phaser.GameObjects.Text;
  start!: Phaser.GameObjects.Text;
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

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var progressBox = this.add.graphics();
    var progressBar = this.add.graphics();

    progressBox.fillStyle(0x77889e);
    progressBox.fillRoundedRect(width / 2 - 500, height / 2 - 50, 1000, 100, 0);
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: 'Loading...',
      style: {
        fontSize: '40px',
        color: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        fontSize: '30px',
        color: '#000',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value: number) {
      const percent = (value * 100).toFixed();
      percentText.setText(`${percent}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRoundedRect(
        width / 2 - 500,
        height / 2 - 50,
        1000 * value,
        100,
        0
      );
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      metamaskChecking().then((data) => {
        const state = data.length > 4;
        setRecoil(metamaskState, state);
      });
    });
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    const bg = this.add.image(0, 0, 'bg').setOrigin(0);
    this.loadingText2 = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: 'Metamask checking...',
      style: {
        fontSize: '40px',
        color: '#ffffff',
      },
    });
    this.loadingText2.setOrigin(0.5, 0.5);

    this.start = this.add
      .text(width / 2, height / 2, 'Start', {
        fontSize: '50px',
        color: '#0ff',
        backgroundColor: '#ddd',
      })
      .setPadding(10)
      .setInteractive({ cursor: 'pointer' });
    this.start.visible = false;

    this.start.on('pointerdown', function () {
      // this.scene.launch('hello');
      console.log('first');
    });
  }

  update() {
    const isInstall = getRecoil(metamaskState);
    if (isInstall) {
      this.loadingText2.destroy();
      this.start.visible = true;
    }
  }
}
