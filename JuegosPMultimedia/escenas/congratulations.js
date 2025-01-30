import { RestartButton } from "../componentes/restart-button";

export class Congratulations extends Phaser.Scene {
    constructor() {
      super({ key: "congratulations" });
      this.restartButton = new RestartButton(this)
    }

    preload(){
        this.load.image('congratulations', 'images/pngtree-championship-victory-trophy-image_2287868.jpg');
        this.restartButton.preload();
    }

    create(){
        this.add.image(410,250, 'background');
        this.restartButton.create();
        this.congratsImage =this.add.image(400,90, 'congratulations')
    }
}