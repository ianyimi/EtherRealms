import dynamic from "next/dynamic";
const Realm = dynamic(import("EtherRealms/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: 1500,
    scene: "Glacier",
    // sky: {
    //   type: "Night",
    //   primaryColor: "Red",
    //   secondaryColor: "Black"
    // },
    sky: {
      type: "Milky Way",
      primaryColor: "Red",
      secondaryColor: "White",
      tertiaryColor: "Purple",
      speed: Math.random()+0.25,
      permutations: Math.random()*10,
      iterations: Math.random()*10
    },
    imageFrames: "White",
    effects: {
      name: "Particles",
      color: "Pink"
    }
  }} />;
};
