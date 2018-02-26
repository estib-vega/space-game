var player, back, navigation, planets, coorSign;
var pause, isInLevelPlanet, isEnteringPlanet;
function setup(){
  createCanvas(600, 600);
  angleMode(DEGREES);
  back = new BackgroundManager(400);
  player = new PlayerShip();
  navigation = new NavigationManager(-4640);
  coorSign = select("#Coordinate");
  planets = new PlanetManager();
  planets.generatePlanets(navigation.getCoordinates()[0], navigation.getCoordinates()[1]);
  pause = false;
  isInLevelPlanet = false;
  isEnteringPlanet = false;
}

function draw(){
  if(!isInLevelPlanet){
    background(0);
    if(!pause){
      if(!isEnteringPlanet){
        navigation.move(player.rotationDelta, player.velocity);
        navigation.update();

        back.move(player.rotationDelta, player.velocity);
        back.update();
      }
      else{
        if(planets.isInsidePlanet()){
          isInLevelPlanet = true;
          player.moveToLowerEnd();
          console.log("Inside");
          coorSign.style("display", "none");
        }
      }
      planets.move(player.rotationDelta, player.velocity, navigation.getCoordinates()[0], navigation.getCoordinates()[1]);
      planets.update();

      player.update();
    }

    back.show();

    planets.show();

    player.show();

    coorSign.html("X:" + navigation.getCoordinates()[0] + ", Y:" + navigation.getCoordinates()[1]);
  }
  else{
    background(planets.planetEntered.r, planets.planetEntered.g, planets.planetEntered.b);
    if(!pause){
      player.update();

    }

    player.show();
  }

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
    if(!pause){
      player.rotate(1);
    }
  }
  if (keyCode === LEFT_ARROW) {
    if(!pause){
      player.rotate(-1);
    }
  }
  if (keyCode === UP_ARROW) {
    if(!pause && !isEnteringPlanet){
      player.move(true);
    }
  }
  if (key === ' ') {
    if(!pause){
      if(!isInLevelPlanet){
        planets.enterPlanet(navigation.getCoordinates()[0], navigation.getCoordinates()[1]);
        isEnteringPlanet = planets.isEnteringPlanet;
      }
    }
  }
  if (keyCode === 88) {
    pause = !pause;
  }

}
