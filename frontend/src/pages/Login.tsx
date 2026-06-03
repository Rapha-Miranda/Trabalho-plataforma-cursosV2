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
        <ul className="nav nav-pills nav-justified mb-4">
          <li className="nav-item">
            <button className="nav-link active bg-primary text-white fw-bold rounded-pill" data-bs-toggle="pill" data-bs-target="#login-tab">Login (Simulação)</button>
          </li>
          <li className="nav-item ms-2">
            <button className="nav-link bg-light text-dark fw-bold rounded-pill border" data-bs-toggle="pill" data-bs-target="#register-tab">Novo Usuário</button>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="login-tab">
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
          </div>

          <div className="tab-pane fade" id="register-tab">
            <h4 className="fw-bold mb-4 text-dark">Criar Conta</h4>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const nome = (form.elements.namedItem("nome") as HTMLInputElement).value;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              try {
                await fetch("http://localhost:3000/usuarios", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ NomeCompleto: nome, Email: email, SenhaHash: "123", DataCadastro: new Date().toISOString().split('T')[0] })
                });
                alert("Usuário registrado via JSON Server com sucesso!");
                form.reset();
              } catch(err) {
                alert("Erro ao conectar com json-server. Ele está rodando na porta 3000?");
              }
            }}>
              <input type="text" name="nome" className="form-control mb-3 rounded-pill px-4" placeholder="Nome Completo" required />
              <input type="email" name="email" className="form-control mb-4 rounded-pill px-4" placeholder="E-mail" required />
              <button type="submit" className="btn btn-dark w-100 rounded-pill fw-bold py-2">Cadastrar via API</button>
            </form>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <button className="btn btn-link text-muted text-decoration-none" onClick={() => navigate('/')}>
            <i className="bi bi-arrow-left me-1"></i> Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
};
