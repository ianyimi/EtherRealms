import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState
} from "react";
import {Object3D} from "three";
import {useThree} from "@react-three/fiber";

type WorldState = {
  lights: MutableRefObject<any>[],
  setLights: Dispatch<SetStateAction<MutableRefObject<any>[]>>,
  bloomObjects: MutableRefObject<any>[],
  setBloomObjects: Dispatch<SetStateAction<MutableRefObject<any>[]>>
}

export const WorldContext = createContext({} as WorldState);
export const useWorld = (): WorldState => useContext(WorldContext);

export default function WorldState(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  const { scene } = useThree();

  const lightRef1 = useRef();
  const lightRef2 = useRef();
  const [lights, setLights] = useState<MutableRefObject<any>[]>([lightRef1, lightRef2])
  const [bloomObjects, setBloomObjects] = useState<MutableRefObject<any>[]>([])

  const dummyObj = new Object3D()
  dummyObj.position.set(46, 14, -79)
  scene.add(dummyObj)

  return (
    <WorldContext.Provider value={{lights, setLights, bloomObjects, setBloomObjects}}>
      <ambientLight intensity={0.1} ref={lightRef1} />
      <group name="mainLight">
        <directionalLight ref={lightRef2} position={[100, 40, -100]} intensity={0.15} target={dummyObj} />
        <mesh position={[46, 14, -79]}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>
      {children}
    </WorldContext.Provider>
  )
}
