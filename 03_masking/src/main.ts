import P5 from "p5";

const sketch = (p5: P5) => {
  p5.setup = () => {
      const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canvas.parent("background")
      p5.background(255);
    };

  p5.draw = () => {
    //p5.background(255);

    for(let i = 0; i < p5.windowHeight; i++) {
      p5.stroke(Math.random() * 255);
      p5.line(0, i, p5.windowWidth, i);
    }
  };


  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
  }
};

let _instance = new P5(sketch);
