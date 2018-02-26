function Bareer(bareerHeight, color, xOffset, yOffset){
  this.bareerHeight = bareerHeight;
  this.yOffset = yOffset * bareerHeight;
  this.xOffset = xOffset * 100 - 20;

  this.widthVariation;

  this.r;
  this.g;
  this.b;

  this.currentR = color[0];
  this.currentG = color[1];
  this.currentB = color[2];

  this.startUp = function(){
    var rnd = Math.random();
    var rnd2 = Math.random();
    this.widthVariation = parseInt(4 * rnd2) + 1;

    var decide = Math.random();
    if(decide > 0.1){
      this.r = color[2] + 50 > 180 ? 180 : color[2] + 100;
      this.g = color[1] - parseInt(170 * rnd) >= 0 ? color[1] - parseInt(170 * rnd) : 57;
      this.b = color[0] - parseInt(200 * rnd) >= 0 ? color[0] - parseInt(55 * rnd) : 70;
    }
    else{
      this.r = parseInt(color[0] * (rnd * 0.5 + 0.5));
      this.g = parseInt(color[1] * (rnd * 0.5 + 0.5));
      this.b = parseInt(color[2] * (rnd * 0.5 + 0.5));
    }
  }

  this.show = function(){
    noStroke();
    rectMode(CENTER);
    fill(this.currentR, this.currentG, this.currentB);
    rect(50 * this.widthVariation / 2 + this.xOffset, -(this.bareerHeight / 2) + this.yOffset, this.bareerHeight * this.widthVariation, this.bareerHeight);
  }

  this.update = function(){
    this.yOffset += 5;
    if(this.yOffset >= height + this.bareerHeight){
      this.yOffset = -(this.bareerHeight / 2);
      this.startUp();
    }
    let rate = 50;
    if(this.currentR != this.r){
      var diffR = this.currentR - this.r;
      this.currentR -= diffR / rate;
    }

    if(this.currentG != this.g){
      var diffG = this.currentG - this.g;
      this.currentG -= diffG / rate;
    }

    if(this.currentB != this.b){
      var diffB = this.currentB - this.b;
      this.currentB -= diffB / rate;
    }

  }
}

function PlanetLevel(pXCoor, pYCoor){
  this.pXCoor = pXCoor;
  this.pYCoor = pYCoor;

  this.numberOfBareers = 50;
  this.bareers = [];
  this.bareerHeight = height / this.numberOfBareers;

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
  for(var j = 0; j < 6; j++){
    for(var i = 0; i < this.numberOfBareers; i++){
      this.bareers.push(new Bareer(this.bareerHeight, color, j, i));
    }
  }
  for(var i = 0; i < this.bareers.length; i++){
    this.bareers[i].startUp();
  }



  this.show = function(){
    noStroke();
    rectMode(CENTER);
    fill(35, 255, 35);
    for(var i = 0; i < this.bareers.length; i++){
      this.bareers[i].show();
    }
  }

  this.update = function(){
    for(var i = 0; i < this.bareers.length; i++){
      this.bareers[i].update();
    }
  }
}
