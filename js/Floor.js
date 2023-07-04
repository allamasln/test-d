class Floor {
  constructor(ctx, canvasW, canvasH) {
    this.ctx = ctx;

    this.canvasW = canvasW;
    this.canvas = canvasH;

    this.x = 0;
    this.y = canvasH * 0.9; //Para posicionarlo segun los personajes

    this.img = new Image();
    this.img.src = "/assets/captura.png";

    this.img.frameCount = 1;
    this.frameIndex = 0;

    this.width = canvasW;
    this.height = canvasH * 0.1;

    this.draw();
  }
  draw() {
    this.ctx.drawImage(
      this.img,

      (this.img.width / this.img.frameCount) * this.frameIndex,
      0,
      this.img.width / this.img.frameCount,
      this.img.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export default Floor;
