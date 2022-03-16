import dynamic from "next/dynamic";
const Realm = dynamic(import("EtherRealms/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: 1500,
    scene: "Cubes",
    sky: {
      type: "Heatwave",
      primaryColor: "Red",
      secondaryColor: "White",
      tertiaryColor: "Purple",
      speed: Math.random()+0.25,
      permutations: Math.random()*10,
      iterations: Math.random()*10
    },
    imageFrames: "White",
    effects: {
      name: "Fog",
      color: "Black"
    }
  }} />;
};
