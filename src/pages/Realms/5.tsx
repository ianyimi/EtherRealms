import dynamic from "next/dynamic";
const Realm = dynamic(import("Realm/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: 1500,
    scene: "Glacier",
    sky: "Day",
    imageFrames: "White",
    effects: {
      name: "Fog",
      color: "White"
    }
  }} />;
};
