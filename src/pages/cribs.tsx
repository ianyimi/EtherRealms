import dynamic from "next/dynamic";

const Cribs = dynamic(import("DivineRealms/Cribs"), { ssr: false });

export default function HomePage() {
  return <Cribs />;
};
