<template>
  <header>
    <div class="logoContainer">
      <font-awesome-icon icon="fa-solid fa-business-time" class="logo" />
      <span class="logoText">Task Tracker</span>
    </div>
    <button class="button" @click="alterarTema">{{ textoBotao }}</button>
    <nav class="painel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <font-awesome-icon icon="fa-solid fa-list-check" />
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <font-awesome-icon icon="fa-solid fa-diagram-project" />
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "BarraLateral",
    emits: ["aoTemaAlterado"],
    data() {
      return {
        modoEscuroAtivo: false,
      };
    },
    computed: {
      textoBotao() {
        if(this.modoEscuroAtivo) {
          return "Desativar modo escuro"
        }
        return "Ativar modo escuro"
      }
    },
    methods: {
      alterarTema() {
        this.modoEscuroAtivo = !this.modoEscuroAtivo;
        this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
      },
    },
  });
</script>

<style scoped>
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
  }
  .logoContainer {
    display: flex;
    align-items: center;
  }
  .logo{
    height: 5rem;
    color: #DDDDDD;
    margin: 32px 0;
  }
  .logoText {
    font-size: 20px;
    line-height: 20px;
    text-align: left;
    color: #DDDDDD;
    width: 60px;
    height: 40px;
    flex-wrap: wrap;
    margin-left: 8px;
  }
  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }
  .painel {
    align-self: flex-start;
    margin-left: 32px;
    text-align: left;
  }
  .painel li {
    margin: 8px 0;
  }
  .link {
    color: #FFFFFF;
  }
  .link:hover {
    color: #FAF0CA;
  }
  .link.router-link-active {
    color: #FAF0CA;
  }
</style>
