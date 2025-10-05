import P5 from "p5";

interface Parallelogram {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  skew: number;
  color: number;
}

const sketch = (p5: P5) => {
  let parallelograms: Parallelogram[] = [];
  let clippingRegion: { x: number; y: number; size: number } = { x: 0, y: 0, size: 0 };
  const numParallelograms = 12; // Reduced number since they're much larger now

  const calculateClippingRegion = () => {
    // Calculate square size based on the smallest dimension, with some margin
    const margin = 100;
    const availableWidth = p5.width - (margin * 2);
    const availableHeight = p5.height - (margin * 2);
    const size = Math.min(availableWidth, availableHeight);
    
    clippingRegion = {
      x: (p5.width - size) / 2,
      y: (p5.height - size) / 2,
      size: size
    };
  };

  const createRandomParallelogram = (): Parallelogram => {
    // Generate large parallelograms that stretch over the entire clipping region
    // Make them significantly larger than the clipping region
    const minSize = clippingRegion.size * 0.8;  // Minimum size relative to clipping region
    const maxSize = clippingRegion.size * 1.5;  // Maximum size relative to clipping region
    
    const width = p5.random(minSize, maxSize);
    const height = p5.random(minSize, maxSize);
    const angle = p5.random(0, p5.TWO_PI);
    const skew = p5.random(-0.5, 0.5);
    
    // Calculate positioning to ensure the parallelogram stretches over the clipping region
    // Position them so they can span across the entire clipping area
    const extendDistance = clippingRegion.size * 0.6; // How far outside to position them
    
    let x, y;
    
    // Randomly choose which side of the clipping region to center the parallelogram from
    const side = Math.floor(p5.random(4)); // 0=top, 1=right, 2=bottom, 3=left
    
    switch(side) {
      case 0: // Top - position above but stretching down over the clipping region
        x = p5.random(
          clippingRegion.x - extendDistance, 
          clippingRegion.x + clippingRegion.size + extendDistance
        );
        y = clippingRegion.y - extendDistance;
        break;
      case 1: // Right - position to the right but stretching left over the clipping region
        x = clippingRegion.x + clippingRegion.size + extendDistance;
        y = p5.random(
          clippingRegion.y - extendDistance, 
          clippingRegion.y + clippingRegion.size + extendDistance
        );
        break;
      case 2: // Bottom - position below but stretching up over the clipping region
        x = p5.random(
          clippingRegion.x - extendDistance, 
          clippingRegion.x + clippingRegion.size + extendDistance
        );
        y = clippingRegion.y + clippingRegion.size + extendDistance;
        break;
      case 3: // Left - position to the left but stretching right over the clipping region
      default:
        x = clippingRegion.x - extendDistance;
        y = p5.random(
          clippingRegion.y - extendDistance, 
          clippingRegion.y + clippingRegion.size + extendDistance
        );
        break;
    }
    
    return {
      x: x,
      y: y,
      width: width,
      height: height,
      angle: angle,
      skew: skew,
      color: p5.random(50, 200)
    };
  };

  const drawParallelogram = (para: Parallelogram) => {
    p5.push();
    p5.translate(para.x, para.y);
    p5.rotate(para.angle);
    
    p5.fill(para.color);
    p5.stroke(0);
    p5.strokeWeight(2);
    
    // Draw parallelogram using quad
    // Calculate the four corners of the parallelogram
    const x1 = -para.width / 2;
    const y1 = -para.height / 2;
    const x2 = para.width / 2;
    const y2 = -para.height / 2;
    const x3 = para.width / 2 + para.skew * para.height;
    const y3 = para.height / 2;
    const x4 = -para.width / 2 + para.skew * para.height;
    const y4 = para.height / 2;
    
    p5.quad(x1, y1, x2, y2, x3, y3, x4, y4);
    p5.pop();
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent("background");
    p5.background(255);
    
    // Calculate clipping region
    calculateClippingRegion();
    
    // Generate random parallelograms
    for (let i = 0; i < numParallelograms; i++) {
      parallelograms.push(createRandomParallelogram());
    }
  };

  p5.draw = () => {
    p5.background(255);
    
    // First, draw all parallelograms without clipping to test
    // for (const para of parallelograms) {
    //   drawParallelogram(para);
    // }
    
    // Draw clipping region outline (optional visual guide)
    p5.push();
    p5.noFill();
    p5.stroke(150);
    p5.strokeWeight(2);
    p5.rect(clippingRegion.x, clippingRegion.y, clippingRegion.size, clippingRegion.size);
    p5.pop();
    
    // Create a graphics buffer for clipped parallelograms
    const clippedGraphics = p5.createGraphics(p5.width, p5.height);
    
    // Draw all parallelograms to the graphics buffer
    for (const para of parallelograms) {
      clippedGraphics.push();
      clippedGraphics.translate(para.x, para.y);
      clippedGraphics.rotate(para.angle);
      
      clippedGraphics.fill(para.color);
      clippedGraphics.stroke(0);
      clippedGraphics.strokeWeight(2);
      
      // Calculate the four corners of the parallelogram
      const x1 = -para.width / 2;
      const y1 = -para.height / 2;
      const x2 = para.width / 2;
      const y2 = -para.height / 2;
      const x3 = para.width / 2 + para.skew * para.height;
      const y3 = para.height / 2;
      const x4 = -para.width / 2 + para.skew * para.height;
      const y4 = para.height / 2;
      
      clippedGraphics.quad(x1, y1, x2, y2, x3, y3, x4, y4);
      clippedGraphics.pop();
    }
    
    // Apply clipping by copying only the square region
    const clippedRegion = clippedGraphics.get(
      clippingRegion.x, 
      clippingRegion.y, 
      clippingRegion.size, 
      clippingRegion.size
    );
    
    // Draw the clipped region
    p5.image(clippedRegion, clippingRegion.x, clippingRegion.y);
  };

  p5.keyPressed = () => {
    // Press any key to regenerate parallelograms
    parallelograms = [];
    for (let i = 0; i < numParallelograms; i++) {
      parallelograms.push(createRandomParallelogram());
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
    // Recalculate clipping region for new canvas size
    calculateClippingRegion();
    // Regenerate parallelograms for new canvas size
    parallelograms = [];
    for (let i = 0; i < numParallelograms; i++) {
      parallelograms.push(createRandomParallelogram());
    }
  };
};

let _instance = new P5(sketch);
