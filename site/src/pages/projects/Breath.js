import { ReactP5Wrapper } from "@p5-wrapper/react";

let base_size = 150, size_change = 0, inhaling = true, paused = false;
let lerp_color1, lerp_color2, color1 = 0, color2 = 1, color3 = 2, color4 = 3;

function sketch(p5) {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background("black"); 
    p5.noStroke();
    p5.normalMaterial();
    let elements = {
      water: p5.color(212, 44, 100), 
      fire: p5.color(4, 68, 100), 
      earth: p5.color(130, 65, 68), 
      air: p5.color(304, 8, 100),
    }
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
}


export default function Breath() {
  return <ReactP5Wrapper sketch={sketch} />;
}