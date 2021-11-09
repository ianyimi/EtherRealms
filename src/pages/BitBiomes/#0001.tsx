import dynamic from "next/dynamic";

const Basketball = dynamic(import("worlds/Basketball"), { ssr: false });

export default function StarterPage() {
  return <Basketball />;
};
