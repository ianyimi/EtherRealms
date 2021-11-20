import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {ImageFrame, RlmEffect, RlmScene, RlmSky} from "../utils/types";

type RealmState = {
  id: number,
  scene: RlmScene,
  sky: RlmSky,
  imageFrames: ImageFrame,
  effects?: RlmEffect
  assets?: Record<string, unknown>[],
  setAssets?: Dispatch<SetStateAction<Record<string, unknown>[]>>
}

export const RealmContext = createContext({} as RealmState);
export const useRealm = (): RealmState => useContext(RealmContext);

interface RealmStateProps {
  properties: RealmState,
  children: ReactNode | ReactNode[]
}

export default function RealmState(props: RealmStateProps) {
  const { properties, children } = props
  const [assets, setAssets] = useState<Record<string, unknown>[]>([])
  return (
    <RealmContext.Provider value={{...properties, assets, setAssets}}>
      {children}
    </RealmContext.Provider>
  )
}
