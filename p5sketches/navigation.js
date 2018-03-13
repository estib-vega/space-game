function NavigationManager(seed){

  this.xCoor;
  this.yCoor;

  this.dirX = 0;
  this.dirY = 1;

  this.velocity = 0;

  // coordinate generator with seed

  // Range is a fourth of the maximal safe integer
  let range = Number.MAX_SAFE_INTEGER / 4;

  this.xCoor = range * Math.cos(Math.sin(seed));
  this.yCoor = range * Math.sin(Math.cos(seed));

  this.getCoordinates = function(){
    return [this.xCoor, this.yCoor];
  }

  this.update = function(){
    this.xCoor -= this.dirX * this.velocity * 3;
    this.yCoor += this.dirY * this.velocity * 3;
  }

  this.move = function(delta, velocity){
    this.velocity = velocity;

    var angle = delta * Math.PI / 180;

    var x2 = Math.cos(angle) * this.dirX - Math.sin(angle) * this.dirY;
    var y2 = Math.sin(angle) * this.dirX + Math.cos(angle) * this.dirY;
    this.dirX = x2;
    this.dirY = y2;
  }

  this.resetDir = function(){
    this.dirX = 0;
    this.dirY = 1;
  }

}
