import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext, useEffect,
  useRef,
  useState
} from "react";
import {Object3D} from "three";
import {useThree} from "@react-three/fiber";

type WorldState = {
  lights: MutableRefObject<any>[],
  setLights: Dispatch<SetStateAction<MutableRefObject<any>[]>>,
  bloomObjects: MutableRefObject<any>[],
  setBloomObjects: Dispatch<SetStateAction<MutableRefObject<any>[]>>,
  owner: Record<string, any>,
  setOwner: Dispatch<SetStateAction<Record<string, any>>>,
  assets: Record<string, any>[],
  setAssets: Dispatch<SetStateAction<Record<string, any>[]>>,
  assetsFetched: boolean,
  setAssetsFetched: Dispatch<SetStateAction<boolean>>
}

export const WorldContext = createContext({} as WorldState);
export const useWorld = (): WorldState => useContext(WorldContext);

export default function WorldState(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  const { scene } = useThree();

  const lightRef1 = useRef();
  const lightRef2 = useRef();
  const [lights, setLights] = useState<MutableRefObject<any>[]>([lightRef1, lightRef2]);
  const [bloomObjects, setBloomObjects] = useState<MutableRefObject<any>[]>([]);
  const [owner, setOwner] = useState<Record<string, any>>({});
  const [assets, setAssets] = useState<Record<string, any>[]>([]);
  const [assetsFetched, setAssetsFetched] = useState(false);

  const dummyObj = new Object3D()
  dummyObj.position.set(46, 14, -79)
  scene.add(dummyObj)

  return (
    <WorldContext.Provider value={{lights, setLights, bloomObjects, setBloomObjects, owner, setOwner, assets, setAssets, assetsFetched, setAssetsFetched}}>
      <ambientLight intensity={0.2} ref={lightRef1} />
      <group name="mainLight">
        <directionalLight ref={lightRef2} position={[100, 40, -100]} intensity={0.15} target={dummyObj} />
        <mesh position={[46, 14, -79]}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="white" visible={false} />
        </mesh>
      </group>
      {children}
    </WorldContext.Provider>
  )
}
