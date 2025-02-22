import P5 from "p5";

const SIZE=320

type Rectangle = {
    x: number;
    y: number;
    size: number;
};

const rectangles: Rectangle[] = [];

export function effectRectangles(p5: P5) {
    p5.background(0);

    p5.fill(0);
    const rectangle = { x: p5.mouseX, y: p5.mouseY, size: SIZE} 
    rectangles.push(rectangle);

    rectangles.forEach((rectangle) => {
        p5.stroke(128 - (SIZE - rectangle.size));
        p5.strokeWeight((10 / SIZE) * rectangle.size);

        p5.rect(rectangle.x - (rectangle.size/2), rectangle.y - (rectangle.size/2), rectangle.size, rectangle.size);
        rectangle.size -= 1;
        if(rectangle.size < 0) {
            rectangles.shift();
        }
    });
}
  