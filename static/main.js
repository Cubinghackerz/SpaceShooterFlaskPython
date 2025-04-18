document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  let player = {
    x: canvasWidth / 2 - 15,
    y: canvasHeight - 60,
    width: 30,
    height: 30,
    speed: 5,
    angle: 0,
    color: "white"
  };

  let bullets = [];
  let keys = {};
  let autoFire = false;
  let autoSpin = false;

  document.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    if (e.key === " ") fireBullet();
    if (e.key === "e") autoFire = !autoFire;
    if (e.key === "q") autoSpin = !autoSpin;
  });

  document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  canvas.addEventListener("click", () => {
    fireBullet();
  });

  function fireBullet() {
    bullets.push({
      x: player.x + player.width / 2 - 2,
      y: player.y,
      width: 4,
      height: 10,
      speed: 7,
      color: "red"
    });
  }

  function update() {
    if (keys["ArrowLeft"] && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys["ArrowRight"] && player.x + player.width < canvasWidth) {
      player.x += player.speed;
    }

    if (autoSpin) {
      player.angle += 0.1;
    }

    if (autoFire && performance.now() % 10 < 1) {
      fireBullet();
    }

    bullets.forEach((bullet) => {
      bullet.y -= bullet.speed;
    });

    bullets = bullets.filter((b) => b.y + b.height > 0);
  }

  function drawPlayer() {
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    ctx.rotate(player.angle);
    ctx.fillStyle = player.color;
    ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
    ctx.restore();
  }

  function drawBullets() {
    bullets.forEach((bullet) => {
      ctx.fillStyle = bullet.color;
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    update();
    drawPlayer();
    drawBullets();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
