import { Image, Video } from "spacesvr";
import { GroupProps } from "@react-three/fiber"
import { MeshStandardMaterial } from "three";
import { Interactable } from "spacesvr";

interface MediaProps {
  src: string,
  link?: string,
  color: string,
  size?: number
}

export default function Media(props: MediaProps & GroupProps) {

  const { src, link, color, size = 1.5, ...restProps } = props;
  console.log()
  const IS_VIDEO = src.endsWith(".mp4");

  function visitAsset() {
    window.open(link, "_blank");
  }

  const imageMat = new MeshStandardMaterial({ color: color.toLowerCase() });

  return (
    <group {...restProps}>
      <Interactable onClick={!link ? undefined : visitAsset}>
        <group>
          {IS_VIDEO ? (<Video
            src={src}
            scale={size}
            framed
            muted
            frameMaterial={imageMat}
          />
          ) : (<Image
            src={src}
            scale={size}
            framed
            frameMaterial={imageMat}
          />)}
        </group>
      </Interactable>
    </group>
  )
}
