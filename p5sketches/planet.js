function Moon(x, y, radius, color, orbitLengthX, orbitLengthY){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.orbitLengthX = orbitLengthX;
  this.orbitLengthY = orbitLengthY;

  this.currX = x;
  this.currY = y;

  this.r = color[0];
  this.g = color[1];
  this.b = color[2];

  this.dirX = 0;
  this.dirY = 0;

  this.velocity = 0;
  this.orbitalTimer = radius;

  this.show = function(){
    noStroke();
    fill(this.r, this.g, this.b);
    ellipseMode(RADIUS);
    ellipse(this.currX, this.currY, this.radius, this.radius);
  }

  this.update = function(){
    this.x += this.dirX * this.velocity;
    this.y += this.dirY * this.velocity;

    this.orbit();
  }

  this.move = function (dirX, dirY, velocity){
    this.dirX = dirX;
    this.dirY = dirY;
    this.velocity = velocity;
  }

  this.orbit = function(){
    this.currX = this.x - this.orbitLengthX * Math.cos(this.orbitalTimer);
    this.currY = this.y - this.orbitLengthY * Math.sin(this.orbitalTimer);

    this.orbitalTimer += 0.1 / this.radius;

  }

}

function Planet(x, y, coordX, coordY){
  this.moons = [];
  this.moonNumber;

  this.x = x;
  this.y = y;
  this.radius = 60 + Math.abs(Math.cos(coordX)) * 50;
  this.size = 3;

  this.coordX = coordX;
  this.coordY = coordY;

  this.velocity = 0;

  this.dirX = 0;
  this.dirY = 0;

  this.sig = function(x){
    return 1 / (1 + Math.exp(-x));
  }

  // proceduarally generated color
  this.r = 100 * Math.abs(this.sig(coordX)); 
  this.g = 200 * Math.abs(this.sig(coordY));
  this.b = 50;

  // procedurally generated moons
  this.moonNumber = parseInt(5 *  Math.abs(Math.cos(coordX)) + 2 *  Math.abs(Math.sin(coordY)));

  if(this.moonNumber > 0){
    for(var i = 0; i < this.moonNumber; i++){
      var r = this.radius / 8 + i * 2;
      var xOrbit = this.radius + 25 + i * 40 + r;
      var yOrbit = this.radius + 50 + i * 40 + r;
      var rOffset = 100 + 25 * i;
      var bOffset = 150 + 35 * i;

      this.moons.push(new Moon(this.x, this.y, r, [this.b + 100, this.g, Math.abs(this.r - rOffset)], xOrbit, yOrbit));
    }
  }

  this.show = function(){
    noStroke();
    fill(70 + this.r, 50 + this.g, 100 + this.b);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.radius, this.radius);

    if(this.moonNumber > 0){
      for(var i = 0; i < this.moonNumber; i++){
        this.moons[i].show();
      }
    }

  }

  this.update = function(){
    this.x += this.dirX * this.velocity;
    this.y += this.dirY * this.velocity;

    if(this.moonNumber > 0){
      for(var i = 0; i < this.moonNumber; i++){
        this.moons[i].update()
      }
    }

  }

  this.move = function(dirX, dirY, velocity){
    this.dirX = dirX;
    this.dirY = dirY;
    this.velocity = this.size * velocity;

    if(this.moonNumber > 0){
      for(var j = 0; j < this.moonNumber; j++){
        this.moons[j].move(dirX, dirY, this.size * velocity);
      }
    }

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

  var x = 5;
  var y = -300;

  console.log(x + " " + y);

  var currX = width / 2 + (x - this.xCoor);
  var currY = height / 2 - (y - this.yCoor);
  this.planets.push(new Planet(currX, currY, x, y));
  this.planetsToPaint.push(false);

  //-----

  x = -300;
  y = -300;

  console.log(x + " " + y);

  currX = width / 2 + (x - this.xCoor);
  currY = height / 2 - (y - this.yCoor);
  this.planets.push(new Planet(currX, currY, x, y));
  this.planetsToPaint.push(false);

  x = 300;
  y = 300;

  console.log(x + " " + y);

  currX = width / 2 + (x - this.xCoor);
  currY = height / 2 - (y - this.yCoor);
  this.planets.push(new Planet(currX, currY, x, y));
  this.planetsToPaint.push(false);

  x = -300;
  y = 300;

  console.log(x + " " + y);

  currX = width / 2 + (x - this.xCoor);
  currY = height / 2 - (y - this.yCoor);
  this.planets.push(new Planet(currX, currY, x, y));
  this.planetsToPaint.push(false);

  this.show = function(){
    if(this.planets.length < 1){
      return;
    }

    for(var i = 0; i < this.planets.length; i++){
      if(this.planetsToPaint[i]){
        this.planets[i].show();
      }
    }
  }

  this.update = function(){
    if(this.planets.length < 1){
      return;
    }

    for(var i = 0; i < this.planets.length; i++){
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
      for(var planet = 0; planet < this.planets.length; planet++){
        if(xCoor >= (this.planets[planet].coordX - width) && xCoor <= (this.planets[planet].coordX + width) && yCoor >= (this.planets[planet].coordY - height) && yCoor <= (this.planets[planet].coordY + height)){
          this.planetsToPaint[planet] = true;
          //console.log("paint");
        }
        else{
          this.planetsToPaint[planet] = false;
          //console.log("dont paint");
        }
      }
    }

  }
}
