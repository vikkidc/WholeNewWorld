let song;
let img1, img2;
let particles = [];

const PARTICLE_SIZE = 10;
const RESOLUTION = 5;
const MAX_FORCE = 10;
const MIN_FORCE = 0;

function preload() {
  img1 = loadImage('images/DisneyLogo.jpg');
  img2 = loadImage('images/DisneyWOC.jpg');
  
  song = loadSound('music/AWholeNewWorld.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  song.loop();
  spawnParticles();
}

function draw() {
  background(img2);
  //image(img1, 0, 0);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  })
  p.draw();
}

function spawnParticles() {
  for(let i = 0; i < width; i += RESOLUTION) {
    for(let j = 0; j < height; j += RESOLUTION) {
      let x = (i / width) * img1.width;
      let y = (j / height) * img1.height;
      const color = img1.get(x, y);
      particles.push(p = new Particle(i + PARTICLE_SIZE / 2, j + PARTICLE_SIZE / 2, color));
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.targetX = x;
    this.targetY = y;
  }
  
  update() {
    let mouseVector = createVector(mouseX, mouseY);
    let currentVector = createVector(this.x,this.y);
    let targetVector = createVector(this.targetX, this.targetY);
    
    let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
    let distanceToMouse = fromMouseToParticle.mag();
    
    let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);
    let distanceToTarget = fromParticleToTarget.mag();
    
    let totalForce = createVector(0,0);
    
    if (distanceToMouse < 100) {
      let repulsionForce = map(distanceToMouse, 0, 100, MAX_FORCE, MIN_FORCE);         
      fromMouseToParticle.setMag(repulsionForce);
      totalForce.add(fromMouseToParticle);
    }
    
    if (distanceToMouse > 0) {
      let attractionForce = map(distanceToTarget, 0, 100, MIN_FORCE, MAX_FORCE);         
      fromParticleToTarget.setMag(attractionForce);
      totalForce.add(fromParticleToTarget);
    }
    
    this.x += totalForce.x;
    this.y += totalForce.y;
  }
  
  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, PARTICLE_SIZE);
  }
}