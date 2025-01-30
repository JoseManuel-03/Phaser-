import { Scoreboard } from "../componentes/Scoreboard";


export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  init() {
    this.scoreboard = new Scoreboard(this)
  }

  preload() {
    this.load.image("background", "images/basketball-court-cartoon-illustration-vector_1_1.png");
    this.load.image("platform", "images/jugador-de-baloncesto (2).png");
    this.load.image("ball", "images/icons8-baloncesto-48.png");
    this.load.image("brick", "images/icons8-red-de-canasta-64 (1).png");

  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.add.image(400, 250, "background");
    this.scoreboard.create();



    this.miGrupo = this.physics.add.staticGroup({
      key: 'brick',
      frameQuantity: 6,
      gridAlign: {
        width: 6,
        height: 1,
        cellWidth: 120,
        cellHeight: 34,
        x: 120,
        y: 100,
      }
    });

    this.platform = this.physics.add.image(400, 460, "platform").setImmovable();
    this.platform.setCollideWorldBounds(true);
    this.ball = this.physics.add.image(385, 430, "ball");
    this.ball.setData('glue', true);
    this.ball.setCollideWorldBounds(true);
    this.platform.body.allowGravity = false;
    

    this.physics.add.collider(
      this.ball,
      this.platform,
      this.platformImpact,
      () => true,
      this
    );

    this.physics.add.collider(
      this.ball,
      this.miGrupo,
      this.brickImpact,
      () => true,
      this
    );
    this.ball.setBounce(1);
    this.cursors = this.input.keyboard.createCursorKeys();


  }

  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
      if (this.ball.getData('glue')) {
        this.ball.setVelocityX(-500);
      }
    } else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if (this.ball.getData('glue')) {
        this.ball.setVelocityX(500);
      }
    } else {
      this.platform.setVelocityX(0);
      if (this.ball.getData('glue')) {
        this.ball.setVelocityX(0);
      }
    }

    if (this.ball.y > 500) {
      this.showGameOver();
    }

    if (this.cursors.up.isDown) {
      if (this.ball.getData('glue')) {
        this.ball.setData('glue', false);
      }
    }

    if (this.score > 3) {
      this.ball.setVelocity(Phaser.Math.Between(-400, 400), Phaser.Math.Between(-400, -600));
    }

  }


  showGameOver() {
    this.scene.start('gameover');
  }

  showCongratulations() {
    this.scene.start('congratulations');
  }

  ejecutar() {
    console.log("Ha chocado");
    this.ball.setVelocity(10, -800);
  }

  platformImpact(ball, platform) {
    if (!this.hasStarted) {
      this.hasStarted = true;
    }

    let relativeImpact = ball.x - platform.x;

    if (ball.getData('glue')) {

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
    this.scoreboard.incrementPoints(1);
    brick.disableBody(true, true);

    if (this.miGrupo.countActive() === 0) {
      this.showCongratulations()
    }

    ball.setVelocityX(ball.body.velocity.x + Phaser.Math.Between(-50, 50));
    ball.setVelocityY(ball.body.velocity.y + Phaser.Math.Between(-50, 50));
  }
}
