import Media from "./Media";
import Trait from "./Trait";
import { Box, Text } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { useRealm } from "../../../../components/RealmState";
import * as THREE from "three";

const TEXT_COLOR = "black";
const FONT = "https://d1p3v0j4bqcb21.cloudfront.net/fonts/Graffiti+City.otf";

function camelCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function Nft(props: { asset: Record<string, any> } & GroupProps) {
  const { asset, ...restProps } = props;
  const src = asset.animation_url && (asset.animation_url).endsWith(".mp4") ? asset.animation_url : asset.image_url;
  const { scene: { theme = "Red" } } = useRealm();
  const themeColorRGB = new THREE.Color(theme.toLowerCase());
  const textColor = new THREE.Color(1-themeColorRGB.r, 1-themeColorRGB.g, 1-themeColorRGB.b)

  const traits = []
  if (asset.traits && asset.traits.length>0) {
    for (let i=0, j=0; i<asset.traits.length && i<6; i++) {
      const currentTrait = asset.traits[i];
      if (currentTrait.trait_count !== 0) {
        traits.push(
          <group name={`trait_${i}`} key={i}>
            <Trait
              title={currentTrait.trait_type}
              value={currentTrait.value}
              count={currentTrait.trait_count}
              supply={asset.totalSupply}
              position-x={(i%2)*0.95 + 0.025}
              position-y={j*(-0.55)}
            />
          </group>
        )
        if (i%2 === 1) j++;
      }
    }
  }
  return (
    <group {...restProps}>
      <Media src={src} link={asset.permalink && asset.permalink as string} position-y={0.1} />
      <Text
        fontSize={0.175}
        color={textColor}
        position={[0, -0.85, -0.1]}
        depthOffset={-1}
        textAlign="center"
        maxWidth={2}
        font={FONT}
      >
        {asset.name ? asset.name as string : `#${asset.token_id}`}
      </Text>
      <group name="traits" position={[-0.5, -1.3, -0.1]}>{traits}</group>
    </group>
  )
}
