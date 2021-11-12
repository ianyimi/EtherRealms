import { Image, Video } from "spacesvr";
import { GroupProps } from "@react-three/fiber"
import {MeshStandardMaterial} from "three";

interface MediaProps {
  src: string,
}

export default function Media(props: MediaProps & GroupProps) {

  const { src, ...restProps } = props;
  const IS_VIDEO = src.endsWith(".mp4");

  return (
    <group {...restProps}>
      {IS_VIDEO ? (<group>
        <Video
          src={src}
          scale={1.5}
          framed
          frameMaterial={new MeshStandardMaterial({ color: "black" })}
        />
      </group>) : (<group>
        <Image
          src={src}
          scale={1.5}
          framed
          frameMaterial={new MeshStandardMaterial({ color: "black" })}
        />
      </group>)}
    </group>
  )
}