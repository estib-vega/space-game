var player, back, navigation, planets, coorSign;

function setup(){
  createCanvas(600, 600);
  angleMode(DEGREES);
  back = new BackgroundManager(400);
  player = new PlayerShip(width / 2, height / 2);
  navigation = new NavigationManager(50);
  coorSign = select("#Coordinate");
  planets = new PlanetManager(navigation.getCoordinates()[0], navigation.getCoordinates()[1]);
}

function draw(){
  background(0);
  navigation.move(player.rotationDelta, player.velocity);
  navigation.update();

  back.move(player.rotationDelta, player.velocity);
  back.update();
  back.show();

  planets.move(player.rotationDelta, player.velocity, navigation.getCoordinates()[0], navigation.getCoordinates()[1]);
  planets.update();
  planets.show();

  player.update();
  player.show();

  coorSign.html(  "X:" + navigation.getCoordinates()[0] + ", Y:" + navigation.getCoordinates()[1]);
}
function keyReleased(){
  if(key != ' '){
    player.rotate(0);
  }
  if(keyCode === UP_ARROW){
      player.move(false);
  }
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW) {
    player.rotate(1);
  }
  if (keyCode === LEFT_ARROW) {
    player.rotate(-1);
  }
  if (keyCode === UP_ARROW) {
    player.move(true);
  }
  if (key === ' ') {
  }
}
