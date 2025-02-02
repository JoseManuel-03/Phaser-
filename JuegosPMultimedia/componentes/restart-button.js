export class RestartButton{

    constructor(scene){
        this.relatedScene = scene;
    }

    preload(){
        this.relatedScene.load.image('button', "images/image-removebg-preview (1).png", {frameWidth: 190, frameHeight: 49})
    }

    create(){
        this.startButton = this.relatedScene.add.sprite(400, 370, 'button').setInteractive();
        this.startButton.setScale(0.2);

        this.startButton.on('pointerover', ()=> {
            this.startButton.setFrame(1);
        })

        this.startButton.on('pointerout', ()=> {
            this.startButton.setFrame(0);
        })

        this.startButton.on('pointerdown', ()=> {
            console.log("pasa por aquí")
            this.relatedScene.scene.start('game')
        })
    }

}