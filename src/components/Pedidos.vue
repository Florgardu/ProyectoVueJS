<template>
  <section v-if="isAdmin" class="src-components-productos px-5">
    <div class="table">
      <div class="alert alert-warning mt-3" style="text-align: center; width: 350px">
        <b>Total de pedidos: {{ totalPedidos }}</b>
      </div>

      <table v-if="pedidos.length > 0" class="table table-striped mt-3">
        <thead>
          <tr class="table-info">
            <th>ID Pedido</th>
            <th>ID Cliente</th>
            <th>Productos</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pedido, index) in pedidos" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ pedido.idCustomer }}</td>
            <td>{{ pedido.productos.length }}</td>
            <td>
              <button class="btn btn-outline-info" @click="detallesPedido(pedido._id)">
                Ver Detalles
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <div v-if="!isAdmin" class="alert alert-warning">
        No tenes permisos para acceder a este recurso
  </div>
</template>

<script>
import filters from "../filters";
import jwt from "jsonwebtoken";

export default {
  name: "SrcComponentsProductos",
  mixins: [filters],
  props: [],
  data() {
    return {
      isAdmin : false
    };
  },
  computed: {
    pedidos() {
      return this.getPedidos();
    },
    totalPedidos() {
      return this.pedidos.length;
    }
  },
  mounted() {
    this.getDatosForm();
    this.chequearAdmin();
  },
  methods: {
    getPedidos() {
      return this.$store.state.pedidos;
    },
    async getDatosForm() {
      this.$store.dispatch("getPedidosAxios");
    },
    detallesPedido(pedidoid) {
      this.$router.push({
        name: "PedidoDetails",
        params: {
          pedidoid
        }
      });
    },
    chequearAdmin() {
      const tokenDecoded = jwt.decode(localStorage.jwt);
      if (tokenDecoded) {
        const { rol } = tokenDecoded;
        this.isAdmin = (rol == "admin");
        console.log(this.isAdmin)
      }
    }
  }
};
</script>

<style scoped lang="css">
.toRight {
  float: right;
}

.table-responsive {
  background-color: white;
}

.size {
  width: 500px;
  box-shadow: 2px 2px #dce0d9b5;
}

.manito:hover {
  cursor: pointer;
}
</style>
