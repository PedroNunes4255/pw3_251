import { auth } from '../firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o Bootstrap
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

function MainPage() {
  const { user } = useAuth();

  const handleSignOut = () => {
    auth.signOut();
  };

  if (!user) {
    return <p className="text-center mt-5">Carregando informações do usuário...</p>;
  }

  return (
    <div className="container mt-4">
      <Header pageTitle="Página Principal" />
      <div className="card shadow p-4 text-center mx-auto" style={{ maxWidth: '400px' }}>
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Foto do usuário"
            className="rounded-circle mb-3"
            style={{ width: '80px', height: '80px' }}
          />
        )}
        {user.displayName && <h5 className="fw-bold">Nome: {user.displayName}</h5>}
        <button className="btn btn-danger mt-3 w-100" onClick={handleSignOut}>Logout</button>
      </div>
    </div>
  );
}

export default MainPage;


