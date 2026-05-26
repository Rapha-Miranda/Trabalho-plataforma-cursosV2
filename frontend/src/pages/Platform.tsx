import { useState } from "react";

const TABS = [
  "Trilhas",
  "Cursos",
  "Módulos",
  "Aulas",
  "Usuários",
  "Assinaturas",
  "Certificados"
];

export const Platform = () => {
  const [activeTab, setActiveTab] = useState("Certificados");

  return (
    <div className="platform-container h-100">
      <div className="bg-white shadow-sm pt-4 px-4 border-bottom">
        <h2 className="mb-4 fw-bold text-dark">Plataforma</h2>
        <ul className="nav nav-tabs premium-tabs border-0" role="tablist">
          {TABS.map((tab) => (
            <li className="nav-item" role="presentation" key={tab}>
              <button
                className={`nav-link fs-6 fw-semibold px-4 py-3 border-0 bg-transparent ${activeTab === tab ? "active text-primary" : "text-secondary"}`}
                onClick={() => setActiveTab(tab)}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab}
                {activeTab === tab && (
                  <div className="active-indicator bg-primary"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 p-md-5 bg-light min-vh-100">
        <div className="glass-card bg-white p-5 rounded-4 shadow-sm slide-up">
          <div className="d-flex align-items-center mb-4">
            <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
              <i className={`bi fs-4 ${getIconForTab(activeTab)}`}></i>
            </div>
            <h1 className="display-5 fw-bold text-dark mb-0">{activeTab}</h1>
          </div>
          <hr className="my-4 text-muted opacity-25" />
          <div className="content-placeholder py-5 text-center">
            <i className="bi bi-box-seam fs-1 text-muted opacity-50 mb-3 d-block"></i>
            <h4 className="text-muted fw-normal">Conteúdo da aba <span className="fw-bold text-dark">{activeTab}</span> em construção</h4>
            <p className="text-secondary mt-2">Sei lá 123.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for some nice icons
function getIconForTab(tab: string) {
  switch (tab) {
    case "Trilhas": return "bi-map";
    case "Cursos": return "bi-collection-play";
    case "Módulos": return "bi-view-list";
    case "Aulas": return "bi-play-btn";
    case "Usuários": return "bi-people";
    case "Assinaturas": return "bi-card-checklist";
    case "Certificados": return "bi-patch-check";
    default: return "bi-folder";
  }
}
