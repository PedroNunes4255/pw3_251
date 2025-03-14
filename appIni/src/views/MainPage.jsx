import { auth } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

function MainPage(){
    const handleSingOut =() =>{
        auth.signOut()
    }


    const { user } = useAuth()


    return (
        <div>
            <h1>Pagina Principal</h1>
            Bem vindo
            { user.displayName && <p> Nome: {user.displayName} </p>}
    
            { user.photoURL && <img src={user.photoURL} alt="foto"></img> }

            {<p> e-mail: {user.email} </p>}
            Sucesso.
    
            <button onClick={handleSingOut} >Sair</button>
        </div>
    )
}

export default MainPage

