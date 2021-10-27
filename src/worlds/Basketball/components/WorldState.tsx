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

  const lightRef1 = useRef();
  const lightRef2 = useRef();
  const [lights, setLights] = useState<MutableRefObject<any>[]>([lightRef1, lightRef2])
  const [bloomObjects, setBloomObjects] = useState<MutableRefObject<any>[]>([])

  return (
    <WorldContext.Provider value={{lights, setLights, bloomObjects, setBloomObjects}}>
      <ambientLight ref={lightRef1} />
      <pointLight ref={lightRef2} position={[0, 10, 0]} distance={50} />
      {children}
    </WorldContext.Provider>
  )
}