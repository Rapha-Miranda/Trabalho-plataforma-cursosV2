export interface Usuario {
  id: string;
  NomeCompleto: string;
  Email: string;
  SenhaHash: string;
  DataCadastro: string;
}

export interface Categoria {
  id: string;
  Nome: string;
  Descricao: string;
}

export interface Curso {
  id: string;
  Titulo: string;
  Descricao: string;
  ID_Instrutor: string;
  ID_Categoria: string;
  Nivel: string;
  DataPublicacao: string;
  TotalAulas: number;
  TotalHoras: number;
}

export interface Modulo {
  id: string;
  ID_Curso: string;
  Titulo: string;
  Ordem: number;
}

export interface Aula {
  id: string;
  ID_Modulo: string;
  Titulo: string;
  TipoConteudo: string;
  URL_Conteudo: string;
  DuracaoMinutos: number;
  Ordem: number;
}

export interface Matricula {
  id: string;
  ID_Usuario: string;
  ID_Curso: string;
  DataMatricula: string;
  DataConclusao: string | null;
}

export interface ProgressoAula {
  id: string;
  ID_Usuario: string;
  ID_Aula: string;
  DataConclusao: string;
  Status: string;
}

export interface Avaliacao {
  id: string;
  ID_Usuario: string;
  ID_Curso: string;
  Nota: number;
  Comentario: string | null;
  DataAvaliacao: string;
}

export interface Trilha {
  id: string;
  Titulo: string;
  Descricao: string;
  ID_Categoria: string;
}

export interface TrilhaCurso {
  id: string;
  ID_Trilha: string;
  ID_Curso: string;
  Ordem: number;
}

export interface Certificado {
  id: string;
  ID_Usuario: string;
  ID_Curso: string;
  ID_Trilha: string | null;
  CodigoVerificacao: string;
  DataEmissao: string;
}

export interface Plano {
  id: string;
  Nome: string;
  Descricao: string;
  Preco: number;
  DuracaoMeses: number;
}

export interface Assinatura {
  id: string;
  ID_Usuario: string;
  ID_Plano: string;
  DataInicio: string;
  DataFim: string;
}

export interface Pagamento {
  id: string;
  ID_Assinatura: string;
  ValorPago: number;
  DataPagamento: string;
  MetodoPagamento: string;
  Id_Transacao_Gateway: string;
}
