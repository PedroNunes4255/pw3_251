import { auth } from '../firebase/config.js';
import './LoginPage.css';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

function LoginPage() {
  const [loginType, setLoginType] = useState('login');
  const [userCredenciais, setUserCredenciais] = useState({});
  const [error, setError] = useState('');

  function handleCred(e) {
    setUserCredenciais({ ...userCredenciais, [e.target.name]: e.target.value });
  }

  function handleSignUp(e) {
    e.preventDefault();
    setError('');

    createUserWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleSignIn(e) {
    e.preventDefault();
    setError('');

    signInWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset() {
    const email = prompt('Informe seu e-mail:');
    sendPasswordResetEmail(auth, email);
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Google login ok', result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {/* Importando Bootstrap */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row w-100">
          <div className="col-md-6 col-12 mx-auto p-4 bg-white shadow rounded">
            <h1 className="text-center">Etec Albert Einstein</h1>
            <p className="text-center">Entre ou crie uma conta para continuar.</p>

            <div className="d-flex justify-content-center mb-3">
              <button
                className={`btn btn-primary w-50 ${loginType === 'login' ? 'active' : ''}`}
                onClick={() => setLoginType('login')}
              >
                Entrar
              </button>
              <button
                className={`btn btn-secondary w-50 ${loginType === 'signup' ? 'active' : ''}`}
                onClick={() => setLoginType('signup')}
              >
                Criar Conta
              </button>
            </div>

            <form>
              <div className="mb-3">
                <label className="form-label">E-mail *</label>
                <input
                  onChange={handleCred}
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Informe seu email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Senha *</label>
                <input
                  onChange={handleCred}
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Informe a senha"
                />
              </div>

              {loginType === 'login' ? (
                <button onClick={handleSignIn} className="btn btn-success w-100">Entrar</button>
              ) : (
                <button onClick={handleSignUp} className="btn btn-success w-100">Criar Conta</button>
              )}

              <button onClick={handleGoogleLogin} className="btn btn-danger w-100 mt-2">
                Login com Google
              </button>

              {error && <div className="text-danger mt-3 text-center">{error}</div>}

              <p onClick={handlePasswordReset} className="text-primary text-center mt-3" style={{ cursor: 'pointer' }}>
                Esqueci minha senha.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
