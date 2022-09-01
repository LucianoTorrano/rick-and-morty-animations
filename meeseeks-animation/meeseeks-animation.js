window.addEventListener("load", () => {
    const canvas = document.getElementById("meeseeksAnimation");
    const ctx = canvas.getContext('2d');
  
    canvas.height = 800;
    canvas.width = 800;
  
  
    class Meeseeks {
      constructor(canvasWidth, canvasHeight){
          this.image = document.getElementById('meeseeksSprite');
          this.spriteWidth = 200;
          this.spriteHeight= 200;
          this.width = this.spriteWidth;
          this.height = this.spriteHeight;
          this.canvasWidth = canvasWidth;
          this.canvasHeight = canvasHeight;
          this.scale = 4;
          this.x= this.canvasWidth/2 - this.width*this.scale/2;
          this.y= this.canvasHeight/2 - this.height * this.scale/2;
          this.minFrame = 0;
          this.maxFrame = 60;
          this.frameX = 0;
          this.frameY = 0;
      }
      draw(context){
          context.drawImage(this.image,this.spriteWidth * this.frameX ,this.spriteHeight*this.frameY,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width * this.scale, this.height*this.scale)
      }
      update(){
          if(this.frameX < this.maxFrame) this.frameX++;
          //else this.frameX = 0;
      }
    }
  
    const meeseeks = new Meeseeks(canvas.width,canvas.height);
  
    function animate(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      meeseeks.draw(ctx);
      meeseeks.update();
      requestAnimationFrame(animate);
    }
    animate();
  });
  