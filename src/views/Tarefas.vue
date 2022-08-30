<template>
  <FormularioVue @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <BoxVue v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </BoxVue>
    <div class="field">
      <p class="control has-icons-left">
        <input
          type="text"
          class="input"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </span>
      </p>
    </div>
    <TarefaVue
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <ModalVue :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editar Tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label"> Descrição </label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </template>
      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">
          Salvar alterações
        </button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </ModalVue>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import FormularioVue from "../components/Formulario.vue";
import TarefaVue from "../components/Tarefa.vue";
import ITarefa from "../intefaces/ITarefa";
import BoxVue from "../components/Box.vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/intefaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import ModalVue from "@/components/Modal.vue";

export default defineComponent({
  name: "App",
  components: {
    FormularioVue,
    TarefaVue,
    BoxVue,
    ModalVue,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length == 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      if (tarefa.projeto) {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa);
        this.notificar(
          TipoNotificacao.SUCESSO,
          "Nova tarefa salva",
          "Pronto! Sua tarefa já foi salva :)"
        );
      }
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    const { notificar } = useNotificador();
    const filtro = ref("");

    // ------ FILTRO SEM REQUISIÇÃO NA API -------
    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     (t) => !filtro.value || t.descricao.includes(filtro.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      notificar,
      filtro,
    };
  },
});
</script>
