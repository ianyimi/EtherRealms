import dynamic from "next/dynamic";
const Realm = dynamic(import("Realm/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: 1500,
    scene: "Cubes",
    sky: {
      type: "Milky Way",
      primaryColor: "Green",
      secondaryColor: "Blue"
    },
    imageFrames: "White",
    effects: {
      name: "Fog",
      color: "Black"
    }
  }} />;
};
