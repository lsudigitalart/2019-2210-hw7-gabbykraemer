
var dank;
var playTime, loadTime;
var amp, level;
var bgcolor;
var fft;

function preload() {
  dank = loadSound("dank.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
userStartAudio();

  if (dank.isLoaded()) {
    loadTime = millis();
    print(loadTime);
    dank.play();
  }

  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(255);
  noStroke();
  playTime = millis() - loadTime;
  // print(playTime);
  level = amp.getLevel();
  // print(level);

  mappedColor = map(level, 0, 1, 0, 255);

  cSize = map(level, 0, 1, 0, width);

  let lerping = lerpColor(color("red"), color("blue"), level)
  // fill(lerping);


  // strokeWidth(10);
  if (playTime > 6000) {
    for (var i = 0; i < width; i++) {
      // grad1 = lerpColor(color("purple"), color("yellow"), map(i, 0, width, 0, 1));
      grad1 = lerpColor(color("purple"), color("yellow"), level);
      stroke(grad1);
      line(i, 0, i, height);
    }
  }

  fill(0);
  // background(mappedColor);
  circle(50 / 2, 100 / 2, cSize);
  circle(2900 / 2, 1000 / 2, cSize);


  var spectrum = fft.analyze();
  var trebleVol = fft.getEnergy("treble");
  var midVol = fft.getEnergy("mid");
  var bassVol = fft.getEnergy("bass");


  fill(216,133,192);
  circle(windowWidth/1.75, windowHeight/4, trebleVol);
  circle(windowWidth/10, windowHeight/1.5, midVol*4);
  circle(windowWidth/2.5, windowHeight/6, bassVol*2);


}
