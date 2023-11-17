let skipped_cells = [];
function setup(p5) {
    p5.createCanvas(1000, 600);
}

let base_size = 100, size_change = 0, inhaling = true, paused = false;
let lerp_color1, lerp_color2, color1 = 0, color2 = 1, color3 = 2, color4 = 3;

function draw(p5) {
  p5.background("white"); 
  p5.noStroke();
  let elements = {
    water: p5.color(212, 44, 100), 
    fire: p5.color(4, 68, 100), 
    earth: p5.color(130, 65, 68), 
    air: p5.color(304, 8, 100),
  }
  
  if (!paused) {
    if (size_change >= 65 || size_change <= -42) {
      inhaling = !inhaling;
    }
    let gradient_position = p5.map(Math.abs(size_change), 0, 65, 0, 1);
    if (inhaling) {
      size_change += 1;
    } else {
      size_change -= 1;
    }
    lerp_color1 = p5.lerpColor(Object.entries(elements)[color1][1], Object.entries(elements)[color2][1], gradient_position);
    lerp_color2 = p5.lerpColor(Object.entries(elements)[color3][1], Object.entries(elements)[color4][1], gradient_position);
  }
  tesselation(p5, base_size/2, base_size/2, base_size + size_change);
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

function tesselation(p5, x, y, size) {
  let centerX = x, centerY = y;
  for(let i=0; i < 10; i++) {
    for(let j=0; j < 10; j++) {
        let skip = 0;
        let index = skipped_cells.findIndex(coordinates => JSON.stringify(coordinates[0]) === JSON.stringify([i,j]));
        if (index !== -1){
          skip = skipped_cells[index][1];
        }
        if (skip !== 1) {
        p5.fill(lerp_color1);
        star(p5, centerX, centerY, size/2);
        }
        if (skip !== 2) {
        p5.fill("black");
        star(p5, centerX, centerY, size/2.65);
        } 
        if (skip !== 3) {
        p5.fill(lerp_color1);
        star(p5, centerX, centerY, size/4);
        }
        if (skip !== 4) {
        p5.fill("black");
        star(p5, centerX, centerY, size/8);
        }
        if(j<9 && i < 5){
            if (skip !== 5) {
            p5.fill(lerp_color2);
            inverted_star(p5, centerX+base_size/2, centerY+base_size/2, (base_size-size_change)/5);
            }
            if (skip !== 6) {
            p5.fill("black");
            inverted_star(p5, centerX+base_size/2, centerY+base_size/2, (base_size-size_change)/10);
            }
            if (skip !== 7) {
            p5.fill(lerp_color2);
            inverted_star(p5, centerX+base_size/2, centerY+base_size/2, (base_size-size_change)/20);
            }
        }
        centerX += base_size;
    }
    centerX = x;
    centerY += base_size;
  }

}



function star(p5, centerX, centerY, size) {
  let angle = p5.TWO_PI / 16; 
  p5.beginShape();
  let x, y;
  for (let i = 0; i < 16; i++) {
    if (i%4 === 0) {
      x = centerX + (base_size/2) * Math.cos(i * angle);
      y = centerY + (base_size/2) * Math.sin(i * angle);
    } else if (i%2 === 0) {
      x = centerX + (size+size_change > (base_size /2) ? (base_size/2) : (size+size_change)) * Math.cos(i * angle);
      y = centerY + (size+size_change > (base_size/2) ? (base_size/2) : (size+size_change)) * Math.sin(i * angle);
    } else {
      x = centerX + 0.765 * (size) * Math.cos(i * angle);
      y = centerY + 0.765 * size * Math.sin(i * angle);
    }
    p5.vertex(x, y);
  }
  p5.endShape(p5.CLOSE);
}

function inverted_star(p5, centerX, centerY, size) {
  let angle = p5.TWO_PI / 16; 
  p5.beginShape();
  let x, y;
  for (let i = 0; i < 16; i++) {
    if (i%4 === 0) {
      x = centerX + (base_size/2) * Math.cos(i * angle);
      y = centerY + (base_size/2) * Math.sin(i * angle);
    } else if (i%2 === 0) {
      let magnitude = (size-size_change > (base_size /2) ? (base_size/2) : (size-size_change));
      if (magnitude < -30) {
        magnitude = -30;
      }
      x = centerX + magnitude * Math.cos(i * angle);
      y = centerY + magnitude * Math.sin(i * angle);
    } else {
      x = centerX + 0.765 * (size) * Math.cos(i * angle);
      y = centerY + 0.765 * size * Math.sin(i * angle);
    }
    p5.vertex(x, y);
  }
  p5.endShape(p5.CLOSE);
}


export {draw, setup, mousePressed, keyPressed} 



