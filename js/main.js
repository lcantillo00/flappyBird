window.onload = function(){
  const c = document.getElementById('canvas');
  c.width = window.innerWidth;
  c.height = 600;

 const ctx = c.getContext('2d');

 const environment = new Environment(c, ctx);
  const bird = new Bird(250, 300, ctx);
  const pipes = [];
  var apple= new Apple(450, 300, 2, ctx);

   setInterval(function(){
       apple = new Apple ((Math.random()*200)+250, (Math.random()*200)+300, 2, ctx);
   },3000);
  setInterval(function(){
    let pipeSet = generateRandomPipes(ctx, c.width, c.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
  }, 3000);

  gameLoop();


 /*
   MAIN GAME LOOP
  */
  function gameLoop(){
    ctx.fillRect(0,0,c.width,c.height);
    environment.update();
    environment.render();
    pipes.forEach(function(pipe1){
      pipe1.update();
      pipe1.render();
    });
    bird.update();
    bird.render();
    apple.update(bird);
    apple.render();
    if (detectCollisions(bird, pipes)) {
        drawGameOver(ctx, c);
        return;

    }
    if(checkCanvasCollision(bird)){
        console.log("you lose");
        drawGameOver(ctx, c);
        return;


    }

    // if(checkAppleCollisions(bird,apple)){
    //
    //     window.location= '/';
    // }
    window.requestAnimationFrame(gameLoop);
  }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight){
  let lengthTop = Math.round(Math.random()*200+50);
  let lengthBottom = canvasHeight - 200 - lengthTop;
  let returnVal = { };
  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
  returnVal.bottom = new Pipe(canvasWidth, canvasHeight+5-lengthBottom, lengthBottom, 4, ctx);
  return returnVal;
}

function detectCollisions(bird, pipes){
  for(var i = 0; i < pipes.length; i++){
    let e = pipes[i];
    let highPipe = e.ypos <= 0;
    let x0 = e.xpos, x1 = e.xpos+e.width;
    if (highPipe ){
      let y0 = e.ypos + e.length;
      let alpha = bird.x;
      let beta = bird.y - bird.height/2;
      if (alpha > x0 && alpha < x1 && beta < y0){
        return true;
      }
    }
    else{
      let y2 = e.ypos;
      let a = bird.x;
      let b = bird.y + bird.height/2;
      if (a > x0 && a < x1 && b > y2) return true;
    }
  }
  return false;
}

function checkAppleCollisions(bird, apple){
     let dx = apple.xpos-bird.x;
     let dy= apple.ypos-bird.y;
     let distance= Math.sqrt(dx*dx+dy*dy);
     let distcollision=(bird.width/2+apple.width/2);
     if (distance < (distcollision-40) && apple.death===false){
         bird.score +=2 ;
         apple.death=true;
        return true;
     }

}
function checkCanvasCollision(bird){
    let bottomdist= bird.y + bird.height/2;

    if (bottomdist>= 600){
        return true;
    }


}
function drawGameOver(ctx, c){
  ctx.font="30px Verdana";
  ctx.textAlign="center";
  ctx.fillText("Game Over!!",c.width/2 , c.height/2);
  document.getElementById('canvas').onclick=function(){
     location.reload();
  }

}
