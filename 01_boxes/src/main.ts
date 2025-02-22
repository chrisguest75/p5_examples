import P5 from "p5";
//import { createCanvas, circle, background, mouseX, mouseY } from "p5";

const sketch = (p5: P5) => {
  p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(255);
    };

  p5.draw = () => {
    p5.background(255);

    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    //p5.circle(p5.mouseX, p5.mouseY, 80);
    p5.colorMode(p5.HSL);

    p5.noStroke();
    const boxes = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15];
    boxes.map((value) => {
      p5.fill((256 / 8) * value,64, 20  );
      p5.rect(0 - p5.mouseX / value, 0 - p5.mouseY / value, (p5.mouseX / value) * 2.0, (p5.mouseY / value) * 2.0);
    });

    p5.stroke(1);
    p5.line(0, 0, p5.mouseX, p5.mouseY);
  };


  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
  }
};

let _instance = new P5(sketch);