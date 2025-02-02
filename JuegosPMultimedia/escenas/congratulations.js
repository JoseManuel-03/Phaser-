import { RestartButton } from "../componentes/restart-button";

export class Congratulations extends Phaser.Scene {
    constructor() {
      super({ key: "congratulations" });
      this.restartButton = new RestartButton(this)
    }

    preload(){
        this.load.image('congratulations', 'images/image-removebg-preview.png');
        this.load.image('trophy', 'images/pngtree-championship-victory-trophy-image_2287868-removebg-preview.png');
        this.load.audio('winMusic', 'audio/mixkit-video-game-win-2016.wav');
        this.restartButton.preload();
    }

    create(){
        this.add.image(410,250, 'background');
        this.congratsImage = this.add.image(400, 100, 'congratulations');
        this.congratsImage.setScale(0.5);

        this.trophyImage = this.add.image(400, 250, 'trophy');
        this.trophyImage.setScale(0.5); 
        this.restartButton.create();
        this.scene.get('game').music.stop();  
        this.music = this.sound.add('winMusic', {
            volume: 0.6,   
         
        });
      
        this.music.play();
    }
}