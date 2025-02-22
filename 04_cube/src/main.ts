import P5 from "p5";

const twisterBufferHeight = 360 / 4;

type State = {
  xRotation: number;
  yRotation: number;
  zRotation: number;
  frameCount: number;
  screenCanvas?: HTMLCanvasElement;
  buffer?: P5.Graphics;
};

const state: State = {
  xRotation: 0,
  yRotation: 0,
  zRotation: 0,
  frameCount: 0,
  screenCanvas: undefined,
  buffer: undefined,
};

const sketch = (p5: P5) => {
  p5.setup = () => {
      const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
      canvas.parent("background")
      state.screenCanvas = canvas;
      p5.background(255);

      state.buffer = p5.createGraphics(600, twisterBufferHeight);
    };

  p5.draw = () => {
    p5.background(0);

    p5.ambientLight(20);
    p5.pointLight(
      255, 0, 0, // color
      40, -40, 0 // position
    );
    p5.directionalLight(
      128,160,128, // color
      1, 1, 0  // direction
    );
    p5.stroke(0);
    p5.rotateY(((Math.PI * 2) / 360) * state.frameCount);
    p5.box(400);

    const line = state.frameCount % twisterBufferHeight;
    if (state.screenCanvas) {
      state.buffer?.copy(
        // source
        state.screenCanvas,
        // source x, y, w, h
        0, p5.windowHeight / 2, p5.windowWidth, 1,
        // destination x, y, w, h
        0, line, state.buffer.width, 1)
    }

    if (p5.mouseIsPressed) {
      p5.copy(state.buffer, 0, 0, state.buffer.width, state.buffer.height, 0, 0, state.buffer.width, state.buffer.height);
    } 

    state.frameCount++;
  };


  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
  }
};

let _instance = new P5(sketch);
