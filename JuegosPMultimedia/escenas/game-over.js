import { RestartButton } from "../componentes/restart-button";


export class Gameover extends Phaser.Scene {
    constructor() {
      super({ key: "gameover" });
      this.restartButton = new RestartButton(this);
    }

    preload(){
        this.load.image('gameover', 'images/pngimg.com - game_over_PNG44.png');
        this.restartButton.preload()
        this.load.audio('looseMusic', 'audio/mixkit-player-losing-or-failing-2042.wav');
    }

    create(){
        this.add.image(410,250, 'background');
        this.restartButton.create();
        this.gameoverImage = this.add.image(400,140, 'gameover');
        this.music = this.sound.add('looseMusic', {
            volume: 0.6,   
         
        });
      
        this.music.play();
    }
}