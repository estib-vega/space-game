function Path(radius, y, color, xSide){
  this.startPos = xSide <= (width / 2) ? (-width / 2) : (width / 2);
  this.x = width / 2;
  this.y = y;
  this.radius = radius;

  this.maxOffset = this.radius;
  this.xOffset = - this.maxOffset + this.maxOffset * Math.random()
  this.radiusMultiplier = 1.3;

  this.xSide = xSide;

  this.color = color;
  this.colorOffset = 70;
  this.currentR = this.color[0] - this.colorOffset > 0 ? this.color[0] - this.colorOffset : 0;
  this.currentG = this.color[1] - this.colorOffset > 0 ? this.color[1] - this.colorOffset : 0;
  this.currentB = this.color[2] - this.colorOffset > 0 ? this.color[2] - this.colorOffset : 0;

  this.endedMoveOut = false;

  this.show = function(){
    //stroke(255);
    fill(this.currentR, this.currentG, this.currentB);
    ellipseMode(RADIUS);
    ellipse(this.x + this.xOffset + this.startPos, this.y, this.radius * this.radiusMultiplier , this.radius * this.radiusMultiplier);
  }

  this.moveIn = function(inMove){
    if(inMove){
      if(this.startPos != 0){
        if(this.startPos > 0){
          this.startPos -= (width / 2) / 100;
        }
        else{
          this.startPos += (width / 2) / 100;
        }
      }
    }
    else{
      if(xSide <= width / 2){
        if(this.startPos != -width / 2){
          this.startPos -= (width / 2) / 100;
        }
        else{
          this.endedMoveOut = true;
        }
      }
      else{
        if(this.startPos != width / 2){
          this.startPos += (width / 2) / 100;
        }
        else{
          this.endedMoveOut = true;
        }
      }
    }
  }

  this.update = function(currX, moveIn){
    let wiggleRoom = 100;
    let factor = 1 / (width / wiggleRoom);

    this.x = (width - currX) * factor + this.xSide;
    let colorRate = 55;
    this.currentR += (this.color[0] - this.currentR) / colorRate;
    this.currentG += (this.color[1] - this.currentG) / colorRate;
    this.currentB += (this.color[2] - this.currentB) / colorRate;

    this.y += 12;
    if(this.y > height + this.radius / 4){
      this.y = -(this.radius + this.radius * 2 * Math.random());
      this.xOffset = - this.maxOffset + this.maxOffset * Math.random()
      this.currentR = this.color[0] - this.colorOffset > 0 ? this.color[0] - this.colorOffset : 0;
      this.currentG = this.color[1] - this.colorOffset > 0 ? this.color[1] - this.colorOffset : 0;
      this.currentB = this.color[2] - this.colorOffset > 0 ? this.color[2] - this.colorOffset : 0;
    }
    let yChange = (this.y / height) > 0 ? (this.y / height) : 0;
    this.radiusMultiplier = 1.3 - 0.8 * yChange;

    this.moveIn(moveIn);
  }

}

function PlanetLevel(pXCoor, pYCoor){
  this.pXCoor = pXCoor;
  this.pYCoor = pYCoor;

  this.shouldFadeOut = false;

  this.radiusOfPathPieces = width / 6;
  this.numberOfPathPieces = height * 4 / this.radiusOfPathPieces;
  this.pathPieces = [];

  this.sig = function(x){
    return 1 / (1 + Math.exp(-x));
  }

  // proceduarally generated color
  this.r = 255 * Math.abs(Math.cos(pXCoor - 200 * this.sig(Math.cos(pXCoor) + Math.sin(pYCoor))));
  this.g = 255 * Math.abs(Math.sin(pYCoor - 280 * this.sig(Math.cos(pXCoor) + Math.sin(pYCoor))));
  this.b = 255 * this.sig(Math.cos(pXCoor) + Math.sin(pYCoor));

  this.r = parseInt(this.r);
  this.g = parseInt(this.g);
  this.b = parseInt(this.b);

  var color = [this.r, this.g, this.b];

  // path
  for(var j = 0; j < 2; j++){
    for(var i = 0; i < this.numberOfPathPieces; i++){
      this.pathPieces.push(new Path(this.radiusOfPathPieces, height * i / this.numberOfPathPieces, color, j * width));
    }
  }

  this.show = function(){
    noStroke();
    rectMode(CENTER);
    fill(35, 255, 35);

    for(var i = 0; i < this.pathPieces.length; i++){
      this.pathPieces[i].show();
    }
  }

  this.update = function(currX){
    for(var i = 0; i < this.pathPieces.length; i++){
      this.pathPieces[i].update(currX, !this.shouldFadeOut);
    }
  }

  this.exitPlanetLevel = function(){
    this.shouldFadeOut = true;
  }

  this.fadeOutFinished = function(){
    for(var i = 0; i < this.pathPieces.length; i++){
      if(!this.pathPieces[i].endedMoveOut){
        return false;
      }
    }
    return true;
  }

}
