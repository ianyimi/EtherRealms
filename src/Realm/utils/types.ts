export type RlmColor = "Red" | "Orange" | "Yellow" | "Green" | "Blue" | "Purple" | "White" | "Grey" | "Black";
export type SceneName = "Maze" | "Penthouse" | "Cubes" | "Matrix" | "Moon" | "Warehouse" | "Field" | "Mansion" | "Mars" | "Glacier";
export type RlmScene = {
  name: SceneName,
  start: [number, number, number],
  theme?: RlmColor,
  type: "Indoor" | "Outdoor" | "???",
  size: "Petite" | "Mediocre" | "Immense" | "Galactic"
}
export type RlmSky = {
  type: "Basic" | "Day" | "Night" | "Matrix" | "Rainbow" | "Galaxy" | "Portal" | "Cloudy" | "Milky Way",
  primaryColor?: RlmColor,
  secondaryColor?: RlmColor
};
export type EffectName = "Fog" | "Particles" | "Birds" | "Birds" | "Lanterns";
export type RlmEffect = {
  name: EffectName,
  color: RlmColor
}
export type ImageFrame = "Black" | "White" | "Gold";
