import React from 'react'
import {useUser} from './context/user-context'
import { Icon } from "antd";

const loadAuthenticatedApp = () => import('./pages/AuthenticatedApp')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./pages/Login'))

function App() {
  const user = useUser()
  // pre-load the authenticated side in the background while the user's
  // filling out the login form.
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])

  return (
    <React.Suspense fallback={<Icon type="loading" spin={true} />}>
      {user ? <AuthenticatedApp user={user} /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App