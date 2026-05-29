import { createContext, useContext, useState, type ReactNode } from "react";

export interface Aula { id: string; title: string; youtubeUrl: string; }
export interface Curso { id: string; title: string; description: string; duration: string; }
export interface Trilha { id: string; title: string; courses: string[]; description: string; }
export interface Modulo { id: string; title: string; courseName: string; classCount: number; }
export interface Usuario { id: string; name: string; email: string; role: string; status: string; }
export interface Assinatura { id: string; name: string; price: string; benefits: string[]; }
export interface Certificado { id: string; courseName: string; issueDate: string; code: string; }

interface DataContextType {
  aulas: Aula[]; addAula: (a: Omit<Aula, "id">) => void; removeAula: (id: string) => void;
  cursos: Curso[]; addCurso: (c: Omit<Curso, "id">) => void; removeCurso: (id: string) => void;
  trilhas: Trilha[]; addTrilha: (t: Omit<Trilha, "id">) => void; removeTrilha: (id: string) => void;
  modulos: Modulo[]; addModulo: (m: Omit<Modulo, "id">) => void; removeModulo: (id: string) => void;
  assinaturas: Assinatura[]; addAssinatura: (a: Omit<Assinatura, "id">) => void; removeAssinatura: (id: string) => void;
  usuarios: Usuario[];
  certificados: Certificado[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [aulas, setAulas] = useState<Aula[]>([
    { id: "1", title: "Introdução ao React", youtubeUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
    { id: "2", title: "Hooks do React", youtubeUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0" }
  ]);
  
  const [cursos, setCursos] = useState<Curso[]>([
    { id: "c1", title: "Desenvolvimento Web Completo", description: "Aprenda HTML, CSS e JavaScript do zero ao avançado.", duration: "40 horas" },
    { id: "c2", title: "Masterclass de React", description: "Domine o React e crie interfaces modernas e reativas.", duration: "25 horas" },
    { id: "c3", title: "Backend com Node.js", description: "Crie APIs RESTful escaláveis utilizando Node e Express.", duration: "30 horas" },
  ]);

  const [trilhas, setTrilhas] = useState<Trilha[]>([
    { id: "t1", title: "Trilha Fullstack JavaScript", description: "Torne-se um desenvolvedor completo dominando o ecossistema JS.", courses: ["Desenvolvimento Web Completo", "Masterclass de React", "Backend com Node.js"] },
    { id: "t2", title: "Trilha Frontend Specialist", description: "Foque exclusivamente em criar telas incríveis e dinâmicas.", courses: ["Desenvolvimento Web Completo", "Masterclass de React"] }
  ]);

  const [modulos, setModulos] = useState<Modulo[]>([
    { id: "m1", title: "Módulo 1: Fundamentos", courseName: "Masterclass de React", classCount: 5 },
    { id: "m2", title: "Módulo 2: Componentes Avançados", courseName: "Masterclass de React", classCount: 8 },
    { id: "m3", title: "Módulo 1: Servidores e Rotas", courseName: "Backend com Node.js", classCount: 6 },
  ]);

  const [assinaturas, setAssinaturas] = useState<Assinatura[]>([
    { id: "p1", name: "Plano Mensal", price: "R$ 49,90", benefits: ["Acesso a todos os cursos", "Certificados digitais", "Suporte da comunidade"] },
    { id: "p2", name: "Plano Anual (Premium)", price: "R$ 499,00", benefits: ["Tudo do plano mensal", "Mentorias exclusivas ao vivo", "Projetos práticos avaliados"] },
  ]);

  const usuarios: Usuario[] = [
    { id: "u1", name: "Raphael Admin", email: "admin@jottas.com", role: "Administrador", status: "Ativo" },
    { id: "u2", name: "João Aluno", email: "joao@email.com", role: "Usuário Normal", status: "Ativo" },
    { id: "u3", name: "Maria Estudante", email: "maria@email.com", role: "Usuário Normal", status: "Inativo" },
  ];

  const certificados: Certificado[] = [
    { id: "cert1", courseName: "Desenvolvimento Web Completo", issueDate: "15/04/2026", code: "JOTTA-WEB-8842" },
    { id: "cert2", courseName: "Lógica de Programação", issueDate: "02/02/2026", code: "JOTTA-LOG-1193" },
  ];

  const getId = () => Date.now().toString();

  const addAula = (aula: Omit<Aula, "id">) => setAulas([...aulas, { ...aula, id: getId() }]);
  const removeAula = (id: string) => setAulas(aulas.filter(a => a.id !== id));

  const addCurso = (curso: Omit<Curso, "id">) => setCursos([...cursos, { ...curso, id: getId() }]);
  const removeCurso = (id: string) => setCursos(cursos.filter(c => c.id !== id));

  const addTrilha = (trilha: Omit<Trilha, "id">) => setTrilhas([...trilhas, { ...trilha, id: getId() }]);
  const removeTrilha = (id: string) => setTrilhas(trilhas.filter(t => t.id !== id));

  const addModulo = (modulo: Omit<Modulo, "id">) => setModulos([...modulos, { ...modulo, id: getId() }]);
  const removeModulo = (id: string) => setModulos(modulos.filter(m => m.id !== id));

  const addAssinatura = (assinatura: Omit<Assinatura, "id">) => setAssinaturas([...assinaturas, { ...assinatura, id: getId() }]);
  const removeAssinatura = (id: string) => setAssinaturas(assinaturas.filter(a => a.id !== id));

  return (
    <DataContext.Provider value={{ 
      aulas, addAula, removeAula,
      cursos, addCurso, removeCurso,
      trilhas, addTrilha, removeTrilha,
      modulos, addModulo, removeModulo,
      assinaturas, addAssinatura, removeAssinatura,
      usuarios, certificados
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
