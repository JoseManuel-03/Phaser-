export class RestartButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {
        // Cargamos la imagen del botón, especificando el tamaño del frame
        this.relatedScene.load.image('button', "images/image-removebg-preview (1).png", {frameWidth: 190, frameHeight: 49});
    }

    create() {
        // Creamos el sprite del botón, lo colocamos en las coordenadas y lo hacemos interactivo
        this.startButton = this.relatedScene.add.sprite(400, 370, 'button').setInteractive();
        this.startButton.setScale(0.2); // Cambiamos el tamaño del botón

        // Evento cuando el puntero pasa sobre el botón
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });

        // Evento cuando el puntero sale del botón,
        this.startButton.on('pointerout', () => {
            this.startButton.setFrame(0);
        });

        // Evento cuando se hace clic en el botón, reiniciamos la escena y comenzamos de nuevo el juego
        this.startButton.on('pointerdown', () => {
            console.log("pasa por aquí"); // Mostramos un mensaje en la consola para verificar que el botón funciona
            this.relatedScene.scene.start('game'); // Iniciamos la escena del juego
        });
    }
}
