document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  let x = canvas.width / 2;
  let y = canvas.height - 40;
  let bullets = [];
  let keys = {};

  document.addEventListener("keydown", (e) => keys[e.key] = true);
  document.addEventListener("keyup", (e) => keys[e.key] = false);

  function drawPlayer() {
    ctx.fillStyle = "white";
    ctx.fillRect(x - 15, y, 30, 30);
  }

  function drawBullets() {
    ctx.fillStyle = "red";
    bullets = bullets.filter(b => b.y > 0);
    bullets.forEach(b => {
      b.y -= 5;
      ctx.fillRect(b.x - 2, b.y, 4, 10);
    });
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (keys["ArrowLeft"] && x > 0) x -= 5;
    if (keys["ArrowRight"] && x < canvas.width) x += 5;
    if (keys[" "] && bullets.length < 5) bullets.push({ x: x, y: y });

    drawPlayer();
    drawBullets();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
