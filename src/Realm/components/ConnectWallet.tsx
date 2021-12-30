import { useEffect } from 'react'
import { useMoralis } from "react-moralis";
import { useRealm } from "./RealmState";

export default function ConnectWallet () {
  const { owner, setCurrentUser } = useRealm()
  const { authenticate, isAuthenticated, isAuthenticating, user, logout } = useMoralis();
  useEffect(() => {
    if (!isAuthenticated) {
      authenticate();
    }
  }, [])
  if (isAuthenticated) {
    if (setCurrentUser) setCurrentUser(user as any)
  }

  return <></>
}
