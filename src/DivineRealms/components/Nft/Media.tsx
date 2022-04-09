import { Image, Video } from "spacesvr";
import { GroupProps } from "@react-three/fiber"
import {MeshStandardMaterial} from "three";
import {Interactable} from "spacesvr";

const DEFAULT_PFP = "https://d1p3v0j4bqcb21.cloudfront.net/images/etherrealmspfp.png";

interface MediaProps {
  src: string,
  link: string,
  color: string,
  size?: number
}

export default function Media(props: MediaProps & GroupProps) {

  const { src = DEFAULT_PFP, link, color, size = 1.5, ...restProps } = props;
  const mediaSrc = `https://ipfs.io/ipfs/${src?.substring(6)}`
  console.log(mediaSrc)
  const IS_IPFS = src?.includes("ipfs://");
  const IS_VIDEO = src?.endsWith(".mp4");

  function visitAsset() {
    window.open(link, "_blank");
  }

  const imageMat = new MeshStandardMaterial({ color: color.toLowerCase() });

  return (
    <group {...restProps}>
      <Interactable onClick={visitAsset}>
        <group>
          {IS_VIDEO ? (<Video
            src={src}
            scale={size}
            framed
            muted
            frameMaterial={imageMat}
          />
          ) : (<Image
            src={IS_IPFS ? mediaSrc : src}
            scale={size}
            framed
            frameMaterial={imageMat}
          />)}
        </group>
      </Interactable>
    </group>
  )
}
