import dynamic from "next/dynamic";
const Realm = dynamic(import("Realm/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: 2745,
    scene: "Glacier",
    sky: "Blue",
    imageFrames: "White",
    // effects: {
    //   name: "Fog",
    //   color: "Black"
    // }
  }} />;
};
