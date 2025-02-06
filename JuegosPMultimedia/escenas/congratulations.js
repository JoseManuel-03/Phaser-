import { RestartButton } from "../componentes/restart-button"; // Importamos el botón de reinicio

export class Congratulations extends Phaser.Scene {
    constructor() {
        super({ key: "congratulations" }); 
        this.restartButton = new RestartButton(this); 
    }

    preload() {
        // Cargamos las imágenes para la pantalla de felicitaciones
        this.load.image('congratulations', 'images/image-removebg-preview.png'); // Imagen con el texto "¡Felicidades!"
        this.load.image('trophy', 'images/pngtree-championship-victory-trophy-image_2287868-removebg-preview.png'); // Imagen del trofeo
        this.load.audio('winMusic', 'audio/mixkit-video-game-win-2016.wav'); // Sonido de victoria
        this.restartButton.preload(); 
    }

    create() {
        // Agregamos una imagen de fondo
        this.add.image(410, 250, 'background');

        // Mostramos la imagen de "¡Felicidades!" en la parte superior de la pantalla y ajustamos su tamaño
        this.congratsImage = this.add.image(400, 100, 'congratulations');
        this.congratsImage.setScale(0.5);

        // Mostramos la imagen del trofeo en el centro de la pantalla y ajustamos su tamaño
        this.trophyImage = this.add.image(400, 250, 'trophy');
        this.trophyImage.setScale(0.5);

        // Creamos el botón de reinicio para volver a jugar
        this.restartButton.create();

        // Detenemos la música del juego antes de reproducir la música de victoria
        this.scene.get('game').music.stop();

        // Configuramos la música de victoria con un volumen adecuado
        this.music = this.sound.add('winMusic', {
            volume: 0.6, 
        });

        // Reproducimos la música de victoria
        this.music.play();
    }
}
