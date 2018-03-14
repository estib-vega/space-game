function PlayerShip(){
  this.x = width / 2;
  this.y = height / 2;

  this.velocity = 0;

  this.rotationDelta = 0;

  this.size = 4;
  this.angle = 0;

  this.positionInLowerEnd = false;
  this.isInPlanet = false;
  this.direction = 0;

  this.positionInCenter = false;
  this.positionXDelta = 0;

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

    fill(255, 20, 125);

    rect(0,- 3, this.size, this.size * 8);
    rect(0, 0, this.size * 3, this.size * 3);
    rect(0, 4, this.size * 8, this.size * 2);
    rect(- 17, 0, this.size, this.size * 6);
    rect(17, 0, this.size, this.size * 6);
  }

  this.update = function(){
    if(!this.isInPlanet){
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
    else{
      if(this.x >= 50 && this.x <= width - 50){
        this.x += this.direction * 10;
      }
      else{
        if(this.x < 50){
          this.x = 50;
        }
        else if(this.x > width - 50){
          this.x = width - 50;
        }
      }

    }


    // position in lower end
    if(this.positionInLowerEnd){
      var positionEnded = false;
      var angleEnded = false;

      if(this.angle % 360 == 0){
        angleEnded = true;
      }
      else{
        this.angle = parseInt(this.angle) + (360 - parseInt(this.angle) % 360);
      }

      if(this.y >= height - 40){
        positionEnded = true;
      }
      else{
        this.y += 10;
      }

      if(positionEnded && angleEnded){
        this.positionInLowerEnd = false;
        this.isInPlanet = true;
      }

    }
    else if(this.positionInCenter){
      // position in center
      var positionYEnded = false;
      var positionXEnded = false;

      if(this.x == width / 2){
        positionXEnded = true;
      }
      else{
        if(Math.abs(this.x - (width /2)) < 0.2){
          this.x = width / 2;
        }
        else{
          if(this.x < width / 2){
            this.x += this.positionXDelta;
          }
          else{
            this.x -= this.positionXDelta;
          }
        }
      }
      if(this.y == height / 2){
        positionYEnded = true;
      }
      else{
        this.y -= 10;
      }

      if(positionYEnded && positionXEnded){
        this.positionInCenter = false;
        this.isInPlanet = false;
        this.rotationDelta = 0;
      }
    }

  }

  this.rotate = function(direction){
    this.rotationDelta = direction * 2.5;
  }

  this.directionSet = function(dir){
    this.direction = dir;
  }

  this.move = function(accelerate){
    this.accelerate = accelerate;
  }

  this.moveToLowerEnd = function(){
    this.positionInLowerEnd = true;
  }

  this.moveToCenter = function(){
    this.positionXDelta = Math.abs(this.x - (width / 2)) / 35;
    this.positionInCenter = true;
  }

  this.completeStop = function(){
    this.velocity = 0;
  }

  this.shoot = function(){
    console.log("shoot");
  }
}
