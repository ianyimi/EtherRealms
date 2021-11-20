import DisplayCube from "./DisplayCube";
import fetchAssets from "../../../../utils/fetchAssets";
import { useEffect } from "react";
import { useRealm } from "../../../../components/RealmState";

export default function DisplayCubes() {

  const { id, assets, setAssets } = useRealm();
  useEffect(() => {
    fetchAssets(id).then((assets) => {
      if (setAssets) {
        setAssets(assets)
      }
    })
  }, [])
  console.log(assets)

  const cubes = []
  if (assets) {
    for (let i=0; i<assets.length; i+=4) {
      if (assets.length-i<4) {
        break;
      }

      cubes.push(
        <group rotation-y={assets.length%4 === 0 ? 2*i*Math.PI/(assets.length) : 2*i*Math.PI/(assets.length-1)} key={i}>
          <group position-z={-10}>
            {/*<DisplayCube sources={imageSources[i]} position-y={1} />*/}
            <DisplayCube assets={[assets[i], assets[i+1], assets[i+2], assets[i+3]]} position-y={1} />
          </group>
        </group>
      )
    }
  }
  return (
    <group>
      {cubes}
    </group>
  )
}
