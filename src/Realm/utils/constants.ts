import { RlmColor, RlmScene } from "./types"

const colors: RlmColor[] = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"];

export const Scenes: RlmScene[] = [
  {
    name: "Maze",
    type: "Outdoor",
    size: "Petite"
  },
  {
    name: "Penthouse",
    type: "Indoor",
    size: "Petite"
  },
  {
    name: "Cubes",
    theme: colors[Math.floor(Math.random()*colors.length)],
    type: "Outdoor",
    size: "Mediocre"
  },
  {
    name: "Matrix",
    type: "???",
    size: "Mediocre"
  },
  {
    name: "Field",
    type: "Outdoor",
    size: "Mediocre"
  },
  {
    name: "Moon",
    theme: colors[Math.floor(Math.random()*colors.length)],
    type: "Outdoor",
    size: "Immense"
  },
  {
    name: "Warehouse",
    type: "Indoor",
    size: "Immense"
  },
  {
    name: "Mars",
    type: "Outdoor",
    size: "Galactic"
  },
  {
    name: "Glacier",
    theme: colors[Math.floor(Math.random()*colors.length)],
    type: "Outdoor",
    size: "Mediocre"
  }
]
