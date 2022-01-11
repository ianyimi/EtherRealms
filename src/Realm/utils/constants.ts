import { RlmColor, RlmScene } from "./types"

const colors: RlmColor[] = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"];

export const Scenes: RlmScene[] = [
  {
    name: "Maze",
    start: [0, 3, 0],
    type: "Outdoor",
    size: "Petite"
  },
  {
    name: "Penthouse",
    start: [0, 3, 0],
    type: "Indoor",
    size: "Petite"
  },
  {
    name: "Cubes",
    start: [0, 2, 20],
    theme: colors[Math.floor(Math.random()*colors.length)],
    type: "Outdoor",
    size: "Mediocre"
  },
  {
    name: "Matrix",
    start: [0, 3, 0],
    type: "???",
    size: "Mediocre"
  },
  {
    name: "Field",
    start: [0, 3, 0],
    type: "Outdoor",
    size: "Mediocre"
  },
  {
    name: "Moon",
    start: [0, 3, 0],
    theme: colors[Math.floor(Math.random()*colors.length)],
    type: "Outdoor",
    size: "Immense"
  },
  {
    name: "Warehouse",
    start: [0, 3, 0],
    type: "Indoor",
    size: "Immense"
  },
  {
    name: "Mars",
    start: [0, 3, 0],
    type: "Outdoor",
    size: "Galactic"
  },
  {
    name: "Glacier",
    start: [0, 3, 0],
    theme: colors[Math.floor(Math.random()*colors.length)],
    type: "Outdoor",
    size: "Mediocre"
  }
]
