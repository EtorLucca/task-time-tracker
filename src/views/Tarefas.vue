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
  import { defineComponent } from "vue";
  import FormularioVue from "../components/Formulario.vue";
  import TarefaVue from "../components/Tarefa.vue";
  import ITarefa from "../intefaces/ITarefa";
  import BoxVue from "../components/Box.vue";

  export default defineComponent({
    name: "App",
    components: {
    FormularioVue,
    TarefaVue,
    BoxVue,
},
    data () {
      return {
        tarefas: [] as ITarefa[],
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
      }
    }
  });
</script>