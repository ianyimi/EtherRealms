import dynamic from "next/dynamic";
const Realm = dynamic(import("EtherRealms/index"), { ssr: false });

export default function StarterPage() {
  return <Realm properties={{
    id: 2745,
    scene: "Moon",
    sky: {
      type: "Night",
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
