import './App.css'
import LoginPage from './views/LoginPage'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'
import MainPage from './views/MainPage'

function App() {

  return (
    <>
    <AuthProvider>
      <AuthContext/>
    </AuthProvider>

    </>
  )
}

function AuthContext(){
   const { user } = useAuth()

   return(
      <>
       { user ? <MainPage/> : <LoginPage/> }
      </>
   )
}

export default App