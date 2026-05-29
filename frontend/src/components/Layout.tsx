import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, logout, isAuthenticated } = useAuth();

  // Close offcanvas when location changes
  useEffect(() => {
    const offcanvasEl = document.getElementById('sidebar');
    if (offcanvasEl) {
      // @ts-ignore
      const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasEl);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const displayName = role === 'admin' ? 'Administrador' : role === 'user' ? 'Usuário Padrão' : 'Visitante';
  const displayInitial = displayName.charAt(0);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-dark premium-nav">
        <div className="container-fluid d-flex align-items-center">
          <button
            className="btn btn-outline-light me-3 border-0 rounded-circle icon-btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="sidebar"
          >
            <i className="bi bi-list fs-4"></i>
          </button>
          <span className="navbar-brand mb-0 h1 fw-bold text-gradient">Jotta's Cursos</span>
        </div>
      </nav>

      {/* Sidebar (Offcanvas) */}
      <div
        className="offcanvas offcanvas-start text-bg-dark premium-sidebar"
        tabIndex={-1}
        id="sidebar"
        aria-labelledby="sidebarLabel"
      >
        <div className="offcanvas-header border-bottom border-secondary">
          <div className="d-flex align-items-center gap-3">
            <div className="avatar-circle">
              <span className="text-dark fw-bold">{displayInitial}</span>
            </div>
            <h5 className="offcanvas-title mb-0" id="sidebarLabel">{displayName}</h5>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0 d-flex flex-column justify-content-between">
          <div className="list-group list-group-flush mt-3">
            <Link
              to="/"
              className={`list-group-item list-group-item-action bg-transparent text-light border-0 px-4 py-3 sidebar-link ${location.pathname === '/' ? 'active-link' : ''}`}
            >
              <i className="bi bi-house-door me-3"></i>
              Home
            </Link>
            <Link
              to={isAuthenticated ? "/plataforma" : "/login"}
              className={`list-group-item list-group-item-action bg-transparent text-light border-0 px-4 py-3 sidebar-link ${location.pathname === '/plataforma' ? 'active-link' : ''}`}
            >
              <i className="bi bi-mortarboard me-3"></i>
              Jotta's Cursos
            </Link>
          </div>
          
          {isAuthenticated && (
            <div className="p-4 border-top border-secondary">
              <button 
                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i> Sair da Conta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main-content fade-in">
        <Outlet />
      </main>
    </div>
  );
};
