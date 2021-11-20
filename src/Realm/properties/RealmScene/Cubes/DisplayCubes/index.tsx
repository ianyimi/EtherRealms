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
    console.log("fetch")
    // fetchAssets("0xA2bF505e8AC95856C3a7F454374C08ad83B8612A").then((assets) => {
    fetchAssets("0xb34af2448f1789ae942f592e8770da5c0293a15d").then((assets) => {
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
      // if (i>40) break;

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
