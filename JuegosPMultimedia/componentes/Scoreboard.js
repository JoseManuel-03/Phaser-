export class Scoreboard {
  constructor(scene) {
    this.relatedScene = scene;
    this.score = 0;
  }

  create() {
    this.scoreText = this.relatedScene.add.text(16, 16, "0 PUNTOS", {
      fontSize: "bold 25px",
      fill: "#8B0000",
      fontFamily: "verdana,arial,sans-serif"
    });
  }

  incrementPoints(points){
    this.score += points;
    this.scoreText.setText(this.score + " PUNTOS");
  }


}
