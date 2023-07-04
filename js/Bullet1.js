class Bullet1 {
  constructor(
    ctx,
    playerW,
    playerH,
    playerX,
    playerY,
    playerY0,
    canvasW,
    canvasH,
    isRight
  ) {
    this.ctx = ctx;

    this.radius = 8;

    this.canvasH = canvasH;

    this.playerH = playerH;
    this.playerY0 = playerY0;

    this.floor = this.playerY0 + this.playerH - this.radius;

    this.x = playerX;
    this.y = playerY + playerH / 2.2;
    this.vy = 0;
    this.vx = -10;

    this.img = new Image();
    this.img.src = "assets/characters/Laser Sprites/60.1.png";

    this.width = 60;
    this.height = 40;

    this.isRight = isRight;
  }

  draw() {
    if (this.isRight) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.img,
        -this.x - 200,
        this.y,
        this.width,
        this.height
      );
      this.ctx.restore();
    } else {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.isRight) {
      this.x -= this.vx;
    } else {
      this.x += this.vx;
    }
    this.gravity = 0;

    this.vy += this.gravity;
    this.y += this.vy;

    if (this.y > this.floor) {
      this.y = this.floor;
      this.vy *= 1;
    }
  }
}

export default Bullet1;
