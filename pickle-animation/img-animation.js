const pickleImg = document.getElementById("pickleImg");
const container = document.getElementById("contenedor-pickles");
const canvas = document.getElementById("img-canvas");
const c = canvas.getContext("2d");

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

class ObjectBG {
  constructor({ image, x, y, speedX = 0, speedY = 0, scale }) {
    this.x = x + image.width / 2;
    this.y = y + image.height / 2;
    this.initX = x;
    this.initY = y;
    this.image = image;
    this.scale = scale;
    this.width = image.width * this.scale;
    this.height = image.height * this.scale;
    this.size = image.width * this.scale;
    this.density = this.size;
    this.movement = {
      speedX: (speedX * this.size) / 10,
      speedY: (speedY * this.size)/10,
    };
  }
  draw() {
    c.drawImage(
      this.image,
      this.x - this.image.width / 2.5,
      this.y - this.image.height / 2.5,
      this.width,
      this.height
    );
  }
  update() {
    this.x += this.movement.speedX;
    this.y += this.movement.speedY;
    this.draw();
    if(this.x > canvas.width *1.5){
        this.y = this.initY + canvas.width/2;
        this.x = this.initX - canvas.width/2;
    }
}
}
let pickles = [];
const maxPickles = 90;

for (let i = 0; i < maxPickles; i++) {
  let posX = (Math.random()-.5) * canvas.width;
  let posY = Math.random() * canvas.height * 2.5;
  let speedX = .5;
  let speedY = -.5;
  let scale = Math.random() / 2;
  pickles.push(
    new ObjectBG({
      image: pickleImg,
      x: posX,
      y: posY,
      speedX: speedX,
      speedY: speedY,
      scale: scale
    })
  );
}

function animate() {
  requestAnimationFrame(animate);
  c.fillRect(0, 0, canvas.width, canvas.height);

  pickles.forEach((pickle) => {
    pickle.update();
  });
}

window.addEventListener('resize',()=>{
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
})

animate();