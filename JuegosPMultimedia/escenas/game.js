import { Scoreboard } from "../componentes/scoreboard";


export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  init() {
    this.scoreboard = new Scoreboard(this)
  }

  preload() {
    //  this.load.image('background','images/background.png');
    this.load.image("background", "images/5ee44921c3b71.jpeg");
    this.load.image("gameover", "images/gameover.png");
    //   this.load.image('platform', 'images/platform.png');
    this.load.image("platform", "images/cigarro (1) (1).png");
    //  this.load.image('ball', 'images/ball.png')
    this.load.image("ball", "images/-beer_89775 (1).png");
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.add.image(400, 250, "background");
    this.gameoverImage = this.add.image(400, 90, "gameover");
    this.gameoverImage.visible = false;
    this.scoreboard.create();

    this.platform = this.physics.add.image(400, 460, "platform").setImmovable();
    this.platform.body.allowGravity = false;
    this.ball = this.physics.add.image(385, 430, "ball");
    this.ball.setData('glue',true);
    this.ball.setCollideWorldBounds(true);
    this.platform.setCollideWorldBounds(true);

    this.physics.add.collider(
      this.ball,
      this.platform,
      this.platformImpact,
      () => true,
      this
    );
    this.ball.setBounce(1);
    this.cursors = this.input.keyboard.createCursorKeys();

    
  }

  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
      if(this.ball.getData('glue')){
        this.ball.setVelocityX(-500);
      }
    } else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if(this.ball.getData('glue')){
        this.ball.setVelocityX(500);
      }
    } else {
      this.platform.setVelocityX(0);
      if(this.ball.getData('glue')){
        this.ball.setVelocityX(0);
      }
    }

    if (this.ball.y > 500) {
      console.log("fin de partida...");
      this.gameoverImage.visible = true;
      this.scene.pause();
    }

    if(this.cursors.up.isDown){
      this.ball.setVelocity(-75, -300);
      this.ball.setData('glue',false)
    }
  }



  ejecutar() {
    console.log("Ha chocado");
    this.ball.setVelocity(10, -800);
  }

  platformImpact(ball, platform) {
    this.scoreboard.incrementPoints(1);
    let relativeImpact = ball.x - platform.x;
    if (relativeImpact < 0.1 && relativeImpact > -0.1){
      ball.setVelocityX(Phaser.Math.Between(-10,10))
    }else{
      ball.setVelocity(10 * relativeImpact);
    }
  }
}
