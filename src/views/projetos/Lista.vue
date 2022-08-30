<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Projeto</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-smal">
                <font-awesome-icon icon="fa-solid fa-pencil-alt" />
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipo-acoes";

export default defineComponent({
  name: "ListaVue",
  methods: {
    excluir(id: string) {
      this.store.dispatch(REMOVER_PROJETO, id)
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_PROJETOS)
    return {
      projetos: computed(() => store.state.projeto.projetos),
      store
    }
  }
});
</script>
