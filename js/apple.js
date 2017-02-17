const Apple= function(xpos,ypos ,speed, ctx){
    this.xpos= xpos;
    this.ypos= ypos;
    this.ctx= ctx;
    this.width=90;
    this.height= 64;
    this.speed = speed;
    this.death= false;
    this.bgapple= document.getElementById('app');

};

Apple.prototype.update = function(bird){
    this.xpos -= this.speed;
    checkAppleCollisions(bird, this);
    console.log("dgdhhe");
};

Apple.prototype.render= function(){
    if (!this.death){
        this.ctx.drawImage(this.bgapple, this.xpos-this.width/2 , this.ypos-this.height/2);

    }


}
