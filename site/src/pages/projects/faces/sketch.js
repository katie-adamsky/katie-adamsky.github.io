/*
Goal: generate faces that are parameterized by at least 3 variables

This one didn't really grab me too much creatively, - I think I got bogged down in the learning.
It was a great learning exercise though, I got quite a good crash course in drawing shapes with p5,
and using Perlin noise to make adjustments at the point level to give the shapes a hand-drawn feel.

Press any key for a fun surprise!

A fun stretch goal for this one for the future would be to use real faces. Like, you take a photo of your face,
the program parametrically warps it. This is much more complicated though, would need to learn some computer vision
techniques lol

*/


function get_point_with_perlin_noise(p5, xCoord, yCoord, noiseFactor) {
    if (noiseFactor === undefined) {
      noiseFactor = Math.random()*4;
    }
    // Apply Perlin noise to add smooth randomness to the vertex positions
    const noiseVal = p5.noise(xCoord * 0.01, yCoord * 0.01, noiseFactor*0.01);
    const offsetX = p5.map(noiseVal, 0, 1, -15, 15);
    const offsetY = p5.map(noiseVal, 0, 1, -15, 15);
    return {x: xCoord+offsetX, y: yCoord+offsetY};
  }
  
  function draw_perlin_arc(p5, centerX, centerY, size, noiseFactor, start_angle, end_angle) {
      const numPoints = 100;
      let outline_points = [];
      for (let i=0; i <= numPoints; i++) {
        const angle = p5.map(i, 0, numPoints, start_angle, end_angle);
        let xCoord = centerX + size * p5.cos(angle);
        let yCoord = centerY + size * p5.sin(angle);
        
        outline_points[i] = get_point_with_perlin_noise(p5, xCoord, yCoord, noiseFactor);
      }
  
      p5.beginShape();
      for(let i = 0; i <= numPoints; i++) {
        const { x, y } = outline_points[i];
        p5.vertex(x, y);
      }
      p5.endShape();
  }
  
  
    function draw_perlin_circle(p5, centerX, centerY, size, noiseFactor) {
      draw_perlin_arc(p5, centerX, centerY, size, noiseFactor, 0, p5.TWO_PI);
    }
  
    function draw_perlin_line(p5, startX, startY, endX, endY) {
      const numPoints = 100;
      let outline_points = [];
      for (let i=0; i <= numPoints; i++) {
        let xCoord = p5.lerp(startX, endX, p5.map(i, 0, numPoints, 0.0, 1.0));
        let yCoord = p5.lerp(startY, endY, p5.map(i, 0, numPoints, 0.0, 1.0));
        
        outline_points[i] = get_point_with_perlin_noise(p5, xCoord, yCoord);
      }
  
      p5.beginShape();
      for(let i = 0; i <= numPoints; i++) {
        const { x, y } = outline_points[i];
        p5.vertex(x, y);
      }
      p5.endShape();
    }
  
  class Eyes {
    centerX;
    centerY;
    right_eye_points = [];
    left_eye_points = [];
    eye_coords;
    eye_hue;
    eye_saturation = 60;
    eye_brightness = 75;
  
    constructor(centerX, centerY) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.eye_distance = Math.floor(Math.random()*10 + 40);
      this.eye_size = Math.floor(Math.random()*10+25);
      this.eye_coords = {
        right: {x: this.centerX - this.eye_distance, y: this.centerY - 25},
        left: {x: this.centerX + this.eye_distance, y: this.centerY - 25},
      }
      this.eye_hue = Math.floor(Math.random()*(300-150)+150);
    }
  
  
    draw(p5) {
      if (third_eye) {
        this.draw_third_eye(p5);
        return;
      }
      p5.stroke(0);
      draw_perlin_line(p5, this.centerX, this.centerY - 33, this.centerX, this.centerY - 79);
      p5.noStroke();
      p5.fill("white");
      draw_perlin_circle(p5, this.eye_coords.right.x, this.eye_coords.right.y, this.eye_size,0);
      draw_perlin_circle(p5, this.eye_coords.left.x, this.eye_coords.left.y, this.eye_size,0);
  
      p5.noStroke();
  
      p5.fill(this.eye_hue, this.eye_saturation, this.eye_brightness);
      draw_perlin_circle(p5, this.eye_coords.right.x, this.eye_coords.right.y, this.eye_size /2, 0);
      draw_perlin_circle(p5, this.eye_coords.left.x, this.eye_coords.left.y, this.eye_size /2, 0);
  
  
      p5.fill("black");
      draw_perlin_circle(p5, this.eye_coords.right.x, this.eye_coords.right.y, this.eye_size /3, 0);
      draw_perlin_circle(p5, this.eye_coords.left.x, this.eye_coords.left.y, this.eye_size /3, 0);
      p5.fill("white");
    }
  
    draw_third_eye(p5) {
      p5.stroke(0);
      draw_perlin_arc(p5, this.eye_coords.right.x, this.eye_coords.right.y, this.eye_size, Math.random()*4, 0, p5.PI);
      draw_perlin_arc(p5, this.eye_coords.left.x, this.eye_coords.left.y, this.eye_size, Math.random()*4, 0, p5.PI);
      p5.noStroke();
  
      p5.fill("white");
      draw_perlin_arc(p5, this.centerX-this.eye_size/2, this.centerY-55, this.eye_size, 0, 5*p5.PI/3, p5.TWO_PI+p5.PI/3);
      draw_perlin_arc(p5, this.centerX+this.eye_size/2, this.centerY-55, this.eye_size, 0, 2*p5.PI/3, 4*p5.PI/3);
      p5.noStroke();
  
      p5.fill(eye_hue, this.eye_saturation, this.eye_brightness);
      draw_perlin_circle(p5, this.centerX, this.centerY - 56, this.eye_size /2, 0);
      p5.stroke(0);
  
      p5.fill("black");
      draw_perlin_circle(p5, this.centerX, this.centerY - 56, this.eye_size /4, 0);
      p5.fill("white");
  
    }
  }
  
  class Face {
    face_points = [];
    size = 100;
    centerX;
    centerY;
    eyes;
    mustache;
    mouthControlPoint;
    mouthHeight;
    skin_tone;
  
    constructor(p5, centerX, centerY) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.face_points = this.face_outline_points(p5);
      this.skin_tone = p5.color(Math.floor(Math.random()*40), Math.floor(Math.random()*30), Math.floor(Math.random()*40+60));
  
      this.eyes = new Eyes(centerX, centerY);
      this.mouthControlPoint = {x: this.centerX, y: this.centerY + Math.floor(Math.random()*90)}
      this.mouthHeight = Math.floor(Math.random()*10) + 35;
    }
  
    face_outline_points(p5) {
      const radius = 100;
      const numPoints = 100;
      let points = [];
      let taperMin = p5.map(Math.random(), 0, 1, 0.8, 1.25);
      
      for (let i = 0; i < numPoints; i++) {
        const angle = p5.map(i, 0, numPoints, 0, p5.TWO_PI);
        let taperFactor = 1;
        if (i < (numPoints/2)) {
          if (i <= numPoints/8) {
            taperFactor = p5.map(i, 0, numPoints*1/8, 1, taperMin);
          } else if (i <= numPoints/4) {
            taperFactor = p5.map(i, numPoints/8, numPoints/4, taperMin, 1);
          } else if (i <= numPoints *(3/8)) {
            taperFactor = p5.map(i, numPoints/4, numPoints*(3/8), 1, taperMin);
          }
          else if(i >= numPoints*(3/8)) {
            taperFactor = p5.map(i, numPoints*(3/8), numPoints/2, taperMin, 1);
          } 
        }
        let xCoord = this.centerX + radius * p5.cos(angle)*taperFactor;
        let yCoord = this.centerY + radius * p5.sin(angle)*taperFactor;
  
        points[i] = get_point_with_perlin_noise(p5, xCoord, yCoord, 2);
      }
      return points;
    }
  
    draw_face_outline(p5) {
      p5.fill(this.skin_tone);
      p5.noStroke();
      p5.beginShape();
      for (let i = 0; i < this.face_points.length; i++) {
        const { x, y } = this.face_points[i];
        p5.vertex(x, y);
      }
      p5.endShape(p5.CLOSE);
    }
  
    mouth(p5) {
      // if (third_eye) {
      //   fill("black");
      //   draw_perlin_circle(this.centerX, this.centerY + 50, 30);
      //   fill("white");
      //   return;
      // }
      p5.stroke(0);
      p5.fill(this.skin_tone);
      p5.beginShape();
      p5.vertex(this.centerX - this.mouthHeight, this.centerY + this.mouthHeight);
      p5.quadraticVertex(this.mouthControlPoint.x, this.mouthControlPoint.y, this.centerX+this.mouthHeight, this.centerY+this.mouthHeight);
      p5.endShape();
    }
  
    hair() {
  
    }
  
    draw_face(p5) {
      this.draw_face_outline(p5);
      this.eyes.draw(p5);
      this.mouth(p5);
    }
  
  }
  
  let third_eye = false, eye_hue = 0, gradient_position = 0.0, up = true;
  let faces = [];
  
  function setup(p5) {
    p5.createCanvas(1000, 400);
    p5.colorMode(p5.HSB); 
  
    let centerX = 130, centerY = 200;
    for (let i=0; i<4; i++) {
      faces[i] = new Face(p5, centerX, centerY);
      centerX += 250;
    }
  }
  
  function draw(p5) {
    if (third_eye) {
      eye_hue = p5.lerp(0, 360, gradient_position);
      if (up) {
        gradient_position += 0.004;
      } else {
        gradient_position -= 0.004;
      }
      if (gradient_position <= 0.0 || gradient_position >= 1.0) {
        up = !up;
      }
      p5.background(p5.color(eye_hue, 13, 98));
    } else {
      p5.background(p5.color(312, 8, 100));
    }
  
  
    //draw 4 randomly proportioned faces
    for(let j = 0; j < faces.length; j++) {
      faces[j].draw_face(p5);
    }
  }
  
  function keyPressed() {
    third_eye = !third_eye;
  }
  
  export {setup, draw, keyPressed}
  