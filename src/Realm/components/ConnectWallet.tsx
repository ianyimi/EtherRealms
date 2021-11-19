import { useEffect } from 'react'
import {useMoralis} from "react-moralis";

export default function ConnectWallet () {
  const { authenticate, isAuthenticated, isAuthenticating, user, logout } = useMoralis();
  useEffect(() => {
    if (!isAuthenticated) {
      authenticate();
    }
  }, [])
  if (isAuthenticated) {
    console.log(user?.get("ethAddress"))
  }

  return <></>
}
