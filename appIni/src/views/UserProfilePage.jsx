import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfileForm = () => {
  const pageTitle = "Perfil Usuário";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    photo: '',
    birthDate: '',
    telefone: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setFormData(userDoc.data());
          }
        }
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do usuário');
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      if (!auth.currentUser) {
        throw new Error('Usuário não está autenticado');
      }

      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        ...formData,
        email: auth.currentUser.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccess(true);
      navigate("/");
    } catch (err) {
      setError('Erro ao salvar dados. Por favor, tente novamente.');
      console.error('Erro:', err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Header pageTitle={pageTitle} />
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Complete seu Perfil</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Dados salvos com sucesso!</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome Completo</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Foto URL</label>
            <input type="text" name="photo" value={formData.photo} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Data de Nascimento</label>
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone</label>
            <input type="number" name="telefone" value={formData.telefone} onChange={handleChange} className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary w-100">Salvar Dados</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;