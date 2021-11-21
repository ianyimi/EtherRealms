import { Image, Video } from "spacesvr";
import { GroupProps } from "@react-three/fiber"
import {MeshStandardMaterial} from "three";
import {Interactable} from "spacesvr";

interface MediaProps {
  src: string,
  link: string,
}

export default function Media(props: MediaProps & GroupProps) {

  const { src, link, ...restProps } = props;
  const IS_VIDEO = src.endsWith(".mp4");

  function visitAsset() {
    window.open(link, "_blank");
  }

  return (
    <group {...restProps}>
      <Interactable onClick={visitAsset}>
        <group>
          {IS_VIDEO ? (<Video
            src={src}
            scale={1.5}
            framed
            muted
            frameMaterial={new MeshStandardMaterial({ color: "black" })}
          />
          ) : (<Image
            src={src}
            scale={1.5}
            framed
            frameMaterial={new MeshStandardMaterial({ color: "black" })}
          />)}
        </group>
      </Interactable>
    </group>
  )
}