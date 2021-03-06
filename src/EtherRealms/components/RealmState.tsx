import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {ImageFrame, RlmEffect, RlmScene, RlmSky} from "../utils/types";

type RealmState = {
  id: number,
  scene: RlmScene,
  sky: RlmSky,
  imageFrames: ImageFrame,
  effects?: RlmEffect,
  assets?: Record<string, any>[],
  setAssets?: Dispatch<SetStateAction<Record<string, any>[]>>,
  owner?: Record<string, any>,
  setOwner?: Dispatch<SetStateAction<Record<string, any>>>,
  currentUser?: Record<string, any>,
  setCurrentUser?: Dispatch<SetStateAction<Record<string, any>>>,
}

type RealmStateContext = {
  assetsFetched: boolean,
  setAssetsFetched: Dispatch<SetStateAction<boolean>>
} & RealmState

export const RealmContext = createContext({} as RealmStateContext);
export const useRealm = (): RealmStateContext => useContext(RealmContext);

interface RealmStateProps {
  properties: RealmState,
  children: ReactNode | ReactNode[]
}

export default function RealmState(props: RealmStateProps) {
  const { properties, children } = props
  const [assets, setAssets] = useState<Record<string, any>[]>([])
  const [owner, setOwner] = useState<Record<string, any>>()
  const [currentUser, setCurrentUser] = useState<Record<string, any>>()
  const [assetsFetched, setAssetsFetched] = useState(false)
  return (
    <RealmContext.Provider value={{
      ...properties,
      assets,
      setAssets,
      owner,
      setOwner,
      currentUser,
      setCurrentUser,
      assetsFetched,
      setAssetsFetched
    }}>
      {children}
    </RealmContext.Provider>
  )
}
