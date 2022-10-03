import { useEffect } from 'react';
import './App.css';
import Phaser from 'phaser';
import config from './PhaserGame';
import Welcome from './scenes/Welcome';
import { useRecoilValue } from 'recoil';
import { metamaskState } from './store/metamask';

function App() {
  const isInstall = useRecoilValue(metamaskState);

  const handleClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    new Phaser.Game(config);
    // const scene = phaserGame.scene.keys.welcome as Welcome;
    // phaserGame.scene.start(Welcome);
  }, []);

  return (
    <div className="App">
      {isInstall ? 'installed' : 'not installed'}
      <button onClick={handleClick}>reload</button>
    </div>
  );
}

export default App;
