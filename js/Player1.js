import Bullet1 from "./Bullet1.js";

class Player1 {
  constructor(ctx, canvasW, canvasH, keys1) {
    this.ctx = ctx;
    this.keys1 = keys1;

    this.canvasW = canvasW;
    this.canvasH = canvasH;

    this.x0 = canvasW * 0.8;
    this.x = this.x0;

    this.y0 = canvasH * 0.61;
    this.y = this.y0;

    this.vy = 0;
    this.vx = 0;

    this.img = new Image();
    this.img.src = "assets/characters/Infantryman/Idle.png";

    this.img.frameCount = 6;
    this.frameIndex = 0;
    this.vframeIndex = 6;

    this.width = 200;
    this.height = 220;

    this.bullets = [];

    this.jumpAudio = new Audio("../assets/sounds/jump.wav");
    this.jumpAudio.volume = 1;

    this.bulletAudio = new Audio("../assets/sounds/bullet.wav");
    this.bulletAudio.volume = 1;

    this.pressedControl = {
      RIGHT1: false,
      JUMP1: false,
      LEFT1: false,
      SHOOT1: false,
    };
    this.isRight = false;

    this.life1 = 150;

    this.setControls();
  }
  setControls() {
    addEventListener("keydown", (event) => {
      switch (event.code) {
        case this.keys1.JUMP1:
          this.pressedControl.JUMP1 = true;

          break;
        case this.keys1.RIGHT1:
          this.pressedControl.RIGHT1 = true;

          break;
        case this.keys1.SHOOT1:
          this.pressedControl.SHOOT1 = true;

          break;
        case this.keys1.LEFT1:
          this.pressedControl.LEFT1 = true;

          break;
      }
    });
    addEventListener("keyup", (event) => {
      switch (event.code) {
        case this.keys1.RIGHT1:
          this.pressedControl.RIGHT1 = false;

          break;
        case this.keys1.JUMP1:
          this.pressedControl.JUMP1 = false;

          break;
        case this.keys1.LEFT1:
          this.pressedControl.LEFT1 = false;

          break;
        case this.keys1.SHOOT1:
          this.pressedControl.SHOOT1 = false;
          this.shoot();
          this.bulletAudio.play();

          break;
      }
    });
  }
  move() {
    //Limites movimiento Player1
    //laterales
    if (
      this.x + this.vx < -70 ||
      this.x + this.width + this.vx > innerWidth + 70
    ) {
      this.vx = 0;
    }
    //superior
    if (this.y + this.vy < -90) {
      this.vy = 0;
    }
    this.gravity = 8;
    this.vy += this.gravity;
    this.y += this.vy;
    this.x += this.vx;
    //limite floor player1
    if (this.y >= this.y0) {
      this.vy = 0;
      this.y = this.y0;
    }
    //Movimiento player (WASD)
    if (this.pressedControl.RIGHT1) {
      this.vx = 10;
    } else if (this.pressedControl.LEFT1) {
      this.vx = -10;
    } else {
      this.vx = 0;
    }
    if (this.pressedControl.JUMP1) {
      this.vy = -15;
    } else {
      this.vy = 0;
    }
  }
  draw(frameCounter) {
    if (this.pressedControl.SHOOT1) {
      this.img.src = "assets/characters/Infantryman/Shot_2left.png";
      this.img.frameCount = 5;
      this.vframeIndex = 15;
    } else if (this.pressedControl.RIGHT1 && this.y === this.y0) {
      this.img.src = "assets/characters/Infantryman/Walkright.png";
      this.img.frameCount = 6;
    } else if (this.pressedControl.LEFT1 && this.y === this.y0) {
      this.img.src = "assets/characters/Infantryman/Walkleft.png";
    } else {
      this.img.src = "assets/characters/Infantryman/Idle.png";
      this.img.frameCount = 6;
    }
    // Pintamos un cada frame del sprite en función del frameIndex
    if (this.isRight) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.img,

        (this.img.width / this.img.frameCount) * this.frameIndex,
        0,
        this.img.width / this.img.frameCount,
        this.img.height,

        -this.x,
        this.y,
        this.width * -1,
        this.height
      );

      this.ctx.restore();
    } else {
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

    this.bullets.forEach((bullet) => {
      bullet.draw();
      bullet.move();
    });

    this.bullets = this.bullets.filter(
      (bullet) => bullet.x - bullet.radius < this.canvasW
    );
    // console.log(this.bullets[0].x)
    this.animateSprite(frameCounter);
  }
  flipPlayer(isRight) {
    this.isRight = isRight;
  }

  // Cambiamos cada 6 frames del juego el frameIndex del sprite para que dibuje el personaje con otra pose
  animateSprite(frameCounter) {
    if (frameCounter % this.vframeIndex === 0) {
      this.frameIndex++;
    }

    if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0;
  }

  shoot() {
    this.bullets.push(
      new Bullet1(
        this.ctx,
        this.width,
        this.height,
        this.x,
        this.y,
        this.y0,
        this.canvasW,
        this.canvasH,
        this.isRight
      )
    );
  }
}
export default Player1;
