function PlayerShip(x, y){
  this.x = x;
  this.y = y;

  this.velocity = 0;

  this.rotationDelta = 0;

  this.size = 4;
  this.angle = 0;

  this.show = function(){
    var angle = this.angle * Math.PI / 180;

    var x2 = - Math.sin(angle) * this.velocity * 2;
    var y2 = Math.cos(angle) * this.velocity * 2;

    noStroke();
    translate(this.x - x2, this.y - y2);
    rotate(this.angle);
    rectMode(CENTER);

    fill(255 - (222 * this.velocity / 4), 200 - (41 * this.velocity / 4), 0 + (255 * this.velocity / 4));

    rect(-6, 0 + 10 + (5 * this.velocity / 4), this.size * 2, this.size + (10 * this.velocity / 4));
    rect(6, 0 + 10 + (5 * this.velocity / 4), this.size * 2, this.size + (10 * this.velocity / 4));

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

    // velocity
    if(this.accelerate){
      if(this.velocity <= 3.7){
        this.velocity += 0.3;
      }
    }
    else{
      if(this.velocity >= 0.15){
        this.velocity -= 0.1;
      }
      else{
        this.velocity = 0;
      }
    }
  }

  this.rotate = function(direction){
    this.rotationDelta = direction * 2.5;
  }

  this.move = function(accelerate){
    this.accelerate = accelerate;
  }
}
