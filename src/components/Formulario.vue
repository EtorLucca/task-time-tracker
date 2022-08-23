<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
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
      <div class="column">
        <TemporizadorVue @aoTemporizadorFinalizado="finaliarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import TemporizadorVue from "./Temporizador.vue";

  export default defineComponent({
      name: "FormularioVue",
      emits: ["aoSalvarTarefa"],
      components: {
        TemporizadorVue
      },
      data () {
        return {
          descricao: ""
        }
      },
      methods: {
        finaliarTarefa(tempoDecorrido: number) : void {
          this.$emit("aoSalvarTarefa", {
            duracaoEmSegundos: tempoDecorrido,
            descricao: this.descricao
          })
          this.descricao = ""
        }
      }
  });
</script>

<style>
  .formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
  }
</style>