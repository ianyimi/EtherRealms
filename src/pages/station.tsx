import dynamic from "next/dynamic";

const Station = dynamic(import("DivineRealms/Station"), { ssr: false });

export default function HomePage() {
  return <Station />;
};
