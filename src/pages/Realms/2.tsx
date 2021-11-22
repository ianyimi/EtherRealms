import dynamic from "next/dynamic";
const Realm = dynamic(import("Realm/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: 1600,
    scene: "Matrix",
    sky: "Night",
    imageFrames: "White",
    // effects: {
    //   name: "Fog",
    //   color: "Black"
    // }
  }} />;
};
