import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

const ALL_TABS = [
  "Trilhas",
  "Cursos",
  "Módulos",
  "Aulas",
  "Usuários",
  "Assinaturas",
  "Certificados"
];

export const Platform = () => {
  const { role, isAuthenticated } = useAuth();
  const { 
    aulas, cursos, trilhas, modulos, usuarios, assinaturas, certificados,
    addAula, removeAula,
    addCurso, removeCurso,
    addTrilha, removeTrilha,
    addModulo, removeModulo,
    addAssinatura, removeAssinatura
  } = useData();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Trilhas");

  // Form States
  const [newAula, setNewAula] = useState({ title: "", youtubeUrl: "" });
  const [newCurso, setNewCurso] = useState({ title: "", description: "", duration: "" });
  const [newTrilha, setNewTrilha] = useState({ title: "", description: "", courses: "" });
  const [newModulo, setNewModulo] = useState({ title: "", courseName: "", classCount: "" });
  const [newAssinatura, setNewAssinatura] = useState({ name: "", price: "", benefits: "" });

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const visibleTabs = ALL_TABS.filter(tab => tab === "Usuários" ? role === "admin" : true);
  if (!visibleTabs.includes(activeTab)) setActiveTab(visibleTabs[0]);

  // Handlers
  const handleAddAula = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAula.title || !newAula.youtubeUrl) return;
    addAula(newAula);
    setNewAula({ title: "", youtubeUrl: "" });
  };

  const handleAddCurso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCurso.title || !newCurso.description || !newCurso.duration) return;
    addCurso(newCurso);
    setNewCurso({ title: "", description: "", duration: "" });
  };

  const handleAddTrilha = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrilha.title || !newTrilha.description || !newTrilha.courses) return;
    addTrilha({ ...newTrilha, courses: newTrilha.courses.split(",").map(c => c.trim()) });
    setNewTrilha({ title: "", description: "", courses: "" });
  };

  const handleAddModulo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModulo.title || !newModulo.courseName || !newModulo.classCount) return;
    addModulo({ ...newModulo, classCount: Number(newModulo.classCount) });
    setNewModulo({ title: "", courseName: "", classCount: "" });
  };

  const handleAddAssinatura = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssinatura.name || !newAssinatura.price || !newAssinatura.benefits) return;
    addAssinatura({ ...newAssinatura, benefits: newAssinatura.benefits.split(",").map(b => b.trim()) });
    setNewAssinatura({ name: "", price: "", benefits: "" });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Trilhas":
        return (
          <div>
            {role === "admin" && (
              <div className="mb-5 bg-light p-4 rounded-4 border">
                <h4 className="fw-bold mb-3"><i className="bi bi-plus-circle-fill text-primary me-2"></i>Adicionar Nova Trilha</h4>
                <form onSubmit={handleAddTrilha} className="row g-3">
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Título" value={newTrilha.title} onChange={e => setNewTrilha({...newTrilha, title: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Descrição" value={newTrilha.description} onChange={e => setNewTrilha({...newTrilha, description: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Cursos (separados por vírgula)" value={newTrilha.courses} onChange={e => setNewTrilha({...newTrilha, courses: e.target.value})} />
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-primary fw-bold">Salvar Trilha</button>
                  </div>
                </form>
              </div>
            )}
            <div className="row g-4">
              {trilhas.map(trilha => (
                <div className="col-12" key={trilha.id}>
                  <div className="card border-0 shadow-sm rounded-4 h-100 position-relative">
                    <div className="card-body p-4">
                      {role === "admin" && (
                        <button onClick={() => removeTrilha(trilha.id)} className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-3 rounded-circle" style={{width: '32px', height: '32px', padding: 0}} title="Excluir">
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-map-fill fs-3 text-primary me-3"></i>
                        <h4 className="card-title fw-bold mb-0">{trilha.title}</h4>
                      </div>
                      <p className="card-text text-muted">{trilha.description}</p>
                      <h6 className="fw-bold mt-4 mb-3">Cursos inclusos nesta trilha:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {trilha.courses.map(c => (
                          <span key={c} className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-2 rounded-pill">
                            <i className="bi bi-journal-code me-2"></i>{c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Cursos":
        return (
          <div>
            {role === "admin" && (
              <div className="mb-5 bg-light p-4 rounded-4 border">
                <h4 className="fw-bold mb-3"><i className="bi bi-plus-circle-fill text-primary me-2"></i>Adicionar Novo Curso</h4>
                <form onSubmit={handleAddCurso} className="row g-3">
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Título do Curso" value={newCurso.title} onChange={e => setNewCurso({...newCurso, title: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Duração (ex: 40 horas)" value={newCurso.duration} onChange={e => setNewCurso({...newCurso, duration: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Descrição curta" value={newCurso.description} onChange={e => setNewCurso({...newCurso, description: e.target.value})} />
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-primary fw-bold">Salvar Curso</button>
                  </div>
                </form>
              </div>
            )}
            <div className="row g-4">
              {cursos.map(curso => (
                <div className="col-md-6 col-lg-4" key={curso.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                    {role === "admin" && (
                      <button onClick={() => removeCurso(curso.id)} className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle z-1" style={{width: '32px', height: '32px', padding: 0}} title="Excluir">
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                    <div className="bg-gradient-primary p-4 d-flex align-items-center justify-content-center text-white" style={{ height: '140px' }}>
                      <i className="bi bi-laptop display-4 opacity-50"></i>
                    </div>
                    <div className="card-body p-4">
                      <span className="badge bg-light text-dark mb-2 border"><i className="bi bi-clock me-1"></i> {curso.duration}</span>
                      <h5 className="card-title fw-bold">{curso.title}</h5>
                      <p className="card-text text-muted small mt-2">{curso.description}</p>
                    </div>
                    <div className="card-footer bg-white border-top-0 p-4 pt-0">
                      <button className="btn btn-outline-primary w-100 rounded-pill fw-bold">Acessar Curso</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Módulos":
        return (
          <div>
            {role === "admin" && (
              <div className="mb-5 bg-light p-4 rounded-4 border">
                <h4 className="fw-bold mb-3"><i className="bi bi-plus-circle-fill text-primary me-2"></i>Adicionar Novo Módulo</h4>
                <form onSubmit={handleAddModulo} className="row g-3">
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Nome do Módulo" value={newModulo.title} onChange={e => setNewModulo({...newModulo, title: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Nome do Curso Associado" value={newModulo.courseName} onChange={e => setNewModulo({...newModulo, courseName: e.target.value})} />
                  </div>
                  <div className="col-md-2">
                    <input type="number" className="form-control" placeholder="Qtd Aulas" value={newModulo.classCount} onChange={e => setNewModulo({...newModulo, classCount: e.target.value})} />
                  </div>
                  <div className="col-md-2 d-grid">
                    <button type="submit" className="btn btn-primary fw-bold">Salvar</button>
                  </div>
                </form>
              </div>
            )}
            <div className="row g-4">
              {modulos.map(modulo => (
                <div className="col-md-6" key={modulo.id}>
                  <div className="card border-0 shadow-sm rounded-4 h-100 position-relative">
                    {role === "admin" && (
                      <button onClick={() => removeModulo(modulo.id)} className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-3 rounded-circle" style={{width: '32px', height: '32px', padding: 0}} title="Excluir">
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                    <div className="card-body p-4 d-flex">
                      <div className="flex-shrink-0 me-4">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                          <i className="bi bi-collection fs-3"></i>
                        </div>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1 pe-4">{modulo.title}</h5>
                        <p className="text-muted small mb-2">Pertence ao curso: <strong>{modulo.courseName}</strong></p>
                        <span className="badge bg-secondary"><i className="bi bi-file-earmark-play me-1"></i> {modulo.classCount} aulas</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Aulas":
        return (
          <div>
            {role === "admin" && (
              <div className="mb-5 bg-light p-4 rounded-4 border">
                <h4 className="fw-bold mb-3"><i className="bi bi-plus-circle-fill text-primary me-2"></i>Adicionar Nova Aula</h4>
                <form onSubmit={handleAddAula} className="row g-3">
                  <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="Título da Aula" value={newAula.title} onChange={(e) => setNewAula({...newAula, title: e.target.value})} />
                  </div>
                  <div className="col-md-5">
                    <input type="url" className="form-control" placeholder="Link do YouTube" value={newAula.youtubeUrl} onChange={(e) => setNewAula({...newAula, youtubeUrl: e.target.value})} />
                  </div>
                  <div className="col-md-2 d-grid">
                    <button type="submit" className="btn btn-primary fw-bold">Salvar</button>
                  </div>
                </form>
              </div>
            )}
            <div className="row g-4">
              {aulas.length === 0 ? <div className="text-center py-5 text-muted">Nenhuma aula cadastrada.</div> : (
                aulas.map(aula => (
                  <div className="col-md-6 col-lg-4" key={aula.id}>
                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                      <div className="bg-dark text-white d-flex align-items-center justify-content-center" style={{ height: '160px' }}>
                        <i className="bi bi-youtube display-1 text-danger"></i>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title fw-bold text-truncate">{aula.title}</h5>
                        <a href={aula.youtubeUrl} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm mt-3 w-100 rounded-pill">
                          <i className="bi bi-play-fill"></i> Assistir Aula
                        </a>
                      </div>
                      {role === "admin" && (
                        <div className="card-footer bg-white border-top-0 pb-3 pt-0">
                          <button className="btn btn-danger btn-sm w-100 rounded-pill" onClick={() => removeAula(aula.id)}>
                            <i className="bi bi-trash-fill"></i> Excluir Aula
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "Usuários":
        return (
          <div className="table-responsive">
            <table className="table table-hover align-middle bg-white border rounded-4 overflow-hidden shadow-sm">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">Nome do Usuário</th>
                  <th className="py-3">E-mail</th>
                  <th className="py-3">Perfil</th>
                  <th className="py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(user => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 fw-bold">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="py-3 text-muted">{user.email}</td>
                    <td className="py-3"><span className="badge bg-secondary bg-opacity-10 text-secondary border">{user.role}</span></td>
                    <td className="py-3 text-center">
                      <span className={`badge ${user.status === 'Ativo' ? 'bg-success' : 'bg-danger'}`}>{user.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "Assinaturas":
        return (
          <div>
            {role === "admin" && (
              <div className="mb-5 bg-light p-4 rounded-4 border">
                <h4 className="fw-bold mb-3"><i className="bi bi-plus-circle-fill text-primary me-2"></i>Adicionar Plano de Assinatura</h4>
                <form onSubmit={handleAddAssinatura} className="row g-3">
                  <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Nome do Plano" value={newAssinatura.name} onChange={e => setNewAssinatura({...newAssinatura, name: e.target.value})} />
                  </div>
                  <div className="col-md-2">
                    <input type="text" className="form-control" placeholder="Preço (ex: R$ 49,90)" value={newAssinatura.price} onChange={e => setNewAssinatura({...newAssinatura, price: e.target.value})} />
                  </div>
                  <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="Benefícios (separados por vírgula)" value={newAssinatura.benefits} onChange={e => setNewAssinatura({...newAssinatura, benefits: e.target.value})} />
                  </div>
                  <div className="col-md-2 d-grid">
                    <button type="submit" className="btn btn-primary fw-bold">Salvar</button>
                  </div>
                </form>
              </div>
            )}
            <div className="row g-4 justify-content-center">
              {assinaturas.map((plano, index) => (
                <div className="col-md-6 col-lg-5" key={plano.id}>
                  <div className={`card border-0 shadow-sm rounded-4 h-100 ${index === 1 ? 'border border-2 border-primary position-relative' : 'position-relative'}`}>
                    {role === "admin" && (
                      <button onClick={() => removeAssinatura(plano.id)} className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-3 rounded-circle z-1" style={{width: '32px', height: '32px', padding: 0}} title="Excluir">
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                    {index === 1 && <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary px-3 py-2">Mais Popular</span>}
                    <div className="card-body p-5 text-center">
                      <h4 className="fw-bold mb-1 pe-4">{plano.name}</h4>
                      <h2 className="display-5 fw-bold text-primary my-4">{plano.price}</h2>
                      <ul className="list-unstyled text-start mt-4 mb-5">
                        {plano.benefits.map(b => (
                          <li key={b} className="mb-3 d-flex align-items-center">
                            <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                            <span className="text-muted">{b}</span>
                          </li>
                        ))}
                      </ul>
                      <button className={`btn w-100 rounded-pill py-3 fw-bold ${index === 1 ? 'btn-primary' : 'btn-outline-primary'}`}>
                        Assinar Agora
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Certificados":
        return (
          <div className="row g-4">
            {certificados.map(cert => (
              <div className="col-md-6" key={cert.id}>
                <div className="card border border-primary-subtle shadow-sm rounded-4 h-100 bg-white" style={{ backgroundImage: 'radial-gradient(circle at top right, rgba(79, 70, 229, 0.05), transparent)' }}>
                  <div className="card-body p-4 p-md-5 text-center">
                    <i className="bi bi-patch-check-fill text-warning" style={{ fontSize: '4rem' }}></i>
                    <h3 className="fw-bold mt-3 mb-2">Certificado de Conclusão</h3>
                    <p className="text-muted mb-4">Certificamos que você concluiu com êxito o curso:</p>
                    <h4 className="fw-bold text-primary mb-4">{cert.courseName}</h4>
                    <div className="d-flex justify-content-between align-items-center border-top pt-4 text-muted small">
                      <span><strong>Emitido em:</strong> {cert.issueDate}</span>
                      <span><strong>Código:</strong> {cert.code}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="platform-container h-100">
      <div className="bg-white shadow-sm pt-4 px-4 border-bottom">
        <h2 className="mb-4 fw-bold text-dark">Plataforma</h2>
        <ul className="nav nav-tabs premium-tabs border-0" role="tablist">
          {visibleTabs.map((tab) => (
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
        <div className="glass-card bg-white p-4 p-md-5 rounded-4 shadow-sm slide-up">
          <div className="d-flex align-items-center mb-5">
            <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
              <i className={`bi fs-4 ${getIconForTab(activeTab)}`}></i>
            </div>
            <h1 className="display-5 fw-bold text-dark mb-0">{activeTab}</h1>
          </div>
          
          {renderContent()}

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
