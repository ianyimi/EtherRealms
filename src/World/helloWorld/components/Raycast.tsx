import { useEffect } from "react";
import { usePlayer } from "spacesvr";

export default function Raycast() {

  const { raycaster } = usePlayer();
  useEffect(() => {
    console.log(raycaster)
    if (raycaster) raycaster.far = 10;
  }, [raycaster])

  return (
    <group>

    </group>
  )
}