<template>
  <section class="src-components-altaproducto">
    <div class="jumbotron m-5">
      <h4>Modificar Producto</h4>
      <hr />
      <div v-if="isRequestLoading" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-if="modificado" class="alert alert-success">
        REGISTRO MODIFICADO
      </div>
      <div class="container" align="center">
        <div class="col-md-8">
          <form novalidate autocomplete="off" @submit.prevent="modificar()">
            <!-- ------------ -->
            <!-- CAMPO MARCA -->
            <!-- ------------ -->
            <div class="form-group">
              <label for="marca" class="font-weight-bold">Marca</label>
              <input id="marca" v-model="v.f.marca.$model" type="text" class="form-control" placeholder="Ingrese marca.." />
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.marca.$error && v.f.marca.$dirty" class="alert alert-danger mt-1">
                <div v-if="v.f.marca.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>
            <!-- ------------ -->
            <!--  CAMPO DESCRIPCION  -->
            <!-- ------------ -->
            <div class="form-group mt-5">
              <label for="descripcion" class="font-weight-bold">Descripcion</label>
              <input id="descripcion" v-model.number="v.f.descripcion.$model" type="text" class="form-control" placeholder="Ingrese descripcion.." />
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.descripcion.$error && v.f.descripcion.$dirty" class="alert alert-danger mt-1">
                <div v-if="v.f.descripcion.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>
            <!-- ------------- -->
            <!--  CAMPO PRECIO  -->
            <!-- ------------- -->
            <div class="form-group mt-5">
              <label for="precio" class="font-weight-bold">Precio</label>
              <input id="precio" v-model="v.f.precio.$model" type="number" class="form-control" placeholder="Ingrese precio.." />
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.precio.$error && v.f.precio.$dirty" class="alert alert-danger mt-1">
                <div v-if="v.f.precio.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>
            <!-- ------------ -->
            <!-- BOTÓN ENVÍO  -->
            <!-- ------------ -->
            <div class="form-group">
              <button type="submit" :disabled="v.$invalid" class="btn btn-success mt-4">
                Modificar
              </button>
              <br>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="mt-5 mb-2 justify-content-end">
      <button class="btn btn-info" @click="irAProductos()">
        Volver
      </button>
    </div>
  </section>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import miMixin from "../miMixins";

export default {
  name: "SrcComponentsAltaproducto",
  mixins: [miMixin],
  props: ["productoid"],
  data() {
    return {
      f: {
        _id: "",
        marca: "",
        descripcion: "",
        precio: ""
      },
      v: null,
      url: "http://localhost:3000/products/",
      modificado: false,
      isRequestLoading: false
    };
  },

  computed: {},
  mounted() {
    this.getProduct(this.productoid);
  },
  created() {
    const rules = {
      f: {
        _id: {
          required
        },
        marca: {
          required
        },
        descripcion: {
          required
        },
        precio: {
          required
        }
      }
    };

    const { f } = this;
    this.v = useVuelidate(rules, { f });
  },
  methods: {
    async upadteProduct(datos) {
      if (confirm(`Esta seguro que desea modificar el producto: "${datos.descripcion}" ?`)) {
        try {
          this.isRequestLoading = true;
          const productoId = datos._id;
          const config = {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${localStorage.jwt}`
            }
          };
          await this.axios.put(this.url + productoId, datos, config);
          // console.log(`Se modifico el producto con el ID = ${res.data._id}`);
          this.isRequestLoading = false;
        } catch (err) {
          console.log(err);
        }
      }
    },

    async modificar() {
      this.v.$touch();
      if (!this.v.$invalid) {
        const form = this.f;
        await this.upadteProduct(form);
        this.modificado = true;
        this.isRequestLoading = false;
        setTimeout(() => {
          this.$router.push("/productos");
        }, 2000);
      }
    },
    async getProduct(productoid) {
      this.isRequestLoading = true;
      const res = await this.axios(this.url + productoid, {
        headers: { Authorization: `Bearer ${localStorage.jwt}` }
      });
      this.v.f._id.$model = productoid;
      this.v.f.marca.$model = res.data.marca;
      this.v.f.descripcion.$model = res.data.descripcion;
      this.v.f.precio.$model = res.data.precio;
      this.isRequestLoading = false;
    },
    irAProductos() {
      this.$router.push({
        name: "Productos"
      });
    }
  }
};
</script>

<style scoped lang="css">
.src-components-altaproducto {
}

.jumbotron {
  background-color: #213141;
}

form {
  text-align: left;
}

button {
  position: absolute;
  right: 17px;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
