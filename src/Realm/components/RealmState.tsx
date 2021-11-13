import {createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useContext} from "react";
import {ImageFrame, RlmEffect, RlmScene, RlmSky, SceneName} from "../utils/types";

type RealmState = {
  id: string,
  scene: RlmScene,
  sky: RlmSky,
  imageFrames: ImageFrame,
  effects?: RlmEffect
}

export const RealmContext = createContext({} as RealmState);
export const useRealm = (): RealmState => useContext(RealmContext);

interface RealmStateProps {
  properties: RealmState,
  children: ReactNode | ReactNode[]
}

export default function RealmState(props: RealmStateProps) {
  const { properties, children } = props
  return (
    <RealmContext.Provider value={{...properties}}>
      {children}
    </RealmContext.Provider>
  )
}
