import dynamic from "next/dynamic";

const World = dynamic(import("../World"), { ssr: false })

export default function Index() {
  return <World />
}
