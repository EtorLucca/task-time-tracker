<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronometroVue :tempoEmSegundos="tempoEmSegundos" />
    <button class="button" @click="iniciar" :disabled="cronometroRodando">
      <span class="icon">
        <font-awesome-icon icon="fa-solid fa-play" />
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
      <span class="icon">
        <font-awesome-icon icon="fa-solid fa-stop" />
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import CronometroVue from "./Cronometro.vue";

  export default defineComponent({
    name: "TemporizadorVue",
    emits: ["aoFinalizarTarefa"],
    components: {
      CronometroVue,
    },
    data() {
      return {
        tempoEmSegundos: 0,
        cronometro: 0,
        cronometroRodando: false,
      }
    },
    methods: {
      iniciar() {
        this.cronometroRodando = true;
        this.cronometro = setInterval(() => {
          this.tempoEmSegundos += 1
        }, 1000);
      },
      finalizar() : void {
        this.$emit("aoFinalizarTarefa", this.tempoEmSegundos);
        this.tempoEmSegundos = 0;
        this.cronometroRodando = false;
        clearInterval(this.cronometro);
      },
    },
  });
</script>
