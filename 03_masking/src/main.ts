import P5 from "p5";

type State = {
  xInc1: number;
  xInc2: number;
  theta: number;
  frameCount: number;
};

const state: State = {
  xInc1: 0.01,
  xInc2: 0.3,
  theta: 0,
  frameCount: 0,
};

const sketch = (p5: P5) => {
  p5.setup = () => {
      const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canvas.parent("background")
      p5.background(255);
    };

  p5.draw = () => {
    //p5.background(255);

    for(let i = 0; i < p5.windowHeight; i++) {
      const randomness = (Math.random() * 128);
      state.theta += state.xInc1 + state.xInc2;
      const x = Math.min(randomness + (Math.cos(state.theta) * 5) + (state.frameCount) , 255);
      p5.stroke(x);
      p5.line(0, i, p5.windowWidth, i);
    }
    state.frameCount++;
  };


  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
  }
};

let _instance = new P5(sketch);
