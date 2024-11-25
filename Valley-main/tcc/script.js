const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ["#ffffff", "#aaaaaa", "#555555"];

// Atualiza o tamanho do canvas em caso de redimensionamento
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Função para gerar partículas
function Particle(x, y, size, color, velocityX, velocityY) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Particle.prototype.update = function () {
  this.x += this.velocityX;
  this.y += this.velocityY;

  // Reposiciona a partícula se sair dos limites
  if (this.x < 0 || this.x > canvas.width) {
    this.velocityX *= -1;
  }
  if (this.y < 0 || this.y > canvas.height) {
    this.velocityY *= -1;
  }
};

// Inicializa as partículas
function init() {
  particlesArray.length = 0;
  const numberOfParticles = 150; // Quantidade de partículas
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocityX = (Math.random() - 0.5) * 0.7;
    const velocityY = (Math.random() - 0.5) * 0.7;
    particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
  }
}

// Anima as partículas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  requestAnimationFrame(animate);
}

init();
animate();
