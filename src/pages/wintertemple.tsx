import dynamic from "next/dynamic";

const WinterTemple = dynamic(import("DivineRealms/WinterTemple"), { ssr: false });

export default function HomePage() {
  return <WinterTemple />;
};
