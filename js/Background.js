class Background {
  constructor(ctx, canvasW, canvasH) {
    this.ctx = ctx;

    this.x = 0;

    this.canvasW = canvasW;
    this.canvasH = canvasH;

    this.img = new Image();
    this.img.src = "assets/citys/city1/10.png";

    // this.dx = worldVelocity
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, 0, this.canvasW, this.canvasH);

    this.ctx.drawImage(
      this.img,
      this.x + this.canvasW,
      0,
      this.canvasW,
      this.canvasH
    );
  }

  move(worldVelocity) {
    this.x += worldVelocity;

    if (this.x <= -this.canvasW) this.x = 0;
  }
}

export default Background;
