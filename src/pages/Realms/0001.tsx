import dynamic from "next/dynamic";
const Realm = dynamic(import("Realm/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: "0001",
    scene: {
      name: "Cubic Dimension",
      type: "Outdoor",
      size: "Mediocre"
    },
    sky: "Night",
    imageFrames: "black",
    effects: undefined
  }} />;
};
