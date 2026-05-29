import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role: "admin" | "user") => {
    login(role);
    navigate("/plataforma");
  };

  return (
    <div className="home-container d-flex align-items-center justify-content-center min-vh-100 position-relative overflow-hidden">
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <div className="text-center z-1 glass-card p-5 rounded-4 shadow-lg slide-up" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="mb-4 d-flex justify-content-center">
          <div className="logo-icon bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm" style={{ width: '60px', height: '60px' }}>
            <i className="bi bi-person-circle fs-2"></i>
          </div>
        </div>
        <h2 className="fw-bold mb-4 text-dark">Acesso à Plataforma</h2>
        <p className="text-muted mb-4">Escolha seu perfil para testes:</p>
        
        <div className="d-grid gap-3">
          <button 
            className="btn btn-primary btn-lg rounded-pill fw-bold fs-6 shadow-sm hover-scale btn-gradient d-flex align-items-center justify-content-center gap-2"
            onClick={() => handleLogin("admin")}
          >
            <i className="bi bi-shield-lock-fill"></i> Login como Administrador
          </button>
          <button 
            className="btn btn-outline-primary btn-lg rounded-pill fw-bold fs-6 shadow-sm hover-scale d-flex align-items-center justify-content-center gap-2 bg-white"
            onClick={() => handleLogin("user")}
          >
            <i className="bi bi-person-fill"></i> Login como Usuário Normal
          </button>
        </div>
        
        <div className="mt-4">
          <button className="btn btn-link text-muted text-decoration-none" onClick={() => navigate('/')}>
            <i className="bi bi-arrow-left me-1"></i> Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
};
