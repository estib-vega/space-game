function Planet(x, y, radius, coordX, coordY){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.size = 3;

  this.coordX = coordX;
  this.coordY = coordY;

  this.velocity = 0;

  this.dirX = 0;
  this.dirY = 0;

  this.sig = function(x){
    return 1 / (1 + Math.exp(-x));
  }

  this.r = 127 * this.sig(coordX);
  this.g = 127 * this.sig(coordY);
  this.b = this.r + this.g / 30;

  this.show = function(){
    noStroke();
    fill(128 + this.r, 128 + this.g, 128 + this.b);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.radius, this.radius);

  }

  this.update = function(){
    this.x += this.dirX * this.velocity;
    this.y += this.dirY * this.velocity;

  }

  this.move = function(dirX, dirY, velocity){
    this.dirX = dirX;
    this.dirY = dirY;
    this.velocity = this.size * velocity;
  }

}

function PlanetManager(xr, yr){
  this.planets = [];
  this.planetsToPaint = [];
  this.paintPlanet = false;

  this.xCoor = xr;
  this.yCoor = yr;

  this.dirX = 0;
  this.dirY = 1;
  this.velocity = 0;

  var x = -24;
  var y = 27;

  var currX = width / 2 + (x - this.xCoor);
  var currY = height / 2 + (y + this.yCoor);
  this.planets.push(new Planet(currX, currY, 60, x, y));
  this.planetsToPaint.push(false);

  this.show = function(){
    if(this.planets.length < 1){
      return;
    }

    for(i = 0; i < this.planets.length; i++){
      if(this.planetsToPaint[i]){
        this.planets[i].show();
      }
    }
  }

  this.update = function(){
    if(this.planets.length < 1){
      return;
    }

    for(i = 0; i < this.planets.length; i++){
      this.planets[i].move(this.dirX, this.dirY, this.velocity);
      this.planets[i].update();
    }
  }

  this.move = function(delta, velocity, xCoor, yCoor){
    this.velocity = velocity;

    var angle = delta * Math.PI / 180;

    var x2 = Math.cos(angle) * this.dirX - Math.sin(angle) * this.dirY;
    var y2 = Math.sin(angle) * this.dirX + Math.cos(angle) * this.dirY;
    this.dirX = x2;
    this.dirY = y2;

    // paint planets
    if(this.planets.length > 0){
      for(i = 0; i < this.planets.length; i++){
        if(xCoor >= (this.planets[i].coordX - width) && xCoor <= (this.planets[i].coordX + width) && yCoor >= (this.planets[i].coordY - height) && yCoor <= (this.planets[i].coordY + height)){
          this.planetsToPaint[i] = true;
        }
        else{
          this.planetsToPaint[i] = false;
        }
      }
    }

  }
}
