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
        <TemporizadorVue @aoFinalizarTarefa="finaliarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/intefaces/INotificacao";
import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import TemporizadorVue from "./Temporizador.vue";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "FormularioVue",
  emits: ["aoSalvarTarefa"],
  components: {
    TemporizadorVue,
  },
  methods: {
    
  },
  setup(props, { emit }) {
    const store = useStore(key);

    const descricao = ref("");
    const idProjeto = ref("");

    const { notificar } = useNotificador();
    const projetos = computed(() => store.state.projeto.projetos);
    const notificacoes = computed(() => store.state.notificacoes);

    const finaliarTarefa = (tempoEmSegundos: number): void  => {
      const projeto = projetos.value.find((proj) => proj.id == idProjeto.value);
      if (!projeto) {
        notificar(
          TipoNotificacao.FALHA,
          "Ops!",
          "Selecione um projeto antes de finalizar a tarefa!"
        );
        return;
      } else {
        emit("aoSalvarTarefa", {
          duracaoEmSegundos: tempoEmSegundos,
          descricao: descricao.value,
          projeto: projetos.value.find((proj) => proj.id == idProjeto.value),
        });
        descricao.value = "";
      }
    }

    return {
      projetos,
      notificacoes,
      notificar,
      descricao,
      idProjeto,
      finaliarTarefa
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
