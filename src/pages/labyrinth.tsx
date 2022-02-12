import dynamic from "next/dynamic";

const Labyrinth = dynamic(import("Labyrinth"), { ssr: false });

export default function HomePage() {
  return <Labyrinth />;
};
