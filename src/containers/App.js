import React from 'react'
import {useUser} from '../context/user-context'
import Loading from '../components/Loading';
import "./App.css"

const loadAuthenticatedApp = () => import('../pages/AuthenticatedApp')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

function App() {
  const user = useUser()
  // pre-load the authenticated side in the background while the user's
  // filling out the login form.
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])

  return (
    <React.Suspense fallback={<Loading title="Cargando página"/>}>
      {user ? <AuthenticatedApp user={user} /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App