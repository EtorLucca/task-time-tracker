<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioVue @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <BoxVue v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
        </BoxVue>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import BarraLateral from "./components/BarraLateral.vue";
  import FormularioVue from "./components/Formulario.vue";
  import TarefaVue from "./components/Tarefa.vue";
  import ITarefa from "./intefaces/ITarefa";
  import BoxVue from "./components/Box.vue";

  export default defineComponent({
    name: "App",
    components: {
    BarraLateral,
    FormularioVue,
    TarefaVue,
    BoxVue,
},
    data () {
      return {
        tarefas: [] as ITarefa[],
        modoEscuroAtivo: false
      }
    },
    computed: {
      listaEstaVazia() : boolean {
        return this.tarefas.length === 0
      }
    },
    methods: {
      salvarTarefa(tarefa: ITarefa) {
        this.tarefas.push(tarefa)
      },
      trocarTema(modoEscuroAtivo: boolean) {
        this.modoEscuroAtivo = modoEscuroAtivo
      }
    }
  });
</script>

<style>
  .lista {
    padding: 1.25rem;
  }
  main {
    --bg-primario: #FFFFFF;
    --texto-primario: #000000;
  }
  main.modo-escuro {
    --bg-primario: #2B2D42;
    --texto-primario: #DDDDDD;
  }
  .conteudo {
    background-color: var(--bg-primario);
  }
</style>
