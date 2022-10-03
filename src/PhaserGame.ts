import Phaser from 'phaser';

import HelloWorldScene from './scenes/HelloWorldScene';
import Welcome from './scenes/Welcome';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 3024,
    height: 1964,
    max: {
      width: 1600,
      height: 900,
    },
  },
  scene: [Welcome, HelloWorldScene],
};

// export default new Phaser.Game(config);
export default config;
