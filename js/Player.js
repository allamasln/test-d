import Bullet from "./Bullet.js";

class Player {
  constructor(ctx, canvasW, canvasH, keys) {
    this.ctx = ctx;
    this.keys = keys;

    this.canvasW = canvasW;
    this.canvasH = canvasH;

    this.x0 = canvasW * 0.09;
    this.x = this.x0;

    this.y0 = canvasH * 0.61;
    this.y = this.y0;

    this.vy = 0;
    this.vx = 0;

    this.img = new Image();

    this.img.src = "assets/characters/Destroyer/Idle.png";

    this.img.frameCount = 5;
    this.frameIndex = 0;

    this.width = 200;
    this.height = 220;

    this.bullets = [];

    this.jumpAudio = new Audio("../assets/sounds/jump.wav");
    this.jumpAudio.volume = 1;

    this.bulletAudio = new Audio("../assets/sounds/bullet.wav");
    this.bulletAudio.volume = 1;

    this.pressedControl = {
      RIGHT: false,
      JUMP: false,
      LEFT: false,
      SHOOT: false,
    };
    (this.isRight = false), (this.life = 150), this.setControls();
  }

  setControls() {
    addEventListener("keydown", (event) => {
      switch (event.code) {
        case this.keys.JUMP:
          this.pressedControl.JUMP = true;
          break;
        case this.keys.RIGHT:
          this.pressedControl.RIGHT = true;

          break;
        case this.keys.SHOOT:
          this.pressedControl.SHOOT = true;

          break;
        case this.keys.LEFT:
          this.pressedControl.LEFT = true;

          break;
      }
    });
    addEventListener("keyup", (event) => {
      switch (event.code) {
        case this.keys.RIGHT:
          this.pressedControl.RIGHT = false;

          break;
        case this.keys.JUMP:
          this.pressedControl.JUMP = false;
          break;
        case this.keys.LEFT:
          this.pressedControl.LEFT = false;

          break;
        case this.keys.SHOOT:
          this.pressedControl.SHOOT = false;
          this.shoot();
          this.bulletAudio.play();

          break;
      }
    });
  }

  move() {
    //Limites movimientos Player
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
    //limite player con floor
    if (this.y > this.y0) {
      this.vy = 0;
      this.y = this.y0;
    }
    //Movimiento player (WASD)
    if (this.pressedControl.RIGHT) {
      this.vx = 10;
    } else if (this.pressedControl.LEFT) {
      this.vx = -10;
    } else {
      this.vx = 0;
    }
    if (this.pressedControl.JUMP) {
      this.vy = -15;
    } else {
      this.vy = 0;
    }
  }

  draw(frameCounter) {
    if (this.pressedControl.SHOOT) {
      this.img.src = "assets/characters/Destroyer/Shot_2.png";
      this.img.frameCount = 8;
    } else if (this.pressedControl.RIGHT && this.y === this.y0) {
      this.img.src = "assets/characters/Destroyer/Walk.png";
      this.img.frameCount = 8;
    } else if (this.pressedControl.LEFT && this.y === this.y0) {
      this.img.src = "assets/characters/Destroyer/Walkleft.png";
      this.img.frameCount = 8;
    } else {
      this.img.src = "assets/characters/Destroyer/Idle.png";
      this.img.frameCount = 5;
    }

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

    // Pintamos un cada frame del sprite en función del frameIndex

    this.bullets.forEach((bullet) => {
      bullet.draw();
      bullet.move();
    });

    this.bullets = this.bullets.filter(
      (bullet) => bullet.x - bullet.radius < this.canvasW
    );
    this.animateSprite(frameCounter);
  }
  flipPlayer(isRight) {
    this.isRight = isRight;
  }

  // Cambiamos cada 6 frames del juego el frameIndex del sprite para que dibuje el personaje con otra pose
  animateSprite(frameCounter) {
    if (frameCounter % 6 === 0) {
      this.frameIndex++;
    }

    if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0;
  }

  shoot() {
    this.bullets.push(
      new Bullet(
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

export default Player;
