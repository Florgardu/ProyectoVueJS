<template>
  <section class="src-components-navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <span class="navbar-brand" href="#">Autopartes Raul 👨🏼‍🔧🧰</span>

      <div id="navbarNav" class="collapse navbar-collapse">
        <div v-if="isAdmin">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/productos">
                <a class="nav-link" href="#">Productos</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pedidos">
                <a class="nav-link" href="#">Lista de pedidos</a>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-if="isAdmin === false">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/productosCustomer">
                <a class="nav-link" href="#">Realizar pedido</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pedidoscustomer">
                <a class="nav-link" href="#">Mis pedidos</a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <button v-if="!isLogin" type="button" class="btn btn-outline-primary" @click="irLogin()">
              Login
            </button>
            <!--<button v-if="!isLogin" type="button" class="btn btn-outline-success">Signin</button>-->
            <button v-if="isLogin" type="button" class="btn btn-outline-danger my-2 my-sm-0" @click="logout()">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </section>

  <div v-if="!isLogin">
    <Login @rol="notificarAdmin($event)" @estadologin="validarEstadoLogin($event)" />
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import Login from "./Login.vue";

export default {
  name: "SrcComponentsNavbar",
  components: {
    Login
  },
  props: [],
  data() {
    return {
      isAdmin: null,
      isLogin: false
    };
  },

  computed: {},
  mounted() {
    this.chequearLogin();
    this.chequearAdmin();
  },
  methods: {
    chequearLogin() {
      const tokenDecoded = jwt.decode(localStorage.jwt);
      this.isLogin = tokenDecoded;
    },
    chequearAdmin() {
      const tokenDecoded = jwt.decode(localStorage.jwt);
      if (tokenDecoded) {
        const { rol } = tokenDecoded;
        this.isAdmin = rol == "admin";
      }
    },
    notificarAdmin(valor) {
      console.log(valor);
      this.isAdmin = valor;
    },

    validarEstadoLogin(valor) {
      console.log(`estado loguin :${valor}`);
      this.isLogin = valor;
    },

    logout() {
      localStorage.jwt = null;
      (this.isAdmin = null), (this.isLogin = false);
      console.log(localStorage.jwt);
      this.$router.push("/");
    },

    irLogin() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="css">
.src-components-navbar {
}

button {
  margin-right: 4px;
}
</style>
