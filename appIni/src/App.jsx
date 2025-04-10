import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext'; 
import { useAuth } from './contexts/AuthContext'; 
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import UserProfileForm from './views/UserProfilePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter> {/* ADICIONADO AQUI */}
        <AuthContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AuthContent() {
  const { user } = useAuth(); 

  return (
    <>
      {user ? (
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/user-prof" element={<UserProfileForm />} />
        </Routes>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
