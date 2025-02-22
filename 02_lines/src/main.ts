import P5 from "p5";

const RADIUS=160

type Circle = {
  x: number;
  y: number;
  radius: number;
};

const circles: Circle[] = [];

const sketch = (p5: P5) => {
  p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(255);
    };

  p5.draw = () => {
    p5.background(0);

    p5.fill(0);
    const circle = { x: p5.mouseX, y: p5.mouseY, radius: RADIUS} 
    p5.circle(circle.x, circle.y, circle.radius); 
    circles.push(circle);

    circles.forEach((circle) => {
      p5.stroke(128 - (RADIUS - circle.radius));
      p5.strokeWeight((10 / RADIUS) * circle.radius);
  
      p5.circle(circle.x, circle.y, circle.radius);
      circle.radius -= 1;
      if(circle.radius < 0) {
        circles.shift();
      }
    });
  };


  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
  }
};

let _instance = new P5(sketch);
