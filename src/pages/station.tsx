import dynamic from "next/dynamic";

const Station = dynamic(import("DivineRealms/Cribs"), { ssr: false });

export default function HomePage() {
  return <Station />;
};
