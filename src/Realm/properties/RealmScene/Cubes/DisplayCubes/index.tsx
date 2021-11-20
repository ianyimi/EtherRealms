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
    fetchAssets("0x80207b6ef45dcd6e2d2f5bf692320c8b46b6bf09").then((assets) => {
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
      if (i>40) break;
      // if (!assets[1] || !assets[i+1] || assets[1+2] || assets[i+3]) break;
      const imgSources = [
        assets[i].animation_url || assets[i].image_url,
        assets[i+1].animation_url || assets[i+1].image_url,
        assets[i+2].animation_url || assets[i+2].image_url,
        assets[i+3].animation_url || assets[i+3].image_url
      ],
        links = [
          assets[i].permalink,
          assets[i+1].permalink,
          assets[i+2].permalink,
          assets[i+3].permalink
        ];
      cubes.push(
        <group rotation-y={assets.length%4 === 0 ? 2*i*Math.PI/(assets.length) : 2*i*Math.PI/(assets.length-1)} key={i}>
          <group position-z={-10}>
            {/*<DisplayCube sources={imageSources[i]} position-y={1} />*/}
            <DisplayCube sources={imgSources as string[]} links={links as string[]} position-y={1} />
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
