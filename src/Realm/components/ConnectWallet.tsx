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
=======
import { useWeb3Context } from 'web3-react'

// This component must be a child of <App> to have access to the appropriate context
export default function ConnectWallet () {
  const context = useWeb3Context()

  useEffect(() => {
    context.setFirstValidConnector(['MetaMask', 'Infura'])
  }, [])

  if (!context.active && !context.error) {
    // loading
    console.log("loading...")
    return <></>
  } else if (context.error) {
    //error
    console.log("error")
    return <></>
  } else {
    // success
    console.log("success")
    console.log("account: " + context.account)
    return <></>
  }
}