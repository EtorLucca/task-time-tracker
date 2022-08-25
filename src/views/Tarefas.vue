<template>
  <FormularioVue @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
    <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
    <BoxVue v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </BoxVue>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import FormularioVue from "../components/Formulario.vue";
  import TarefaVue from "../components/Tarefa.vue";
  import ITarefa from "../intefaces/ITarefa";
  import BoxVue from "../components/Box.vue";
  import { useStore } from "@/store";
  import { ADICIONA_TAREFA, NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/intefaces/INotificacao";

  export default defineComponent({
    name: "App",
    components: {
      FormularioVue,
      TarefaVue,
      BoxVue,
    },
    computed: {
      listaEstaVazia() : boolean {
        return this.tarefas.length === 0
      }
    },
    methods: {
      salvarTarefa(tarefa: ITarefa) {
        if(tarefa.projeto) {
          this.store.commit(ADICIONA_TAREFA, tarefa);
          this.store.commit(NOTIFICAR, {
            titulo: "Nova tarefa foi salva",
            texto: "Pronto! Sua tarefa já está disponível :)",
            tipo: TipoNotificacao.SUCESSO
          });
        }
      }
    },
    setup() {
      const store = useStore();
      return {
        tarefas: computed(() => store.state.tarefas),
        store,
      };
    },
  });
</script>