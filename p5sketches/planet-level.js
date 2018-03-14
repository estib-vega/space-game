function Bareer(bareerHeight, color, xOffset, yOffset){
  this.bareerHeight = bareerHeight;
  this.yOffset = yOffset * bareerHeight;
  this.xOffset = xOffset * 100 - 20;

  this.widthVariation;

  this.r;
  this.g;
  this.b;

  this.color = color;

  this.currentR = this.color[0];
  this.currentG = this.color[1];
  this.currentB = this.color[2];

  this.finishedFadeOut = false;
  this.finishedFadeIn = false;

  this.startUp = function(){
    var rnd = Math.random();
    var rnd2 = Math.random();
    this.widthVariation = parseInt(4 * rnd2) + 1;

    var decide = Math.random();
    if(decide > 0.1){
      this.r = this.color[2] + 50 > 180 ? 180 : this.color[2] + 50;
      this.g = this.color[1] - parseInt(120 * rnd) >= 0 ? this.color[1] - parseInt(120 * rnd) : 57;
      this.b = this.color[0] - parseInt(170 * rnd) >= 0 ? this.color[0] - parseInt(170 * rnd) : 70;
    }
    else{
      this.r = parseInt(this.color[0] * (rnd * 0.5 + 0.5));
      this.g = parseInt(this.color[1] * (rnd * 0.5 + 0.5));
      this.b = parseInt(this.color[2] * (rnd * 0.5 + 0.5));
    }
  }

  this.fadeBareers = function(out){
    if(!out){
      // fade in

      if(this.currentR != this.r){
        if(this.currentR < this.r){
          this.currentR++;
        }
        else{
          this.currentR--;
        }
      }

      if(this.currentG != this.g){
        if(this.currentG < this.g){
          this.currentG++;
        }
        else{
          this.currentG--;
        }
      }

      if(this.currentB != this.b){
        if(this.currentG < this.b){
          this.currentG++;
        }
        else{
          this.currentG--;
        }
      }
    }
    else{
      // fadeOut
      var rEnded = false;
      var gEnded = false;
      var bEnded = false;

      if(this.currentR != this.color[0]){
        if(this.currentR < this.color[0]){
          this.currentR++;
        }
        else{
          this.currentR--;
        }
      }
      else{
        rEnded = true;
      }

      if(this.currentG != this.color[1]){
        if(this.currentG < this.color[1]){
          this.currentG++;
        }
        else{
          this.currentG--;
        }
      }
      else{
        gEnded = true;
      }

      if(this.currentB != this.color[2]){
        if(this.currentG < this.color[2]){
          this.currentG++;
        }
        else{
          this.currentG--;
        }
      }
      else{
        bEnded = true;
      }

      if(rEnded && gEnded && bEnded){
        this.finishedFadeOut = true;
      }
    }
  }

  this.show = function(){
    noStroke();
    rectMode(CENTER);
    fill(this.currentR, this.currentG, this.currentB);
    rect(50 * this.widthVariation / 2 + this.xOffset, -(this.bareerHeight / 2) + this.yOffset, this.bareerHeight * this.widthVariation, this.bareerHeight);
  }

  this.update = function(fadeOut){

    this.yOffset += 5;
    if(this.yOffset >= height + this.bareerHeight){
      this.yOffset = -(this.bareerHeight / 2);
      this.startUp();
    }

    this.fadeBareers(fadeOut);

  }
}

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
      }
      else{
        if(this.startPos != width / 2){
          this.startPos += (width / 2) / 100;
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

  this.numberOfBareers = 50;
  this.bareers = [];
  this.bareerHeight = height / this.numberOfBareers;

  this.shouldFadeOut = false;

  this.radiusOfPathPieces = width / 6;
  this.numberOfPathPieces = height * 4 / this.radiusOfPathPieces;
  this.pathPieces = [];

  this.sig = function(x){
    return 1 / (1 + Math.exp(-x));
  }

  // bareers
  // proceduarally generated color
  this.r = 255 * Math.abs(Math.cos(pXCoor - 200 * this.sig(Math.cos(pXCoor) + Math.sin(pYCoor))));
  this.g = 255 * Math.abs(Math.sin(pYCoor - 280 * this.sig(Math.cos(pXCoor) + Math.sin(pYCoor))));
  this.b = 255 * this.sig(Math.cos(pXCoor) + Math.sin(pYCoor));

  this.r = parseInt(this.r);
  this.g = parseInt(this.g);
  this.b = parseInt(this.b);

  var color = [this.r, this.g, this.b];

  for(var j = 0; j < 6; j++){
    for(var i = 0; i < this.numberOfBareers; i++){
      this.bareers.push(new Bareer(this.bareerHeight, color, j, i));
    }
  }
  for(var i = 0; i < this.bareers.length; i++){
    this.bareers[i].startUp();
  }

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
    for(var i = 0; i < this.bareers.length; i++){
      this.bareers[i].show();
    }
    for(var i = 0; i < this.pathPieces.length; i++){
      this.pathPieces[i].show();
    }
  }

  this.update = function(currX){
    for(var i = 0; i < this.bareers.length; i++){
      this.bareers[i].update(this.shouldFadeOut);
    }
    for(var i = 0; i < this.pathPieces.length; i++){
      this.pathPieces[i].update(currX, !this.shouldFadeOut);
    }
  }

  this.exitPlanetLevel = function(){
    this.shouldFadeOut = true;
  }

  this.fadeOutFinished = function(){
    for(var i = 0; i < this.bareers.length; i++){
      if(!this.bareers[i].finishedFadeOut){
        return false;
      }
    }
    return true;
  }

}
