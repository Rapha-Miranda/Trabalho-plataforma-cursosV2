import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container d-flex align-items-center justify-content-center min-vh-100 position-relative overflow-hidden">
      {/* Background decorations */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>
      
      <div className="text-center z-1 glass-card p-5 rounded-4 shadow-lg slide-up">
        <div className="mb-4 d-flex justify-content-center">
          <div className="logo-icon bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm" style={{ width: '80px', height: '80px' }}>
            <i className="bi bi-rocket-takeoff-fill fs-1"></i>
          </div>
        </div>
        <h1 className="display-3 fw-bold mb-3 text-gradient">Jotta's Cursos</h1>
        <p className="lead text-muted mb-5 fs-4">Sua plataforma definitiva de aprendizado.</p>
        <button 
          className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold fs-5 shadow-sm hover-scale btn-gradient"
          onClick={() => navigate('/plataforma')}
        >
          Entrar na Plataforma <i className="bi bi-arrow-right ms-2"></i>
        </button>
      </div>
    </div>
  );
};
