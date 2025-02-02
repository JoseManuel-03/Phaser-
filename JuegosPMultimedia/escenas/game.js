import { Scoreboard } from "../componentes/Scoreboard";


export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.timer = 24; 
  }

  init() {
    this.scoreboard = new Scoreboard(this)
    this.timer = 24;
  }

  preload() {
    this.load.image("background", "images/basketball-court-cartoon-illustration-vector_1_1.png");
    this.load.image("platform", "images/jugador-de-baloncesto (2).png");
    this.load.image("ball", "images/icons8-baloncesto-48.png");
    this.load.image("brick", "images/icons8-red-de-canasta-64 (1).png");
    this.load.image('bomb', 'images/bomba-nuclear (1) (1).png');
    this.load.audio('backgroundMusic', 'audio/mixkit-hazy-after-hours-132.mp3');
    this.load.audio('puntosMusic', 'audio/mixkit-basketball-ball-hitting-the-net-2084.wav');

  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.add.image(400, 250, "background");
    this.scoreboard.create();
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

    this.time.addEvent({
      delay: 1000, 
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.music = this.sound.add('backgroundMusic', {
      volume: 0.1,   
      loop: true     
  });

  this.music.play();
  this.bombs = this.physics.add.group();
  this.physics.add.collider(this.platform, this.bombs, this.hitBomb, null, this);


  }

  createBomb(x, y) {
    let bomb = this.bombs.create(x, y, 'bomb'); 
    bomb.setVelocity(0, 200);
    bomb.setCollideWorldBounds(true);
}

hitBomb(platform, bomb) {
  this.scene.start('gameover');
}


  updateTimer() {
    this.timer--; 

    this.timerTextLeft.setText(`${this.timer}`);
    this.timerTextRight.setText(`${this.timer}`);

    if (this.timer <= 0) {
      this.showGameOver();
    }
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
    this.music = this.sound.add('puntosMusic', {
      volume: 0.8,   
   
  });

  this.music.play();
  this.createBomb(brick.x, brick.y);

    if (this.miGrupo.countActive() === 0) {
      this.showCongratulations()
    }

    ball.setVelocityX(ball.body.velocity.x + Phaser.Math.Between(-50, 50));
    ball.setVelocityY(ball.body.velocity.y + Phaser.Math.Between(-50, 50));
  }
}
