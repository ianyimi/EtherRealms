import dynamic from "next/dynamic";
const Realm = dynamic(import("Realm/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: 1500,
    scene: "Cubes",
    sky: {
      type: "Matrix",
      primaryColor: "Green",
      secondaryColor: "Black"
    },
    imageFrames: "White",
    effects: {
      name: "Fog",
      color: "Black"
    }
  }} />;
};
