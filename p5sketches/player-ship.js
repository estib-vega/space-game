function PlayerShip(x, y){
  this.x = x;
  this.y = y;

  this.velocity = 0;

  this.rotationDelta = 0;

  this.coorX = 0;
  this.coorY = 0;

  this.size = 4;
  this.angle = 0;
  this.show = function(){
    noStroke();
    translate(this.x, this.y);
    rotate(this.angle);
    rectMode(CENTER);

    fill(255 - (222 * this.velocity / 5), 200 - (41 * this.velocity / 5), 0 + (255 * this.velocity / 5));
    rect(-6, 0 + 10, this.size * 2, this.size + (10 * this.velocity / 5));
    rect(6, 0 + 10, this.size * 2, this.size + (10 * this.velocity / 5));
    fill(255);
    rect(0,- 3, this.size, this.size * 8);
    rect(0, 0, this.size * 3, this.size * 3);
    rect(0, 4, this.size * 8, this.size * 2);
    rect(- 17, 0, this.size, this.size * 6);
    rect(17, 0, this.size, this.size * 6);
  }

  this.update = function(){
    // rotate ship
    this.angle += this.rotationDelta;
    /*if(this.angle >= 360){
      this.angle -= 360;
    }
    else if(this.angle < 0){
      this.angle += 360;
    }*/
    // velocity
    if(this.accelerate){
      if(this.velocity <= 4.7){
        this.velocity += 0.3;
      }
    }
    else{
      if(this.velocity >= 0.15){
        this.velocity -= 0.15;
      }
      else{
        this.velocity = 0;
      }
    }
    //console.log("angle: " + this.angle);
  }

  this.rotate = function(direction){
    this.rotationDelta = direction * 2.5;
  }

  this.move = function(accelerate){
    this.accelerate = accelerate;
  }
}
