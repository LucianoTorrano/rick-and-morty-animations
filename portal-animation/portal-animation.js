const slimeCanvas = document.getElementById("slimeCanvas");
const ctx = slimeCanvas.getContext("2d");
slimeCanvas.height = window.innerHeight;
slimeCanvas.width = window.innerWidth;

const colors = ['#6BDD4B', '#B0E343','#36D17D']; //0A8643

class SlimeParticle{
  constructor(slimeEffect, color) {
    this.effect = slimeEffect;
    this.radius = Math.random() * 60 + 20;
    this.x = this.radius * 2 + (Math.random() * (this.effect.width - this.radius * 4));
    this.y = -4*this.radius;
    this.speedX = (Math.random() - .5) *.1 ;
    this.speedY = Math.random() * 1.5;
    this.gravity = Math.random() * 0.0001;
    this.vy = 0;
    this.color = color;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
  update(){
    if(this.x < this.radius || this.x > this.effect.width - this.radius)this.speedX*=-1;
    if(this.y > this.effect.height + this.radius){
      //programar rebote
      this.y = -2*this.radius;
      this.vy = 0;
      this.speedY = Math.random() * this.radius/9;
    }
    if(this.y > this.radius * 2){
      this.vy += this.gravity;
      this.speedY += this.vy;  
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }
  reset(){
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
  }
}

 class SlimeEffect{
  constructor(width,height,colors){
    this.width = width;
    this.height = height;
    this.slimeArray = [];
    this.colors = colors;
  }
  init(numberOfSlimes){
    for(let i = 0; i < numberOfSlimes; i++){
      let colorIndex = Math.floor(Math.random()*3.9);
      this.slimeArray.push(new SlimeParticle(this, this.colors[colorIndex]));
    }
  }
  update(){
    this.slimeArray.forEach(slime => slime.update());
  }
  draw(context){
    this.slimeArray.forEach(slime => slime.draw(context));
  }
  reset(newWidth,newHeight){
    this.width = newWidth;
    this.height = newHeight;
    this.slimeArray.forEach(slime => slime.reset());
  }
}

const effect = new SlimeEffect(slimeCanvas.width,slimeCanvas.height,colors);
effect.init(120);

function animate(){
  ctx.clearRect(0,0,slimeCanvas.width,slimeCanvas.height);
  effect.update()
  effect.draw(ctx);
  requestAnimationFrame(animate);  
}
animate();

window.addEventListener('resize',()=>{
  slimeCanvas.width = window.innerWidth;
  slimeCanvas.height = window.innerHeight;
  ctx.fillStyle= '#A0B48D';
  effect.reset(slimeCanvas.width,slimeCanvas.height);
})
/*

class Star {
  constructor(positionX, positionY, color = "white") {
    this.radius = Math.random() * 4;
    this.x = positionX;
    this.y = positionY;
    this.color = color;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}
let stars = [];
const maxStars = 90;

for (let i = 0; i < maxStars; i++) {
  x = Math.random() * slimeCanvas.width;
  y = Math.random() * slimeCanvas.height;
  stars.push(new Star(x, y));
}

// Draw stars
stars.forEach((star) => star.draw(ctx));
*/