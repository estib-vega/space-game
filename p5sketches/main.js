var player, back;

function setup(){
  createCanvas(600, 600);
  angleMode(DEGREES);
  back = new BackgroundManager(400);
  player = new PlayerShip(width / 2, height / 2);
}

function draw(){
  background(0);

  back.move(player.rotationDelta, player.velocity);
  back.update();
  back.show();

  player.update();
  player.show();
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
