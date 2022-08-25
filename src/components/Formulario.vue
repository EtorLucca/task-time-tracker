<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        area-label="Formulário criação nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorVue @aoTemporizadorFinalizado="finaliarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/intefaces/INotificacao";
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import TemporizadorVue from "./Temporizador.vue";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "FormularioVue",
  emits: ["aoSalvarTarefa"],
  components: {
    TemporizadorVue,
  },
  data() {
    return {
      descricao: "",
      idProjeto: "",
    };
  },
  methods: {
    finaliarTarefa(tempoDecorrido: number): void {
      const projeto = this.projetos.find((proj) => proj.id == this.idProjeto);
      if (!projeto) {
        this.notificar(
          TipoNotificacao.FALHA,
          "Ops!",
          "Selecione um projeto antes de finalizar a tarefa!"
        );
        return;
      } else {
        this.$emit("aoSalvarTarefa", {
          duracaoEmSegundos: tempoDecorrido,
          descricao: this.descricao,
          projeto: this.projetos.find((proj) => proj.id == this.idProjeto),
        });
        this.descricao = "";
      }
    },
  },
  setup() {
    const store = useStore(key);
    const { notificar } = useNotificador()
    return {
      projetos: computed(() => store.state.projetos),
      notificacoes: computed(() => store.state.notificacoes),
      notificar
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
