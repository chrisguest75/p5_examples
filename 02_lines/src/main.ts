import P5 from "p5";
import * as d3 from 'd3';
import { backgrounds } from "effects";


const sketch = (p5: P5) => {
  p5.setup = () => {
      const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canvas.parent("background")
      p5.background(255);

      const dropdown = d3.select('#algorithm')
      backgrounds.map((background) => {
        dropdown.append('option').attr('value', background.name).text(background.name);
        if (background.default) {
          dropdown.node().value = background.name;
        }
      });

    };

  p5.draw = () => {
    const selection = d3.select('#algorithm').node().value;
    const background = backgrounds.find((background) => background.name === selection);
    if (background) {
      background?.draw(p5);
    } else {
      backgrounds.find((background) => background.default)?.draw(p5);
    }
  
  };


  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
  }
};

let _instance = new P5(sketch);
