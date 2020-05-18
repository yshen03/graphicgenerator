// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// The class for our "face", contains DNA sequence, fitness value, position on screen

// Fitness Function f(t) = t (where t is "time" mouse rolls over face)

// Create a new face


let shape_=[];
let square_=[];
let texture_=[];

let bubbles = [];

function preload() {
  for (let i = 0; i < 5; i++) {
    shape_[i] = loadImage(`faceelements/shape_${i}.png`);
  }
  for (let i = 0; i < 5; i++) {
    square_[i] = loadImage(`faceelements/square_${i}.png`);
  }
  for (let i = 0; i < 5; i++) {
    texture_[i] = loadImage(`faceelements/texture_${i}.png`);
  }
}

class Face {
  constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_*2; // Position on screen
    this.y = y_*2;
    this.wh = 140; // Size of square enclosing face
    this.fitness = 1; // How good is this face?
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);

  }

  // Display the face
  display() {
    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    let r = map(genes[0], 0, 1, 0, 70);
    //let c = color(genes[1], genes[2], genes[3]);
    //let eye_size = map(genes[5], 0, 1, 0, 10);
    //let eyecolor = color(genes[4], genes[5], genes[6]);
    //let mouthColor = color(genes[7], genes[8], genes[9]);
    //let mouthw = map(genes[5], 0, 1, 0, 50);
    //let mouthh = map(genes[5], 0, 1, 0, 10);

    // hair
    let shapestyle = Math.floor(map(genes[0],0,1,0,5));
    let shapesize = map(genes[0], 0, 1, 80, 130);
    let shape_y = map(genes[4], 0, 1, -50, 15);
    let shape_x = map(genes[9], 0, 1, -50, 15);
    // face
    let squarestyle = Math.floor(map(genes[1],0,1,0,5));
    let squaresize = map(genes[0], 0, 1, 90, 120);
    let square_y = map(genes[0], 0, 1, -10, 20);
    let square_x = map(genes[3], 0, 1, -30, 20);
    // mouth
    let texturestyle = Math.floor(map(genes[4],0,1,0,5));
    let texturesize = map(genes[5], 0, 1, 80, 120);
    let texture_y = map(genes[6], 0, 1, -30, 30);
    let texture_x = map(genes[7], 0, 1, -30, 30);




    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);
    noStroke();

    // Draw the hair
    this.shape = shape_[shapestyle];
    image(this.shape,shape_x-30, shape_y-30, shapesize, shapesize);
    imageMode(CENTER);
    ///ellipseMode(CENTER);

    // Draw the head
//    fill(c);
//    ellipseMode(CENTER);
//    ellipse(0, 0, r, r);
    this.square = square_[squarestyle];
    image(this.square,square_x, square_y, squaresize, squaresize);
    imageMode(CENTER);
    ///ellipseMode(CENTER);

    // Draw the eyes
//    fill(eyecolor);
//    rectMode(CENTER);
//    rect(-eye_x, -eye_y, eye_size, eye_size);
//    rect(eye_x, -eye_y, eye_size, eye_size);
    this.texture = texture_[texturestyle];
    image(this.texture,texture_x, texture_y, texturesize, texturesize);
    imageMode(CENTER);
    ///ellipseMode(CENTER);

    // Draw the bounding box
    stroke(0.25);
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);
    pop();

    // Display fitness value
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text('' + floor(this.fitness), this.x, this.y + 120);
  }

  getFitness() {
   return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}
