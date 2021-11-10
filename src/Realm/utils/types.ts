export type SceneName = "Maze" | "Penthouse" | "Cubic Dimension" | "Matrix" | "Moon" | "Warehouse" | "Field" | "Mansion" | "Mars";
export type RlmScene = {
  name: SceneName,
  type: "Indoor" | "Outdoor" | "???",
  size: "Petite" | "Mediocre" | "Immense" | "Galactic"
}
export type RlmSky = "Day" | "Night" | "Red" | "Orange" | "Yellow" | "Green" | "Blue" | "Purple" | "Matrix" | "Rainbow" | "Galaxy";
export type RlmEffect = {
  name: "Particles" | "Laterns" | "Lights" | "Birds" | "Fog",
  color: string
}
export type ImageFrame = "Black" | "White" | "Gold"
