<template>
  <section class="src-components-home px-5 m-5">
    <div class="jumbotron">
      <div class="container mainDiv" align="center">
        <h2>Bienvenido!</h2>
        <p>Ingresá con tu cuenta para empezar a realizar pedidos.</p>
        <div class="col-md-8">
          <div v-if="errorLogueo" class="alert alert-warning">
            Usuario Incorrecto, intente nuevamente
          </div>
          <form novalidate autocomplete="off" @submit.prevent="enviar()">
            <!-- ------------- -->
            <!--  CAMPO EMAIL  -->
            <!-- ------------- -->
            <div class="form-group">
              <label for="email" class="label-form font-weight-bold">Email</label>
              <input id="email" v-model="v.f.email.$model" type="email" class="form-control" placeholder="Ingrese su correo electrónico..." />
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.email.$error && v.f.email.$dirty" class="alert alert-danger mt-1">
                <div v-if="v.f.email.required.$invalid">
                  Este campo es requerido
                </div>
                <div v-if="v.f.email.email.$invalid">
                  Debe proveer un email válido
                </div>
              </div>
            </div>
            <!-- ------------ -->
            <!--  CAMPO DESCRIPCION  -->
            <!-- ------------v-model.number="v.f.password.$model" -->
            <div class="form-group mt-5">
              <label for="password"><b>Contraseña</b></label>
              <input id="password" v-model="v.f.password.$model" type="password" class="form-control" placeholder="Ingrese password..." />
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.password.$error && v.f.password.$dirty" class="alert alert-danger mt-1">
                <div v-if="v.f.password.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>
            <!-- BOTÓN ENVÍO  -->
            <div class="form-group my-3">
              <button type="submit" :disabled="v.$invalid" class="btn btn-success mt-4" value="Enviar">
                Ingresar
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import jwt from "jsonwebtoken";

export default {
  name: "SrcComponentsHome",
  props: ["onRol", "onEstadologin"],

  data() {
    return {
      f: {
        password: "",
        email: ""
      },
      v: null,
      url: "http://localhost:3000/users/login",
      errorLogueo: "",
      isAdmin: null,
      estalogueado: false
    };
  },

  computed: {},
  mounted() {},

  created() {
    const rules = {
      f: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    };

    const { f } = this;
    this.v = useVuelidate(rules, { f });
  },
  methods: {
    async sendDatosFormAxios(datos) {
      try {
        const res = await this.axios.post(this.url, datos, { "content-type": "application/json" });
        console.log(res.data);
        localStorage.jwt = res.data.token;
        console.log("jwt::", localStorage);
        this.errorLogueo = false;
        this.esAdmin();
        this.estalogueado = true;
        if (this.isAdmin) {
          this.$router.push("/pedidos");
        } else {
          this.$router.push("/pedidoscustomer");
        }
      } catch (error) {
        console.log("HTTP POST ERROR", error);
        this.errorLogueo = true;
        this.estalogueado = false;
      }
      this.$emit("estadologin", this.estalogueado);
    },

    esAdmin() {
      const tokenDecoded = jwt.decode(localStorage.jwt);
      console.log("tokenDecoded::", tokenDecoded);
      const { rol } = tokenDecoded;
      if (rol == "admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      this.$emit("rol", this.isAdmin);
    },

    async enviar() {
      this.v.$touch();
      if (!this.v.$invalid) {
        const form = this.f;
        console.log(form);
        await this.sendDatosFormAxios(form);
        this.resetForm();
        this.v.$reset();
        // if(!this.errorLogueo){
        //   this.$router.push({name:"Productos"})
        //   }
      }
    },
    /* valor inicial de los campos de datos del formularioVue */
    resetForm() {
      this.v.f.password.$model = "";
      this.v.f.email.$model = "";
    }
  }
};
</script>

<style scoped lang="css">
.src-components-home {
}

button {
  position: absolute;
  right: 17px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.jumbotron {
  text-align: center;
  border: 1px solid #213141;
  background-color: #213141;
  margin-left: 200px;
  margin-right: 200px;
}

form {
  text-align: left;
}
</style>
