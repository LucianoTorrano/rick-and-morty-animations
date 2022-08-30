window.addEventListener("load", () => {
  const canvas = document.getElementById("lightningAnimation");
  const ctx = canvas.getContext('2d');

  canvas.height = 300;
  canvas.width = 500;


  class Lightning {
    constructor(canvasWidth, canvasHeight){
        this.image = document.getElementById('lightningImg');
        this.spriteWidth = 225;
        this.spriteHeight= 280;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.scale = 1;
        this.x= this.canvasWidth/2 - this.width*this.scale/2;
        this.y=0;
        this.minFrame = 0;
        this.maxFrame = 3;
        this.frameX = 0;
        this.frameY = 0;
    }
    draw(context){
        context.drawImage(this.image,this.spriteWidth * this.frameX ,this.spriteHeight*this.frameY,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width * this.scale, this.height*this.scale)
    }
    update(){
        if(this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
    }
  }

  const lightning = new Lightning(canvas.width,canvas.height);

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    lightning.draw(ctx);
    lightning.update();
    //requestAnimationFrame(animate);
  }

  animate();
});
