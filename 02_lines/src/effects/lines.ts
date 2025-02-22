import P5 from "p5";

type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    width: number;
};

const lines: Line[] = [];

export function effectLines(p5: P5) {
    p5.background(0);

    p5.fill(0);
    //if (p5.mouseIsPressed) {
        if (lines.length == 0) {
            const line = { x1: p5.mouseX, y1: p5.mouseY, x2: p5.mouseX, y2: p5.mouseY, width: Math.random() * 30 }; 
            lines.push(line);
        } else {
            const lastX = lines[lines.length - 1].x1;
            const lastY = lines[lines.length - 1].y1;
            const line = { x1: p5.mouseX, y1: p5.mouseY, x2: lastX, y2: lastY, width: Math.random() * 30 }; 
            lines.push(line);
        }
    //}


    lines.forEach((line) => {
        p5.stroke(128 - line.width);
        p5.strokeWeight(line.width);
        p5.line(line.x1, line.y1, line.x2, line.y2);

        line.width -= 0.01;
        if (line.width < 0) {
            lines.shift();
        }

    });
}
  