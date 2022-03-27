import { Image, Video } from "spacesvr";
import { GroupProps } from "@react-three/fiber"
import {MeshStandardMaterial} from "three";
import {Interactable} from "spacesvr";

interface MediaProps {
  src: string,
  link: string,
  color: string
}

export default function Media(props: MediaProps & GroupProps) {

  const { src, link, color, ...restProps } = props;
  const IS_VIDEO = src.endsWith(".mp4");

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
            scale={1.5}
            framed
            muted
            frameMaterial={imageMat}
          />
          ) : (<Image
            src={src}
            scale={1.5}
            framed
            frameMaterial={imageMat}
          />)}
        </group>
      </Interactable>
    </group>
  )
}
