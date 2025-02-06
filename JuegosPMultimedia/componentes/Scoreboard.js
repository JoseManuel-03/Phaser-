export class Scoreboard {
  constructor(scene) {
    this.relatedScene = scene; 
    this.score = 0; // Inicializamos el puntaje en 0
  }

  create() {
    // Creamos el texto del marcador en la pantalla
    this.scoreText = this.relatedScene.add.text(16, 16, "0 PUNTOS", {
      fontSize: "bold 25px", // Tamaño y estilo de la fuente
      fill: "#8B0000", // Color del texto 
      fontFamily: "verdana,arial,sans-serif" // Tipo de fuente
    });
  }

  incrementPoints(points) {
    this.score += points; // Sumamos los puntos al marcador
    this.scoreText.setText(this.score + " PUNTOS"); // Actualizamos el texto en pantalla
  }
}
