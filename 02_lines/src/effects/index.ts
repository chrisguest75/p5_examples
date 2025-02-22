import P5 from "p5";
import { effectCircles } from "./circles";
import { effectRectangles } from "./rectangles";

export type Background = {
  name: string
  draw: (p5:P5) => void
  default?: boolean
}

export const backgrounds: Background[] = [
  {
      name: 'Circles',
      draw: effectCircles,
        },
  {
    name: 'Rectangles',
    draw: effectRectangles,
    default: true
  },

]