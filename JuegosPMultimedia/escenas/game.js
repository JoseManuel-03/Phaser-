import { Scoreboard } from "../componentes/Scoreboard"; // Importamos el marcador de puntos

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" }); 
    this.timer = 24; // Tiempo del juego (en segundos)
  }

  init() {
    this.scoreboard = new Scoreboard(this); // Se crea una nueva instancia del marcador
    this.timer = 24; // Reiniciamos el temporizador al empezar
  }

  preload() {
    // Cargamos las imágenes del juego
    this.load.image("background", "images/basketball-court-cartoon-illustration-vector_1_1.png");
    this.load.image("platform", "images/jugador-de-baloncesto (2).png");
    this.load.image("ball", "images/icons8-baloncesto-48.png");
    this.load.image("brick", "images/icons8-red-de-canasta-64 (1).png");
    this.load.image("bomb", "images/bomba-nuclear (1) (1).png");

    // Cargamos los sonidos
    this.load.audio("backgroundMusic", "audio/NBA Sound.mp3");
    this.load.audio("puntosMusic", "audio/mixkit-basketball-ball-hitting-the-net-2084.wav");
  }

  create() {
    // Configuración del mundo físico
    this.physics.world.setBoundsCollision(true, true, true, false); // Los límites laterales y superior pueden colisionar

    // Agregamos la imagen de fondo
    this.add.image(400, 250, "background");

    // Iniciamos el marcador
    this.scoreboard.create();

    // Agregamos el temporizador en pantalla
    this.timerTextLeft = this.add.text(1, 80, `${this.timer}`, {
      fontSize: "30px",
      fill: "#ff0000",
      fontFamily: "Arial",
      fontStyle: "bold",
      stroke: "#ff6666",
      strokeThickness: 6,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: "#ff3333",
        blur: 8,
        stroke: true,
        fill: true,
      },
    });

    this.timerTextRight = this.add.text(760, 80, `${this.timer}`, {
      fontSize: "30px",
      fill: "#ff0000",
      fontFamily: "Arial",
      fontStyle: "bold",
      stroke: "#ff6666",
      strokeThickness: 6,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: "#ff3333",
        blur: 8,
        stroke: true,
        fill: true,
      },
    });

    // Creamos los bloques que representan la canasta
    this.miGrupo = this.physics.add.staticGroup({
      key: "brick",
      frameQuantity: 6,
      gridAlign: {
        width: 6,
        height: 1,
        cellWidth: 120,
        cellHeight: 34,
        x: 120,
        y: 100,
      },
    });

    // Creamos la plataforma que controlará el jugador
    this.platform = this.physics.add.image(400, 460, "platform").setImmovable();
    this.platform.setCollideWorldBounds(true);

    // Creamos la pelota
    this.ball = this.physics.add.image(385, 430, "ball");
    this.ball.setData("glue", true); // Al inicio, la pelota se mantiene pegada a la plataforma
    this.ball.setCollideWorldBounds(true);

    // Desactivamos la gravedad en la plataforma
    this.platform.body.allowGravity = false;

    // Detectamos colisiones entre la pelota y la plataforma
    this.physics.add.collider(this.ball, this.platform, this.platformImpact, () => true, this);

    // Detectamos colisiones entre la pelota y los bloques
    this.physics.add.collider(this.ball, this.miGrupo, this.brickImpact, () => true, this);

    // Configuramos el rebote de la pelota
    this.ball.setBounce(1);

    // Controles del teclado
    this.cursors = this.input.keyboard.createCursorKeys();

    // Configuración del temporizador del juego
    this.time.addEvent({
      delay: 1000, // Se ejecuta cada segundo
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    // Configuración de la música de fondo
    this.sound.stopAll(); 
    this.sound.removeByKey("backgroundMusic"); // Eliminamos la música anterior
    this.music = this.sound.add("backgroundMusic", {
      volume: 0.1,
      loop: true,
    });
    this.music.play();

    // Creamos el grupo de bombas
    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.platform, this.bombs, this.hitBomb, null, this);
  }

  createBomb(x, y) {
    let bomb = this.bombs.create(x, y, "bomb"); // Se crea una bomba en la posición dada
    bomb.setVelocity(0, 200); // Velocidad hacia abajo para que caiga hacia abajo
    bomb.setCollideWorldBounds(true);
  }

  hitBomb(platform, bomb) {
    this.scene.start("gameover"); // Si la bomba toca la plataforma, el juego termina
  }

  updateTimer() {
    this.timer--; // Reducimos el tiempo cada segundo
    this.timerTextLeft.setText(`${this.timer}`);
    this.timerTextRight.setText(`${this.timer}`);

    if (this.timer <= 0) {
      this.showGameOver(); // Si el tiempo llega a 0, se acaba el juego
    }
  }

  update() {
    // Movimiento de la plataforma con las teclas
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
      if (this.ball.getData("glue")) {
        this.ball.setVelocityX(-500);
      }
    } else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if (this.ball.getData("glue")) {
        this.ball.setVelocityX(500);
      }
    } else {
      this.platform.setVelocityX(0);
      if (this.ball.getData("glue")) {
        this.ball.setVelocityX(0);
      }
    }

    // Si la pelota cae fuera de la pantalla, termina el juego
    if (this.ball.y > 500) {
      this.showGameOver();
    }

    // Si se presiona la tecla "arriba", la pelota se suelta de la plataforma
    if (this.cursors.up.isDown) {
      if (this.ball.getData("glue")) {
        this.ball.setData("glue", false);
      }
    }

    // Si se alcanzan más de 3 puntos, la pelota se mueve más rápido
    if (this.score > 3) {
      this.ball.setVelocity(Phaser.Math.Between(-400, 400), Phaser.Math.Between(-400, -600));
    }
  }

  showGameOver() {
    this.sound.stopAll(); // Se detienen todos los sonidos
    this.scene.start("gameover"); // Se muestra la pantalla de game over
  }

  showCongratulations() {
    this.sound.stopAll(); // Se detienen todos los sonidos
    this.scene.start("congratulations"); // Se muestra la pantalla de victoria
  }

  ejecutar() {
    console.log("Ha chocado");
    this.ball.setVelocity(10, -800); // Da un empujón a la pelota
  }

  platformImpact(ball, platform) {
    if (!this.hasStarted) {
      this.hasStarted = true;
    }

    let relativeImpact = ball.x - platform.x;

    if (ball.getData("glue")) {
      ball.setVelocityX(platform.body.velocity.x);
    } else {
      ball.setVelocityY(-300);
      if (relativeImpact < 0.1 && relativeImpact > -0.1) {
        ball.setVelocityX(Phaser.Math.Between(-10, 10));
      } else {
        ball.setVelocityX(10 * relativeImpact);
      }
    }
  }

  brickImpact(ball, brick) {
    this.scoreboard.incrementPoints(1); // Aumentamos el puntaje al romper un bloque
    brick.disableBody(true, true); // Desactivamos el bloque para que desaparezca

    // Reproducimos el sonido de puntuación
    this.music = this.sound.add("puntosMusic", {
      volume: 0.8,
    });
    this.music.play();

    // Generamos una bomba en la posición donde estaba el bloque destruido
    this.createBomb(brick.x, brick.y);

    // Si ya no quedan más bloques activos, se muestra la pantalla de felicitaciones
    if (this.miGrupo.countActive() === 0) {
      this.showCongratulations();
    }

    // Ajustamos la velocidad de la pelota para hacer el juego más dinámico
    ball.setVelocityX(ball.body.velocity.x + Phaser.Math.Between(-50, 50));
    ball.setVelocityY(ball.body.velocity.y + Phaser.Math.Between(-50, 50));
  }
}
