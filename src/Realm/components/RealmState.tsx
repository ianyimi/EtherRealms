import {createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useContext} from "react";
import { RealmProps } from "../index";

export const RealmContext = createContext({} as RealmProps);
export const useRealm = (): RealmProps => useContext(RealmContext);

interface RealmStateProps {
  properties: RealmProps,
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
