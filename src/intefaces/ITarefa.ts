import IProjeto from "./IProjeto";

export default interface Tarefa {
  duracaoEmSegundos: number,
  descricao: string,
  projeto: IProjeto,
  id: number
}