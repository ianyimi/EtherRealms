import DisplayCube from "./DisplayCube";
import { displayPositions, imageSources } from "../../utils/constants";
import fetchAssets from "../../../../utils/fetchAssets";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import { useRealm } from "../../../../components/RealmState";

const COUNT = 5

export default function DisplayCubes() {

  // const { user } = useMoralis();
  const { assets, setAssets } = useRealm();
  useEffect(() => {
    fetchAssets("0xA2bF505e8AC95856C3a7F454374C08ad83B8612A").then((assets) => {
      if (setAssets) {
        setAssets(assets)
      }
    })
  }, [])
  console.log(assets)

  const cubes = []
  for (let i=0; i<COUNT; i++) {
    cubes.push(
      <group rotation-y={2*i*Math.PI/COUNT} key={i}>
        <group position-z={-10}>
          <DisplayCube sources={imageSources[i]} position-y={1} />
        </group>
      </group>
    )
  }
  return (
    <group>
      {cubes}
    </group>
  )
}
