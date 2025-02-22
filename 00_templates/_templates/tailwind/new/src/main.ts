---
to: <%= name %>/src/main.ts
---
import P5 from "p5";

const sketch = (p5: P5) => {
  p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(255);
    };

  p5.draw = () => {
    p5.background(255);

    p5.circle(p5.mouseX, p5.mouseY, 80);
  };


  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
  }
};

let _instance = new P5(sketch);
