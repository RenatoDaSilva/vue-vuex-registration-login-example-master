<template>
  <div>
    <h1>Bem vindo {{ account.user.firstName }}!</h1>
    <p>Agora você faz parte do LLine</p>
    <p v-if="account.user.requestBrokerStatus">Você marcou que é um corretor. Um e-mail foi enviado solicitando ao nosso suporte a ativação deste status. Em breve eles entrarão em contato através do seu e-mail informado, solicitando algumas informações</p>
    <h3>Usuários da API:</h3>
    <em v-if="users.loading">Carregando usuários...</em>
    <span v-if="users.error" class="text-danger">ERROR: {{ users.error }}</span>
    <ul v-if="users.items">
      <li v-for="user in users.items" :key="user.id">
        {{ user.firstName + " " + user.lastName }}
        <span v-if="user.deleting"><em> - Excluindo...</em></span>
        <span v-else-if="user.deleteError" class="text-danger">
          - ERROR: {{ user.deleteError }}</span
        >
        <span v-else>
          - <a @click="deleteUser(user.id)" class="text-danger">Excluir</a></span
        >
      </li>
    </ul>
    <p>
      <router-link to="/login">Sair</router-link>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users.all,
    }),
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete",
    }),
  },
};
</script>