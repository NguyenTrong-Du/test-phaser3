import { useEffect } from 'react';
import './App.css';
import Phaser from 'phaser';
import config from './PhaserGame';
import Welcome from './scenes/Welcome';

function App() {
  useEffect(() => {
    new Phaser.Game(config);
    // const scene = phaserGame.scene.keys.welcome as Welcome;
    // phaserGame.scene.start(Welcome);
  }, []);

  return <div className="App"></div>;
}

export default App;
