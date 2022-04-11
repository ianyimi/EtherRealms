import Media from "./Media";
import Trait from "./Trait";
import { Text } from "@react-three/drei";
import {GroupProps, useLoader} from "@react-three/fiber";
import * as THREE from "three";
import { useWorld } from "../../Cribs/components/WorldState";
import { animated, useSpring } from "@react-spring/three";

const FONT = "https://d1p3v0j4bqcb21.cloudfront.net/fonts/Graffiti+City.otf";
const BRAND_FONT = "https://d1p3v0j4bqcb21.cloudfront.net/fonts/Etherrealms.otf";
const NULL_ADDRESS =  "0x0000000000000000000000000000000000000000";
const DEPLOYER_WALLET = "0x59A08c0433D06080aA56E14D39B0300095A4fe34";
const DEFAULT_PFP = "https://d1p3v0j4bqcb21.cloudfront.net/images/etherrealmspfp.png";

export default function Nft(props: { asset: Record<string, any>, theme?: string, index: number } & GroupProps) {
  const { asset, theme = "black", index, ...restProps } = props;
  const { assetsFetched, owner } = useWorld();
  const { assets } = useWorld();
  const src = asset?.animation_url && (asset?.animation_url).endsWith(".mp4") ? asset?.animation_url : asset?.image_url;
  const themeColorRGB = new THREE.Color(theme.toLowerCase());
  const textColor = new THREE.Color(1-themeColorRGB.r, 1-themeColorRGB.g, 1-themeColorRGB.b);
  const unowned = (owner.address === NULL_ADDRESS) || (owner.address === DEPLOYER_WALLET);

  // const { scale } = useSpring({
  //   scale: assetsFetched ? 1 : 0,
  //   config: {
  //     mass: 1
  //   }
  // })

  // const traits = []
  // if (asset?.traits && asset?.traits.length>0) {
  //   for (let i=0, j=0; i<asset.traits.length && i<6; i++) {
  //     const currentTrait = asset.traits[i];
  //     if (currentTrait.trait_count !== 0) {
  //       traits.push(
  //         <group name={`trait_${i}`} key={i}>
  //           <Trait
  //             title={currentTrait.trait_type}
  //             value={currentTrait.value}
  //             count={currentTrait.trait_count}
  //             supply={asset.totalSupply}
  //             position-x={(i%2)*0.95 + 0.025}
  //             position-y={j*(-0.55)}
  //           />
  //         </group>
  //       )
  //       if (i%2 === 1) j++;
  //     } else {
  //       asset.traits.splice(asset.traits.indexOf(currentTrait), 1);
  //       i--;
  //     }
  //   }
  // }

  // console.log(assetsFetched)
  // const args = [2.25, 3.75, 0.125];

  return (
    <group {...restProps} name={asset?.name ? `[${index}] - ${asset?.name as string}` : `[${index}] - #${asset?.token_id.length < 6 ? asset?.token_id : ""}`}>
      <group>
        <mesh position={[0, 0, -0.25]}>
          <boxBufferGeometry args={[3, 3, 0.25]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <Media src={unowned ? DEFAULT_PFP : src} color={theme} size={2} link={unowned ? undefined : asset.permalink && asset.permalink as string} position={[0, asset?.name && asset?.name.length > 25 ? 0.25 : 0.1, -0.05]} />
        <Text
          fontSize={unowned ? 0.45 : 0.3}
          color={textColor}
          position={[0, unowned ? -1.1 : asset?.name && asset?.name.length > 25 ? -1.175 : -1.2, -0.1]}
          depthOffset={-1}
          textAlign="center"
          maxWidth={3}
          font={FONT}
        >
          {unowned ? "EtherRealms" : asset?.name ? asset?.name as string : `#${asset?.token_id.length < 6 ? asset?.token_id : ""}`}
        </Text>
        {/*<group name="traits" position={[-0.5, -1.3, -0.1]}>*/}
        {/*  {assets.length > 0 && traits}*/}
        {/*</group>*/}
      </group>
    </group>
  )
}
