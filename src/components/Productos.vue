<template>
  <section v-if="isAdmin" class="src-components-productos px-5">
    <div class="table">
      <div class="mt-5 mb-2" style="float: left">
        <input v-model="criterioBusqueda" type="text" class="form-control size" placeholder="Ingrese una marca.." />
      </div>

      <div class="mt-5 mb-2" style="float: right">
        <button class="btn btn-success" @click="addProducto()">
          Agregar producto
        </button>
      </div>

      <table v-if="productosFiltrados.length > 0" class="table table-striped">
        <thead>
          <tr class="table-info">
            <th>Marca</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in productosFiltrados" :key="index">
            <td>{{ producto.marca }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ agregarSignoPesos(producto.precio) }}</td>
            <td>
              <i class="fas fa-minus-circle manito" style="color: red" @click="deleteProduct(producto)" />
            </td>
            <td>
              <i class="fas fa-edit manito" @click="editarProducto(producto._id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="isRequestLoading" class="spinner-border text-primary mt-2" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </section>
  <div v-if="!isAdmin" class="alert alert-warning">
        No tenes permisos para acceder a este recurso
  </div>
</template>

<script>
import filters from "../filters";
import miMixins from "../miMixins";
import jwt from "jsonwebtoken";

export default {
  name: "SrcComponentsProductos",
  mixins: [filters, miMixins],
  props: [],
  data() {
    return {
      productoEliminado: "",
      // productos: [],
      url: "http://localhost:3000/products/",
      criterioBusqueda: "",
      isRequestLoading: false,
      isAdmin: false
    };
  },
  computed: {
    productosFiltrados() {
      let productos = this.mostrarProductos;
      return productos.filter(producto => {
        const registroCompleto = `${producto.marca}`;
        return registroCompleto.toLowerCase().includes(this.criterioBusqueda.toLowerCase());
      });
    },

  },

  mounted: function() {
    this.getDatosForm();
    this.chequearAdmin();
  },
  methods: {
    // pedido de los datos almacenados en el backend - GET
    getDatosForm() {
      this.$store.dispatch("getProductosAxios");
    },

    chequearAdmin() {
      const tokenDecoded = jwt.decode(localStorage.jwt);
      if (tokenDecoded) {
        const { rol } = tokenDecoded;
        this.isAdmin = (rol == "admin");
        console.log(this.isAdmin)
      }
    }, 

    addProducto() {
      this.$router.push("/altaproducto");
    },

    // acá falta hacerlo con async await y try catch

    async deleteProduct(producto) {
      if (confirm(`Esta seguro que desea eliminar el producto: "${producto.descripcion}" ?`)) {
        try {
          this.isRequestLoading = true;
          await this.axios.delete(this.url + producto._id, {
            headers: {
              Authorization: `Bearer ${localStorage.jwt}`
            }
          });
          await this.getDatosForm();
          // console.log(res.data.mensaje);
          this.isRequestLoading = false;
        } catch (err) {
          this.isRequestLoading = false;
          console.log(err);
        }
      }
    },

    editarProducto(productoid) {
      this.$router.push({
        name: "ModificarProducto",
        params: {
          productoid
        }
      });
    }
  }
};
</script>

<style scoped lang="css">
.toRight {
  float: right;
}

.size {
  width: 500px;
}

.manito:hover {
  cursor: pointer;
}

</style>
