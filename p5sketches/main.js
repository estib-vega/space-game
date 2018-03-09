var player, back, navigation, planets, coorSign, planetLevel;
var pause, isInLevelPlanet, isEnteringPlanet, isExitingPlanet;

function updateNavAndBack(){
  navigation.move(player.rotationDelta, player.velocity);
  navigation.update();
  back.move(player.rotationDelta, player.velocity);
  back.update();
}

function setupPlanetLevel(){
  planetLevel = new PlanetLevel(planets.planetEntered.coordX, planets.planetEntered.coordY);
  isInLevelPlanet = true;
  isEnteringPlanet = false;
  player.moveToLowerEnd();
  //console.log("Inside");
  coorSign.style("display", "none");
}

function showBackAndPlanets(){
  back.show();
  planets.show();
}

function updatePlanetAndPlayer(){
  planets.move(player.rotationDelta, player.velocity, navigation.getCoordinates()[0], navigation.getCoordinates()[1]);
  planets.update();
  player.update();
}

function spaceExplorationLoop(){
  background(0);
  if(!pause){
    if(!isEnteringPlanet){
      updateNavAndBack();
    }
    else{
      if(planets.isInsidePlanet() && !isExitingPlanet){
        setupPlanetLevel();
      }
    }
    updatePlanetAndPlayer();
  }
  showBackAndPlanets();
  player.show();
}

function planetLevelLoop(){
  background(planets.planetEntered.r, planets.planetEntered.g, planets.planetEntered.b);
  if(!pause){
    player.update();
    planetLevel.update();

    if(isExitingPlanet && planetLevel.fadeOutFinished()){
      //console.log("Ended fadeOut");
      planets.exitPlanet();
      player.moveToCenter();
      back.resetDir();
      isExitingPlanet = false;
      isInLevelPlanet = false;
      coorSign.style("display", "block");
      console.log("Outside");
    }
  }
  planetLevel.show();
  player.show();
}

function setup(){
  createCanvas(600, 600);
  angleMode(DEGREES);
  back = new BackgroundManager(400);
  player = new PlayerShip();
  navigation = new NavigationManager(900);
  coorSign = select("#Coordinate");
  planets = new PlanetManager();
  planets.generatePlanets(navigation.getCoordinates()[0], navigation.getCoordinates()[1]);
  pause = false;
  isInLevelPlanet = false;
  isEnteringPlanet, isExitingPlanet = false;
}

function draw(){
  if(!isInLevelPlanet){
    spaceExplorationLoop();

    // sign for debug purposes
    coorSign.html("X:" + navigation.getCoordinates()[0] + ", Y:" + navigation.getCoordinates()[1]);
  }
  else{
    planetLevelLoop();
  }

}

function keyReleased(){
  if(key != ' ' && (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)){
    if(!isInLevelPlanet){
      player.rotate(0);
    }
    else{
      player.directionSet(0);
    }
  }
  if(keyCode === UP_ARROW){
    if(!isInLevelPlanet){
      player.move(false);
    }
  }
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW) {
    if(!pause){
      if(!isEnteringPlanet){
        if(!isInLevelPlanet){
          player.rotate(1);
        }
        else{
          if(!isExitingPlanet){
            player.directionSet(1);
          }
        }
      }
    }
  }
  if (keyCode === LEFT_ARROW) {
    if(!pause){
      if(!isEnteringPlanet){
        if(!isInLevelPlanet){
          player.rotate(-1);
        }
        else{
          if(!isExitingPlanet){
            player.directionSet(-1);
          }
        }
      }
    }
  }
  if (keyCode === UP_ARROW) {
    if(!pause){
      if(!isEnteringPlanet && !isInLevelPlanet){
        player.move(true);
      }

    }
  }
  if (key === ' ') {
    if(!pause){
      if(!isInLevelPlanet){
        planets.enterPlanet(navigation.getCoordinates()[0], navigation.getCoordinates()[1]);
        isEnteringPlanet = planets.isEnteringPlanet;
        if(isEnteringPlanet){
          player.completeStop();
        }
      }
      else{
        if(!isEnteringPlanet){
          //console.log("Want to exit planet");
          planetLevel.exitPlanetLevel();
          player.rotate(0);
          isExitingPlanet = true;
        }
      }
    }
  }
  if (keyCode === 88) {
    pause = !pause;
  }

}
