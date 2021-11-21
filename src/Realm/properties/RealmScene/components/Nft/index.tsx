import Media from "./Media";
import { Text } from "@react-three/drei";

function Trait() {
  return (
    <group name="trait">

    </group>
  )
}

export default function Nft(props: { asset: Record<string, any>}) {
  const { asset } = props;
  const src = asset.animation_url && (asset.animation_url).endsWith(".mp4") ? asset.animation_url : asset.image_url;
  return (
    <group>
      <Media src={src} link={asset.permalink as string} />
      <Text fontSize={0.1} color="black" position={[0, -0.9, -0.075]}>{asset.name as string}</Text>
    </group>
  )
}
