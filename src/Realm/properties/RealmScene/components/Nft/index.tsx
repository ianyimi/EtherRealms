import Media from "./Media";
import { Box, Text } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { useRealm } from "../../../../components/RealmState";

const TEXT_COLOR = "black";

function Trait(props: { title: string, value: string, count: number, supply: number } & GroupProps) {

  const { title, value, count, supply, ...restProps } = props;
  const { scene: { theme } } = useRealm();

  let percentage = Math.floor((count/supply)*100)/100;
  if (percentage === 0) percentage = Math.floor((count/supply)*1000)/1000;
  if (percentage === 0) percentage = Math.floor((count/supply)*10000)/10000;

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
  const traits = []
  if (asset.traits && asset.traits.length>0) {
    for (let i=0, j=0; i<asset.traits.length; i++) {
      const currentTrait = asset.traits[i];
      traits.push(
        <group name={`trait_${i}`}>
          <Trait
            title={currentTrait.trait_type}
            value={currentTrait.value}
            count={currentTrait.trait_count}
            supply={asset.totalSupply}
            position-x={(i%2)}
            position-y={j*(-0.55)}
            key={i}
          />
        </group>
      )
      if (i%2 === 1) j++;
    }
  }
  return (
    <group {...restProps}>
      <Media src={src} link={asset.permalink as string} />
      <Text fontSize={0.15} color={TEXT_COLOR} position={[0, -0.9, -0.075]}>{asset.name as string}</Text>
      {/*<Trait title="Accessory" value="Earring" count={2497} supply={9999} position={[0.5, -1.5, -0.1]} />*/}
      <group name="traits" position={[-0.5, -1.3, -0.1]}>{traits}</group>
    </group>
  )
}
