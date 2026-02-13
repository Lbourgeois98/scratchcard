const canvas = document.getElementById("scratch");
const ctx = canvas.getContext("2d");

canvas.width = 260;
canvas.height = 240;

// Draw silver overlay
const img = new Image();
img.src = "/assets/scratch-silver.png";
img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

// Heart mask
ctx.globalCompositeOperation = "destination-in";
ctx.beginPath();
for (let t = 0; t <= Math.PI * 2; t += 0.01) {
  const x = 130 + 80 * Math.pow(Math.sin(t), 3);
  const y = 120 - (
    60 * Math.cos(t)
    - 25 * Math.cos(2 * t)
    - 10 * Math.cos(3 * t)
    - 5 * Math.cos(4 * t)
  );
  ctx.lineTo(x, y);
}
ctx.closePath();
ctx.fill();

// Enable scratching
ctx.globalCompositeOperation = "destination-out";

let scratching = false;

canvas.addEventListener("touchstart", () => scratching = true);
canvas.addEventListener("touchend", () => scratching = false);
canvas.addEventListener("touchmove", scratch);

function scratch(e) {
  if (!scratching) return;
  const r = canvas.getBoundingClientRect();
  const x = e.touches[0].clientX - r.left;
  const y = e.touches[0].clientY - r.top;

  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.fill();

  checkProgress();
}

function checkProgress() {
  const data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  let cleared = 0;
  for (let i=3;i<data.length;i+=4) {
    if (data[i] === 0) cleared++;
  }
  if (cleared / (canvas.width * canvas.height) > 0.7) {
    unlock();
  }
}
