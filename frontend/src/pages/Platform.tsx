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
    aulas, cursos, trilhas, modulos, usuarios, assinaturas, certificados, planos, categorias, trilhasCursos,
    addAula, removeAula,
    addCurso, removeCurso,
    addTrilha, removeTrilha,
    addModulo, removeModulo,
    addAssinatura, removeAssinatura
  } = useData();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Trilhas");

  // Form States
  const [newAula, setNewAula] = useState({ Titulo: "", URL_Conteudo: "", DuracaoMinutos: 0, ID_Modulo: "", TipoConteudo: "Vídeo", Ordem: 1 });
  const [newCurso, setNewCurso] = useState({ Titulo: "", Descricao: "", TotalHoras: 0, ID_Categoria: "", Nivel: "Iniciante", TotalAulas: 0, ID_Instrutor: "1", DataPublicacao: new Date().toISOString().split('T')[0] });
  const [newTrilha, setNewTrilha] = useState({ Titulo: "", Descricao: "", ID_Categoria: "" });
  const [newModulo, setNewModulo] = useState({ Titulo: "", ID_Curso: "", Ordem: 1 });
  const [newAssinatura, setNewAssinatura] = useState({ ID_Plano: "", ID_Usuario: "1", DataInicio: "", DataFim: "" });

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const visibleTabs = ALL_TABS.filter(tab => tab === "Usuários" ? role === "admin" : true);
  if (!visibleTabs.includes(activeTab)) setActiveTab(visibleTabs[0]);

  // Handlers
  const handleAddAula = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAula.Titulo || !newAula.URL_Conteudo) return;
    await addAula(newAula);
    setNewAula({ Titulo: "", URL_Conteudo: "", DuracaoMinutos: 0, ID_Modulo: "", TipoConteudo: "Vídeo", Ordem: 1 });
  };

  const handleAddCurso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCurso.Titulo || !newCurso.Descricao) return;
    await addCurso(newCurso);
    setNewCurso({ Titulo: "", Descricao: "", TotalHoras: 0, ID_Categoria: "", Nivel: "Iniciante", TotalAulas: 0, ID_Instrutor: "1", DataPublicacao: new Date().toISOString().split('T')[0] });
  };

  const handleAddTrilha = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrilha.Titulo || !newTrilha.Descricao) return;
    await addTrilha(newTrilha);
    setNewTrilha({ Titulo: "", Descricao: "", ID_Categoria: "" });
  };

  const handleAddModulo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModulo.Titulo || !newModulo.ID_Curso) return;
    await addModulo(newModulo);
    setNewModulo({ Titulo: "", ID_Curso: "", Ordem: 1 });
  };

  const handleAddAssinatura = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssinatura.ID_Plano || !newAssinatura.DataInicio || !newAssinatura.DataFim) return;
    await addAssinatura(newAssinatura);
    setNewAssinatura({ ID_Plano: "", ID_Usuario: "1", DataInicio: "", DataFim: "" });
  };

  const getCursoName = (id: string) => cursos.find(c => c.id === id)?.Titulo || "Curso Desconhecido";
  const getCategoriaName = (id: string) => categorias.find(c => c.id === id)?.Nome || "Sem Categoria";
  const getPlanoName = (id: string) => planos.find(p => p.id === id)?.Nome || "Plano Desconhecido";

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
                    <input type="text" className="form-control" placeholder="Título" value={newTrilha.Titulo} onChange={e => setNewTrilha({...newTrilha, Titulo: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Descrição" value={newTrilha.Descricao} onChange={e => setNewTrilha({...newTrilha, Descricao: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" value={newTrilha.ID_Categoria} onChange={e => setNewTrilha({...newTrilha, ID_Categoria: e.target.value})}>
                      <option value="">Selecione a Categoria</option>
                      {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.Nome}</option>)}
                    </select>
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-primary fw-bold">Salvar Trilha</button>
                  </div>
                </form>
              </div>
            )}
            <div className="row g-4">
              {trilhas.map(trilha => {
                const cursosDaTrilha = trilhasCursos.filter(tc => tc.ID_Trilha === trilha.id).map(tc => getCursoName(tc.ID_Curso));
                return (
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
                          <div>
                            <h4 className="card-title fw-bold mb-0">{trilha.Titulo}</h4>
                            <span className="badge bg-secondary mt-1">{getCategoriaName(trilha.ID_Categoria)}</span>
                          </div>
                        </div>
                        <p className="card-text text-muted">{trilha.Descricao}</p>
                        <h6 className="fw-bold mt-4 mb-3">Cursos inclusos nesta trilha:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {cursosDaTrilha.length > 0 ? cursosDaTrilha.map(c => (
                            <span key={c} className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-2 rounded-pill">
                              <i className="bi bi-journal-code me-2"></i>{c}
                            </span>
                          )) : <span className="text-muted small">Nenhum curso associado a esta trilha ainda.</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                  <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Título do Curso" value={newCurso.Titulo} onChange={e => setNewCurso({...newCurso, Titulo: e.target.value})} />
                  </div>
                  <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Descrição curta" value={newCurso.Descricao} onChange={e => setNewCurso({...newCurso, Descricao: e.target.value})} />
                  </div>
                  <div className="col-md-2">
                    <input type="number" className="form-control" placeholder="Horas" value={newCurso.TotalHoras} onChange={e => setNewCurso({...newCurso, TotalHoras: Number(e.target.value)})} />
                  </div>
                  <div className="col-md-2">
                    <select className="form-select" value={newCurso.ID_Categoria} onChange={e => setNewCurso({...newCurso, ID_Categoria: e.target.value})}>
                      <option value="">Categoria</option>
                      {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.Nome}</option>)}
                    </select>
                  </div>
                  <div className="col-md-2 d-grid">
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
                    <div className="bg-gradient-primary p-4 d-flex flex-column align-items-center justify-content-center text-white" style={{ height: '140px' }}>
                      <i className="bi bi-laptop display-4 opacity-50 mb-2"></i>
                      <span className="badge bg-dark bg-opacity-50">{getCategoriaName(curso.ID_Categoria)}</span>
                    </div>
                    <div className="card-body p-4">
                      <span className="badge bg-light text-dark mb-2 border"><i className="bi bi-clock me-1"></i> {curso.TotalHoras} horas</span>
                      <span className="badge bg-info text-dark mb-2 ms-2 border">{curso.Nivel}</span>
                      <h5 className="card-title fw-bold">{curso.Titulo}</h5>
                      <p className="card-text text-muted small mt-2">{curso.Descricao}</p>
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
                  <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="Nome do Módulo" value={newModulo.Titulo} onChange={e => setNewModulo({...newModulo, Titulo: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" value={newModulo.ID_Curso} onChange={e => setNewModulo({...newModulo, ID_Curso: e.target.value})}>
                      <option value="">Selecione o Curso</option>
                      {cursos.map(c => <option key={c.id} value={c.id}>{c.Titulo}</option>)}
                    </select>
                  </div>
                  <div className="col-md-3 d-grid">
                    <button type="submit" className="btn btn-primary fw-bold">Salvar Módulo</button>
                  </div>
                </form>
              </div>
            )}
            <div className="row g-4">
              {modulos.map(modulo => {
                const qtdAulas = aulas.filter(a => a.ID_Modulo === modulo.id).length;
                return (
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
                          <h5 className="fw-bold mb-1 pe-4">{modulo.Titulo}</h5>
                          <p className="text-muted small mb-2">Curso: <strong>{getCursoName(modulo.ID_Curso)}</strong></p>
                          <span className="badge bg-secondary"><i className="bi bi-file-earmark-play me-1"></i> {qtdAulas} aulas</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                  <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Título da Aula" value={newAula.Titulo} onChange={(e) => setNewAula({...newAula, Titulo: e.target.value})} />
                  </div>
                  <div className="col-md-3">
                    <input type="url" className="form-control" placeholder="Link do YouTube" value={newAula.URL_Conteudo} onChange={(e) => setNewAula({...newAula, URL_Conteudo: e.target.value})} />
                  </div>
                  <div className="col-md-2">
                    <input type="number" className="form-control" placeholder="Duração (min)" value={newAula.DuracaoMinutos} onChange={(e) => setNewAula({...newAula, DuracaoMinutos: Number(e.target.value)})} />
                  </div>
                  <div className="col-md-2">
                    <select className="form-select" value={newAula.ID_Modulo} onChange={e => setNewAula({...newAula, ID_Modulo: e.target.value})}>
                      <option value="">Módulo</option>
                      {modulos.map(m => <option key={m.id} value={m.id}>{m.Titulo}</option>)}
                    </select>
                  </div>
                  <div className="col-md-2 d-grid">
                    <button type="submit" className="btn btn-primary fw-bold">Salvar</button>
                  </div>
                </form>
              </div>
            )}
            <div className="row g-4">
              {aulas.length === 0 ? <div className="text-center py-5 text-muted">Nenhuma aula cadastrada.</div> : (
                aulas.map(aula => {
                  const moduloName = modulos.find(m => m.id === aula.ID_Modulo)?.Titulo || "Sem módulo";
                  return (
                    <div className="col-md-6 col-lg-4" key={aula.id}>
                      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="bg-dark text-white d-flex flex-column align-items-center justify-content-center" style={{ height: '160px' }}>
                          <i className="bi bi-youtube display-1 text-danger"></i>
                        </div>
                        <div className="card-body">
                          <span className="badge bg-light text-dark border mb-2">{moduloName}</span>
                          <span className="badge bg-primary bg-opacity-10 text-primary ms-2 border border-primary-subtle mb-2">{aula.DuracaoMinutos} min</span>
                          <h5 className="card-title fw-bold text-truncate">{aula.Titulo}</h5>
                          <a href={aula.URL_Conteudo} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm mt-3 w-100 rounded-pill">
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
                  );
                })
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
                  <th className="px-4 py-3">ID</th>
                  <th className="py-3">Nome Completo</th>
                  <th className="py-3">E-mail</th>
                  <th className="py-3">Data Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(user => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-muted">#{user.id}</td>
                    <td className="py-3 fw-bold">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                          {user.NomeCompleto?.charAt(0) || 'U'}
                        </div>
                        {user.NomeCompleto}
                      </div>
                    </td>
                    <td className="py-3 text-muted">{user.Email}</td>
                    <td className="py-3 text-muted">{new Date(user.DataCadastro).toLocaleDateString()}</td>
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
                <h4 className="fw-bold mb-3"><i className="bi bi-plus-circle-fill text-primary me-2"></i>Registrar Nova Assinatura (Admin)</h4>
                <form onSubmit={handleAddAssinatura} className="row g-3">
                  <div className="col-md-3">
                    <select className="form-select" value={newAssinatura.ID_Usuario} onChange={e => setNewAssinatura({...newAssinatura, ID_Usuario: e.target.value})}>
                      {usuarios.map(u => <option key={u.id} value={u.id}>{u.NomeCompleto}</option>)}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select className="form-select" value={newAssinatura.ID_Plano} onChange={e => setNewAssinatura({...newAssinatura, ID_Plano: e.target.value})}>
                      <option value="">Selecione o Plano</option>
                      {planos.map(p => <option key={p.id} value={p.id}>{p.Nome}</option>)}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <input type="date" className="form-control" title="Data Início" value={newAssinatura.DataInicio} onChange={e => setNewAssinatura({...newAssinatura, DataInicio: e.target.value})} />
                  </div>
                  <div className="col-md-2">
                    <input type="date" className="form-control" title="Data Fim" value={newAssinatura.DataFim} onChange={e => setNewAssinatura({...newAssinatura, DataFim: e.target.value})} />
                  </div>
                  <div className="col-md-2 d-grid">
                    <button type="submit" className="btn btn-primary fw-bold">Salvar</button>
                  </div>
                </form>
              </div>
            )}
            
            <h4 className="fw-bold mb-4">Assinaturas Ativas</h4>
            <div className="row g-4">
              {assinaturas.map(assinatura => (
                <div className="col-md-6" key={assinatura.id}>
                  <div className="card border-0 shadow-sm rounded-4 h-100 position-relative border-start border-primary border-4">
                    {role === "admin" && (
                      <button onClick={() => removeAssinatura(assinatura.id)} className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-3 rounded-circle z-1" style={{width: '32px', height: '32px', padding: 0}} title="Excluir">
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                    <div className="card-body p-4">
                      <h4 className="fw-bold mb-1 pe-4">{getPlanoName(assinatura.ID_Plano)}</h4>
                      <p className="text-muted mb-3">Usuário ID: {assinatura.ID_Usuario}</p>
                      <div className="d-flex gap-3 small">
                        <span className="badge bg-light text-dark border"><i className="bi bi-calendar-event me-1"></i> Início: {new Date(assinatura.DataInicio).toLocaleDateString()}</span>
                        <span className="badge bg-light text-dark border"><i className="bi bi-calendar-x me-1"></i> Fim: {new Date(assinatura.DataFim).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="fw-bold mt-5 mb-4">Planos Disponíveis</h4>
            <div className="row g-4 justify-content-center">
              {planos.map((plano, index) => (
                <div className="col-md-6 col-lg-5" key={plano.id}>
                  <div className={`card border-0 shadow-sm rounded-4 h-100 ${index === 1 ? 'border border-2 border-primary position-relative' : 'position-relative'}`}>
                    {index === 1 && <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary px-3 py-2">Mais Popular</span>}
                    <div className="card-body p-5 text-center">
                      <h4 className="fw-bold mb-1 pe-4">{plano.Nome}</h4>
                      <h2 className="display-5 fw-bold text-primary my-4">R$ {plano.Preco.toFixed(2)}</h2>
                      <p className="text-muted mb-4">{plano.Descricao}</p>
                      <ul className="list-unstyled text-start mb-5">
                        <li className="mb-3 d-flex align-items-center"><i className="bi bi-check-circle-fill text-success me-3 fs-5"></i><span className="text-muted">{plano.DuracaoMeses} Meses de acesso</span></li>
                      </ul>
                      <button 
                        className={`btn w-100 rounded-pill py-3 fw-bold ${index === 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={async () => {
                          alert("Processando pagamento fictício...");
                          const newAssinatura = { ID_Plano: plano.id, ID_Usuario: "2", DataInicio: new Date().toISOString().split('T')[0], DataFim: new Date(new Date().setMonth(new Date().getMonth() + plano.DuracaoMeses)).toISOString().split('T')[0] };
                          await addAssinatura(newAssinatura);
                          alert(`Assinatura do plano ${plano.Nome} concluída com sucesso!`);
                        }}
                      >
                        Simular Compra
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
                    <h4 className="fw-bold text-primary mb-4">{getCursoName(cert.ID_Curso)}</h4>
                    <div className="d-flex justify-content-between align-items-center border-top pt-4 text-muted small">
                      <span><strong>Emitido em:</strong> {new Date(cert.DataEmissao).toLocaleDateString()}</span>
                      <span><strong>Código:</strong> {cert.CodigoVerificacao}</span>
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
