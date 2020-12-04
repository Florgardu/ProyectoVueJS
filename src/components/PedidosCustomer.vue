<template>
  <section class="src-components-productos px-5">
    <div class="table">
      <div class="alert alert-warning mt-3" style="text-align: center; width: 350px">
        <b>Mis pedidos en curso: {{ totalPedidos }}</b>
      </div>

      <table v-if="totalPedidos > 0" class="table table-striped mt-3">
        <thead>
          <tr class="table-info">
            <th>ID Pedido</th>
            <th>Productos</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pedido, index) in pedidosPorUsuario" :key="index">
            <td>{{ pedido._id }}</td>
            <td>{{ getCantProd(pedido) }}</td>
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
</template>

<script>
import jwt from "jsonwebtoken";
import filters from "../filters";

export default {
  name: "SrcComponentsProductos",
  mixins: [filters],
  props: [],
  data() {
    return {};
  },
  computed: {
    pedidosPorUsuario() {
      let pedidos = this.getPedidos();
      const tokenDecoded = jwt.decode(localStorage.jwt);
      const idLogueado = tokenDecoded.id;
      return pedidos.filter(pedido => pedido.idCustomer === idLogueado);
    },
    totalPedidos() {
      return this.pedidosPorUsuario.length;
    }
  },
  mounted() {
    this.getDatosForm();
  },
  methods: {
    getPedidos() {
      return this.$store.state.pedidos;
    },
    // pedido de los datos almacenados en el backend - GET
    getDatosForm() {
      this.$store.dispatch("getPedidosAxios");
    },

    getCantProd(pedido) {
      let cantidad = 0;

      pedido.productos.forEach(producto => {
        cantidad += producto.cantidad;
      });

      return cantidad;
    },

    detallesPedido(pedidoid) {
      this.$router.push({
        name: "PedidoDetailsCustomer",
        params: {
          pedidoid
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
