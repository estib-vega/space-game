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

  this.addedRadius = 0;

  this.show = function(){
    noStroke();
    fill(this.r, this.g, this.b);
    ellipseMode(RADIUS);
    ellipse(this.currX, this.currY, this.radius + this.addedRadius / 8, this.radius + this.addedRadius / 8);
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
    this.currX = this.x - (this.orbitLengthX + this.addedRadius * 2) * Math.cos(this.orbitalTimer);
    this.currY = this.y - (this.orbitLengthY + this.addedRadius * 2) * Math.sin(this.orbitalTimer);

    this.orbitalTimer += 0.1 / this.radius;
  }

  this.setAddedRadius = function(add){
    this.addedRadius = add;
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

  this.isEnteringPlanet = false;
  this.isExitingPlanet = false;
  this.isInsidePlanet = false;
  this.addedRadius = 0;
  this.maxRadius = 0;

  this.sig = function(x){
    return 1 / (1 + Math.exp(-x));
  }

  // proceduarally generated color
  this.r = 255 * Math.abs(Math.cos(coordX - 200 * this.sig(Math.cos(coordX) + Math.sin(coordY))));
  this.g = 255 * Math.abs(Math.sin(coordY - 280 * this.sig(Math.cos(coordX) + Math.sin(coordY))));
  this.b = 255 * this.sig(Math.cos(coordX) + Math.sin(coordY));

  this.r = parseInt(this.r);
  this.g = parseInt(this.g);
  this.b = parseInt(this.b);

  // procedurally generated moons
  this.moonNumber = parseInt(3 *  Math.abs(Math.cos(coordX)) + 2 *  Math.abs(Math.sin(coordY)));

  if(this.moonNumber > 0){
    for(var i = 0; i < this.moonNumber; i++){
      var r = this.radius / 8 + i * 2;
      var xOrbit = this.radius + 25 + i * 40 + r;
      var yOrbit = this.radius + 50 + i * 40 + r;
      var rOffset = 100 + 25 * i;

      this.moons.push(new Moon(this.x, this.y, r, [this.b + 100, this.g, Math.abs(this.r - rOffset)], xOrbit, yOrbit));
    }
  }

  this.show = function(){
    noStroke();
    fill(this.r, this.g, this.b);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.radius + this.addedRadius, this.radius + this.addedRadius);

    if(this.moonNumber > 0){
      for(var i = 0; i < this.moonNumber; i++){
        this.moons[i].show();
      }
    }

  }

  this.update = function(){
    if(!this.isEnteringPlanet && !this.isExitingPlanet){
      this.x += this.dirX * this.velocity;
      this.y += this.dirY * this.velocity;
    }
    else if(this.isEnteringPlanet){
      this.addedRadius += this.maxRadius / 100;
      if(this.moonNumber > 0){
        for(var i = 0; i < this.moonNumber; i++){
          this.moons[i].setAddedRadius(this.addedRadius);
        }
      }
      if(this.addedRadius + this.radius >= this.maxRadius){
        this.isEnteringPlanet = false
        this.isInsidePlanet = true;
      }
    }
    else if(this.isExitingPlanet){
      this.addedRadius -= 5;
      if(this.moonNumber > 0){
        for(var i = 0; i < this.moonNumber; i++){
          this.moons[i].setAddedRadius(this.addedRadius);
        }
      }
      if(this.addedRadius <= 0){
        this.maxRadius = 0;
        this.isExitingPlanet = false
        this.isInsidePlanet = false;
      }
    }

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

  this.enterPlanet = function(){
    this.isEnteringPlanet = true;
    let a = this.x >= this.y ? this.x : this.y;
    let b = this.x >= this.y ? height - (this.y - this.radius) : width - (this.x - this.radius);
    this.maxRadius = Math.sqrt(a*a + b*b);
  }

  this.exitPlanet = function(){
    //console.log("EnterPlanet - exit planet");
    this.isExitingPlanet = true;
  }

}

function PlanetManager(){
  this.planets = [];

  this.xCoor;
  this.yCoor;

  this.dirX = 0;
  this.dirY = 1;
  this.velocity = 0;

  this.dimention = 900;
  this.dimentionCheck = 900;

  this.planetEntered;
  this.isEnteringPlanet = false;

  // procedurally generated planets.
  this.generatePlanets = function(xCoor, yCoor, dir){
    // mantain only the 5 last generated planets at all times
    if(this.planets.length > 1){
      this.planets.splice(0,1);
    }

    let quadrantSize = this.dimention * 2;

    // if this is the initial-check for the quadrant,
    // then the 'center' is the coordinate x and the coordinate y
    // of the player. Else, check which side was the quadrant left from.
    if(dir){
      switch (dir) {
        case 1: // left
          this.xCoor -= quadrantSize;
          break;
        case 2: // right
          this.xCoor += quadrantSize;
          break;
        case 3: // bottom
          this.yCoor -= quadrantSize;
          break;
        case 4: // top
        this.yCoor += quadrantSize;
          break;
        default:

      }
    }
    else{
      this.xCoor = xCoor;
      this.yCoor = yCoor;
    }

    var x, y, currX, currY;
    var endedPlanetGeneration = false;

    // start from the top left

    let xMax = parseInt(this.xCoor) + this.dimention;
    let xMin = parseInt(this.xCoor) - this.dimention;
    let yMin = parseInt(this.yCoor) - this.dimention;

    x = xMin;
    y = parseInt(this.yCoor) + this.dimention;


    /*
    find the x
    if there's an x, the find the y

    one x and one y every quadrant

    */

    for(var i = 0; i < quadrantSize; i++){
      if(Math.abs(x) % quadrantSize  == this.dimentionCheck){
          currX = width / 2 + ((x - x /12) - xCoor);
          for(var i = 0; i < quadrantSize; i++){
            if(Math.abs(y) % quadrantSize  == this.dimentionCheck){
                currY = height / 2 - ((y + y /12) - yCoor);
                break;
            }
            y--;
          }
          break;
      }
      x++;
    }
    this.planets.push(new Planet(currX, currY, (x - x /12), (y + y /12)));

    /*console.log("quadrant x: " + this.xCoor + " y: " + this.yCoor);
    for(var i = 0; i < this.planets.length; i++){
      console.log("x: " + this.planets[i].coordX + " y: " + this.planets[i].coordY);
    }*/

  }



  this.show = function(){
    if(this.planets.length < 1){
      return;
    }

    for(var i = 0; i < this.planets.length; i++){
      this.planets[i].show();
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

    // check if the ship has exited the quadrant of planets so that it generates
    // a new array of planets

    if(xCoor < this.xCoor - this.dimention){
      // left
      this.generatePlanets(xCoor, yCoor, 1);
    }
    else if(xCoor > this.xCoor + this.dimention){
      // right
      this.generatePlanets(xCoor, yCoor, 2);
    }
    else if(yCoor < this.yCoor - this.dimention){
      // bottom
      this.generatePlanets(xCoor, yCoor, 3);
    }
    else if(yCoor > this.yCoor + this.dimention){
      // top
      this.generatePlanets(xCoor, yCoor, 4);
    }

  }

  this.enterPlanet = function(xCoor, yCoor){
    var pXMin, pXMax, pYMin, pXMax;
    if(this.planets.length > 0){
      for(var planet = 0; planet < this.planets.length; planet++){
        pXMin = this.planets[planet].coordX - this.planets[planet].radius;
        pXMax = this.planets[planet].coordX + this.planets[planet].radius;
        pYMin = this.planets[planet].coordY - this.planets[planet].radius;
        pYMax = this.planets[planet].coordY + this.planets[planet].radius;

        if(xCoor <= pXMax && xCoor >= pXMin && yCoor <= pYMax && yCoor >= pYMin){
          //console.log("Entering planet...");
          this.isEnteringPlanet = true;
          this.planetEntered = this.planets[planet];
          this.planets[planet].enterPlanet();
        }
      }
    }
  }

  this.exitPlanet = function(){
    //console.log("PlanetManager - exit planet");
    this.planetEntered.exitPlanet();
    this.dirX = 0;
    this.dirY = 1;
  }

  this.isInsidePlanet = function(){
    if(this.planetEntered && this.planetEntered.isInsidePlanet){
      this.isEnteringPlanet = false;
    }
    return this.planetEntered ? this.planetEntered.isInsidePlanet : false;
  }

}
