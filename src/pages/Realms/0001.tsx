import dynamic from "next/dynamic";
const Realm = dynamic(import("Realm/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: "0001",
    scene: "Cubes",
    sky: "Purple",
    imageFrames: "Black",
    effects: undefined
  }} />;
};
