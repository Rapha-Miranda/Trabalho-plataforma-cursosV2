import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "../services/api";
import type { 
  Usuario, Categoria, Curso, Modulo, Aula, Matricula, ProgressoAula, Avaliacao,
  Trilha, TrilhaCurso, Certificado, Plano, Assinatura, Pagamento 
} from "../models";

interface DataContextType {
  usuarios: Usuario[];
  categorias: Categoria[];
  cursos: Curso[]; addCurso: (c: Omit<Curso, "id">) => Promise<void>; removeCurso: (id: string) => Promise<void>;
  modulos: Modulo[]; addModulo: (m: Omit<Modulo, "id">) => Promise<void>; removeModulo: (id: string) => Promise<void>;
  aulas: Aula[]; addAula: (a: Omit<Aula, "id">) => Promise<void>; removeAula: (id: string) => Promise<void>;
  matriculas: Matricula[];
  progresso: ProgressoAula[];
  avaliacoes: Avaliacao[];
  trilhas: Trilha[]; addTrilha: (t: Omit<Trilha, "id">) => Promise<void>; removeTrilha: (id: string) => Promise<void>;
  trilhasCursos: TrilhaCurso[];
  certificados: Certificado[];
  planos: Plano[];
  assinaturas: Assinatura[]; addAssinatura: (a: Omit<Assinatura, "id">) => Promise<void>; removeAssinatura: (id: string) => Promise<void>;
  pagamentos: Pagamento[];
  fetchData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [progresso, setProgresso] = useState<ProgressoAula[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [trilhasCursos, setTrilhasCursos] = useState<TrilhaCurso[]>([]);
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [assinaturas, setAssinaturas] = useState<Assinatura[]>([]);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);

  const fetchData = async () => {
    try {
      const [u, cat, c, m, a, mat, prog, aval, t, tc, cert, p, ass, pag] = await Promise.all([
        api.get<Usuario[]>("/usuarios"),
        api.get<Categoria[]>("/categorias"),
        api.get<Curso[]>("/cursos"),
        api.get<Modulo[]>("/modulos"),
        api.get<Aula[]>("/aulas"),
        api.get<Matricula[]>("/matriculas"),
        api.get<ProgressoAula[]>("/progresso_aulas"),
        api.get<Avaliacao[]>("/avaliacoes"),
        api.get<Trilha[]>("/trilhas"),
        api.get<TrilhaCurso[]>("/trilhas_cursos"),
        api.get<Certificado[]>("/certificados"),
        api.get<Plano[]>("/planos"),
        api.get<Assinatura[]>("/assinaturas"),
        api.get<Pagamento[]>("/pagamentos"),
      ]);
      setUsuarios(u); setCategorias(cat); setCursos(c); setModulos(m); setAulas(a);
      setMatriculas(mat); setProgresso(prog); setAvaliacoes(aval); setTrilhas(t);
      setTrilhasCursos(tc); setCertificados(cert); setPlanos(p); setAssinaturas(ass); setPagamentos(pag);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addCurso = async (curso: Omit<Curso, "id">) => {
    const newCurso = await api.post<Curso>("/cursos", curso);
    setCursos([...cursos, newCurso]);
  };
  const removeCurso = async (id: string) => {
    await api.delete(`/cursos/${id}`);
    setCursos(cursos.filter(c => c.id !== id));
  };

  const addModulo = async (modulo: Omit<Modulo, "id">) => {
    const newModulo = await api.post<Modulo>("/modulos", modulo);
    setModulos([...modulos, newModulo]);
  };
  const removeModulo = async (id: string) => {
    await api.delete(`/modulos/${id}`);
    setModulos(modulos.filter(m => m.id !== id));
  };

  const addAula = async (aula: Omit<Aula, "id">) => {
    const newAula = await api.post<Aula>("/aulas", aula);
    setAulas([...aulas, newAula]);
  };
  const removeAula = async (id: string) => {
    await api.delete(`/aulas/${id}`);
    setAulas(aulas.filter(a => a.id !== id));
  };

  const addTrilha = async (trilha: Omit<Trilha, "id">) => {
    const newTrilha = await api.post<Trilha>("/trilhas", trilha);
    setTrilhas([...trilhas, newTrilha]);
  };
  const removeTrilha = async (id: string) => {
    await api.delete(`/trilhas/${id}`);
    setTrilhas(trilhas.filter(t => t.id !== id));
  };

  const addAssinatura = async (assinatura: Omit<Assinatura, "id">) => {
    const newAssinatura = await api.post<Assinatura>("/assinaturas", assinatura);
    setAssinaturas([...assinaturas, newAssinatura]);
  };
  const removeAssinatura = async (id: string) => {
    await api.delete(`/assinaturas/${id}`);
    setAssinaturas(assinaturas.filter(a => a.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
      usuarios, categorias, cursos, addCurso, removeCurso,
      modulos, addModulo, removeModulo, aulas, addAula, removeAula,
      matriculas, progresso, avaliacoes, trilhas, addTrilha, removeTrilha,
      trilhasCursos, certificados, planos, assinaturas, addAssinatura, removeAssinatura,
      pagamentos, fetchData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
