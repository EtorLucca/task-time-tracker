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
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "ListaVue",
  setup() {
    const store = useStore()
    return {
      projetos: computed(() => store.state.projetos)
    }
  }
});
</script>
