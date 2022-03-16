import dynamic from "next/dynamic";
const Realm = dynamic(import("EtherRealms/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: 1600,
    scene: "Matrix",
    sky: {
      type: "Cloudy",
      primaryColor: "Blue"
    },
    imageFrames: "White",
    // effects: {
    //   name: "Fog",
    //   color: "Black"
    // }
  }} />;
};
