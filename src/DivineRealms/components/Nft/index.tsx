import Media from "./Media";
import Trait from "./Trait";
import { Text } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import * as THREE from "three";
import { useWorld } from "../../Cribs/components/WorldState";

const FONT = "https://d1p3v0j4bqcb21.cloudfront.net/fonts/Graffiti+City.otf";

export default function Nft(props: { asset: Record<string, any>, theme?: string } & GroupProps) {
  const { asset, theme = "black", ...restProps } = props;
  const { assets } = useWorld();
  const src = asset?.animation_url && (asset?.animation_url).endsWith(".mp4") ? asset?.animation_url : asset?.image_url;
  const themeColorRGB = new THREE.Color(theme.toLowerCase());
  const textColor = new THREE.Color(1-themeColorRGB.r, 1-themeColorRGB.g, 1-themeColorRGB.b)

  const traits = []
  if (asset?.traits && asset?.traits.length>0) {
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
      } else {
        asset.traits.splice(asset.traits.indexOf(currentTrait), 1);
        i--;
      }
    }
  }

  // const args = [2.25, 3.75, 0.125];

  return (
    <group {...restProps}>
      <mesh position={[0, 0, -0.25]}>
        <boxBufferGeometry args={[3, 3, 0.25]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {assets.length > 0 && <Media src={src} color={theme} size={2} link={asset.permalink && asset.permalink as string} position={[0, asset?.name.length > 25 ? 0.25 : 0.1, -0.05]} />}
      <Text
        fontSize={0.3}
        color={textColor}
        position={[0, asset?.name.length > 25 ? -1.175 : -1.2, -0.1]}
        depthOffset={-1}
        textAlign="center"
        maxWidth={3}
        font={FONT}
      >
        {asset?.name ? asset?.name as string : `#${asset?.token_id.length < 6 ? asset?.token_id : ""}`}
      </Text>
      {/*<group name="traits" position={[-0.5, -1.3, -0.1]}>*/}
      {/*  {assets.length > 0 && traits}*/}
      {/*</group>*/}
    </group>
  )
}
