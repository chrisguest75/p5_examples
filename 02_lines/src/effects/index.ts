import P5 from "p5";
import { effectCircles } from "./circles";

export type Background = {
  name: string
  draw: (p5:P5) => void
  default?: boolean
}

export const backgrounds: Background[] = [
  {
      name: 'Circles',
      draw: effectCircles,
      default: true
  },
]