import http from "@/http";
import ITarefa from "@/intefaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: []
  },
  mutations: {
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const indice = state.tarefas.findIndex((t) => t.id == tarefa.id);
      state.tarefas[indice] = tarefa;
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    }
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = "tarefas"

      if(filtro) {
        url += "?descricao=" + filtro
      }

      http.get(url).then((res) => commit(DEFINIR_TAREFAS, res.data));
      
      // ----- FILTRO SEM REQUISIÇÃO NA API -----
      // http.get("tarefas").then((res) => commit(DEFINIR_TAREFAS, res.data));

    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post("/tarefas", tarefa)
        .then((res) => commit(ADICIONA_TAREFA, res.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa));
    },
  }
}