import { RestartButton } from "../componentes/restart-button"; // Importamos el botón de reinicio

export class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: "gameover" }); 
        this.restartButton = new RestartButton(this); 
    }

    preload(){
        this.load.image('gameover', 'images/pngimg.com - game_over_PNG44.png'); // Cargamos la imagen de "Game Over"
        this.restartButton.preload();
        this.load.audio('looseMusic', 'audio/mixkit-player-losing-or-failing-2042.wav'); // Cargamos el sonido de derrota
    }

    create(){
        this.add.image(410, 250, 'background'); // Agregamos la imagen de fondo
        this.restartButton.create(); // Creamos el botón de reinicio en la escena
        this.gameoverImage = this.add.image(400, 140, 'gameover'); // Mostramos la imagen de "Game Over"

        // Configuramos y reproducimos el sonido de derrota
        this.music = this.sound.add('looseMusic', {
            volume: 0.6, // Ajustamos el volumen del sonido
        });
        this.music.play(); // Reproducimos el sonido de derrota
    }
}
