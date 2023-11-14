/*
Breath of the Compassionate is the name of an ancient Islamic geometric tesselation
You can look at it as a series of diagonal squares, where one half of them are 
expanding outwards while the other half contract.
It is a study in balance, give and take.
I also added generative elements to keep it interesting: you can press any key to 
randomly change the color gradient, and different stars are skipped each time
to encourage you to explore the space
*/

let skipped_cells = [];
function setup() {

  createCanvas(3000, 3000);
  // drawingContext.shadowOffsetX = 5;
  // drawingContext.shadowOffsetY = -5;
  // drawingContext.shadowBlur = 10;
  // drawingContext.shadowColor = "black";
  colorMode(HSB); 

  //randomly delete some of the stars 
  for(let i=0; i<75; i++) {
    skipped_cells[i] = [[floor(Math.random()*20), floor(Math.random()*20)], floor(Math.random()*7+1)];
  }
}

let base_size = 150, size_change = 0, inhaling = true, paused = false;
let lerp_color1, lerp_color2, color1 = 0, color2 = 1, color3 = 2, color4 = 3;

async function draw() {
  background("black"); 
  noStroke();
  let elements = {
    water: color(212, 44, 100), 
    fire: color(4, 68, 100), 
    earth: color(130, 65, 68), 
    air: color(304, 8, 100),
  }
  if (!paused) {
    if (size_change >= 65 || size_change <= -42) {
      inhaling = !inhaling;
    }
    let gradient_position = map(abs(size_change), 0, 65, 0, 1);
    if (inhaling) {
      size_change += 2;
    } else {
      size_change -= 2;
    }
    lerp_color1 = lerpColor(Object.entries(elements)[color1][1], Object.entries(elements)[color2][1], gradient_position);
    lerp_color2 = lerpColor(Object.entries(elements)[color3][1], Object.entries(elements)[color4][1], gradient_position);
  }
  tesselation(base_size/2, base_size/2, base_size + size_change);
}

function mousePressed() {
  paused = !paused;
}

function keyPressed() {
  color1 = Math.floor(Math.random()*4);
  color2 = Math.floor(Math.random()*4);
  color3 = Math.floor(Math.random()*4);
  color4 = Math.floor(Math.random()*4);
  while(color1===color2){
    color1 = Math.floor(Math.random()*4);
    color2 = Math.floor(Math.random()*4);
  }
}

function tesselation(x, y, size) {
  let centerX = x, centerY = y;
  for(let i=0; i < 20; i++) {
    for(let j=0; j < 20; j++) {
      let skip = 0;
      index = skipped_cells.findIndex(coordinates => JSON.stringify(coordinates[0]) === JSON.stringify([i,j]));
      if (index !== -1){
        skip = skipped_cells[index][1];
      }
      if (skip !== 1) {
        fill(lerp_color1);
        star(centerX, centerY, size/2);
      }
      if (skip !== 2) {
        fill("black");
        star(centerX, centerY, size/2.65);
      } 
      if (skip !== 3) {
        fill(lerp_color1);
        star(centerX, centerY, size/4);
      }
      if (skip !== 4) {
        fill("black");
        star(centerX, centerY, size/8);
      }
      if (skip !== 5) {
        fill(lerp_color2);
        inverted_star(centerX+base_size/2, centerY+base_size/2, (base_size-size_change)/5);
      }
      if (skip !== 6) {
        fill("black");
        inverted_star(centerX+base_size/2, centerY+base_size/2, (base_size-size_change)/10);
      }
      if (skip !== 7) {
        fill(lerp_color2);
        inverted_star(centerX+base_size/2, centerY+base_size/2, (base_size-size_change)/20);
      }
      centerX += base_size;
    }
    centerX = x;
    centerY += base_size;
  }

}



function star(centerX, centerY, size) {
  let angle = TWO_PI / 16; 
  beginShape();
  let x, y;
  let vertices = [];
  for (let i = 0; i < 16; i++) {
    if (i%4 == 0) {
      x = centerX + (base_size/2) * cos(i * angle);
      y = centerY + (base_size/2) * sin(i * angle);
    } else if (i%2 == 0) {
      x = centerX + (size+size_change > (base_size /2) ? (base_size/2) : (size+size_change)) * cos(i * angle);
      y = centerY + (size+size_change > (base_size/2) ? (base_size/2) : (size+size_change)) * sin(i * angle);
    } else {
      x = centerX + 0.765 * (size) * cos(i * angle);
      y = centerY + 0.765 * size * sin(i * angle);
    }
    vertex(x, y);
  }
  endShape(CLOSE);
}

function inverted_star(centerX, centerY, size) {
  let angle = TWO_PI / 16; 
  beginShape();
  let x, y;
  let vertices = [];
  for (let i = 0; i < 16; i++) {
    if (i%4 == 0) {
      x = centerX + (base_size/2) * cos(i * angle);
      y = centerY + (base_size/2) * sin(i * angle);
    } else if (i%2 == 0) {
      magnitude = (size-size_change > (base_size /2) ? (base_size/2) : (size-size_change));
      if (magnitude < -30) {
        magnitude = -30;
      }
      x = centerX + magnitude * cos(i * angle);
      y = centerY + magnitude * sin(i * angle);
    } else {
      x = centerX + 0.765 * (size) * cos(i * angle);
      y = centerY + 0.765 * size * sin(i * angle);
    }
    vertex(x, y);
  }
  endShape(CLOSE);
}




function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

// async function flowerOfLife(x, y, radius) {
//   let h = 100, s = 20, b = 100;
//   let max_depth = 2;
//   let flower = async function(centerX, centerY, depth, hsb) {
//     //fill(hsb);
//     ellipse(centerX,centerY, 2*radius);
//     const points = [];
//     if (depth >= max_depth) return;
//     for (let i=0; i < 6; i++) {
//       theta = i * PI/3;
//       x = centerX + radius * Math.cos(theta);
//       y = centerY + radius * Math.sin(theta);
//       points.push([x, y]);
//       await flower(x,y, depth+1, color(h + 75, s, b));
//     }
//   }
//   await flower(x, y, 0, color(h,s,b));
// }

