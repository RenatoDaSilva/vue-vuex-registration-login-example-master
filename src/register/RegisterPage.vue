<template>
  <div>
    <h2>Cadastro</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="firstName">Nome</label>
        <input
          type="text"
          v-model="user.firstName"
          v-validate="'required'"
          name="firstName"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('firstName') }"
        />
        <div
          v-if="submitted && errors.has('firstName')"
          class="invalid-feedback"
        >
          {{ errors.first("firstName") }}
        </div>
      </div>
      <div class="form-group">
        <label for="lastName">Sobrenome</label>
        <input
          type="text"
          v-model="user.lastName"
          v-validate="'required'"
          name="lastName"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('lastName') }"
        />
        <div
          v-if="submitted && errors.has('lastName')"
          class="invalid-feedback"
        >
          {{ errors.first("lastName") }}
        </div>
      </div>
      <div class="form-group">
        <label for="username">CPF</label>
        <input
          type="text"
          v-model="user.username"
          v-validate="'required'"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('username') }"
        />
        <div
          v-if="submitted && errors.has('username')"
          class="invalid-feedback"
        >
          {{ errors.first("username") }}
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          v-model="user.password"
          v-validate="{ required: true, min: 6 }"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('password') }"
        />
        <div
          v-if="submitted && errors.has('password')"
          class="invalid-feedback"
        >
          {{ errors.first("password") }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          v-model="user.requestBrokerStatus"
          name="requestBrokerStatus"
          class="form-check-input"
        />
        <label for="requestBrokerStatus">Solicitar status de Corretor</label>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="status.registering">
          Cadastrar
        </button>
        <img
          v-show="status.registering"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
        <router-link to="/login" class="btn btn-link">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { CREATE_USER } from "../constants/graphql";
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        requestBrokerStatus: false,
        email: "renato@gmail.com",
      },
      submitted: false,
    };
  },
  apollo: {},
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          console.log(CREATE_USER);
          this.$apollo
            .mutate({
              mutation: CREATE_USER,
              variables: {
                username: this.user.username,
                email: this.user.email,
                password: this.user.password,
              },
            })
            .then((data) => {
              console.log(result);
            });
        }
      });
    },
  },
};
</script>