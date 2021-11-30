import Media from "./Media";
import { Box, Text } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { useRealm } from "../../../../components/RealmState";
import * as THREE from "three";

const TEXT_COLOR = "black";
const FONT = "https://d1p3v0j4bqcb21.cloudfront.net/fonts/Graffiti+City.otf";

function Trait(props: { title: string, value: string, count: number, supply: number } & GroupProps) {

  const { title, value, count, supply, ...restProps } = props;
  const { scene: { theme } } = useRealm();

  let percentage = Math.round((count/supply)*10000)/100;
  if (percentage === 0) percentage = Math.round((count/supply)*100000)/1000;
  if (percentage === 0) percentage = Math.round((count/supply)*1000000)/10000;

  return (
    <group name="trait" {...restProps}>
      <Box args={[0.75, 0.5, 0.1]}>
        <meshStandardMaterial color="white" />
      </Box>
      <group position-z={0.075}>
        <Text fontSize={0.1} color={TEXT_COLOR} position-y={0.175}>{title}</Text>
        <Text fontSize={0.2} color={theme ? theme.toLowerCase() : TEXT_COLOR} position-y={0}>{value}</Text>
        <Text fontSize={0.1} color={TEXT_COLOR} position-y={-0.175}>{count === 1 ? `1/1` : `${percentage}%`}</Text>
      </group>
    </group>
  )
}

export default function Nft(props: { asset: Record<string, any> } & GroupProps) {
  const { asset, ...restProps } = props;
  const src = asset.animation_url && (asset.animation_url).endsWith(".mp4") ? asset.animation_url : asset.image_url;
  const { scene: { theme = "Red" } } = useRealm();
  const themeColorRGB = new THREE.Color(theme.toLowerCase());
  const textColor = new THREE.Color(1-themeColorRGB.r, 1-themeColorRGB.g, 1-themeColorRGB.b)

  const traits = []
  if (asset.traits && asset.traits.length>0) {
    for (let i=0, j=0; i<asset.traits.length; i++) {
      const currentTrait = asset.traits[i];
      traits.push(
        <group name={`trait_${i}`} key={i}>
          <Trait
            title={currentTrait.trait_type}
            value={currentTrait.value}
            count={currentTrait.trait_count}
            supply={asset.totalSupply}
            position-x={(i%2)}
            position-y={j*(-0.55)}
          />
        </group>
      )
      if (i%2 === 1) j++;
    }
  }
  return (
    <group {...restProps}>
      <Media src={src} link={asset.permalink && asset.permalink as string} position-y={0.1} />
      <Text
        fontSize={0.175}
        color={textColor}
        position={[0, -0.9, -0.075]}
        textAlign="center"
        maxWidth={2}
        font={FONT}
      >
        {asset.name ? asset.name as string : `#${asset.token_id}`}
      </Text>
      {/*<group name="traits" position={[-0.5, -1.3, -0.1]}>{traits}</group>*/}
    </group>
  )
}
