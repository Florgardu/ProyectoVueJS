<template>
  <section class="src-components-pedido-details-customer px-5 m-5">
    <div>
      <div v-if="isRequestLoading" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="">
        <h2 class="display-7">
          Pedido ID: <b>{{ pedido._id }}</b>
        </h2>
        <hr class="my-4" />
        <p class="lead">
          Productos incluidos en el pedido:
        </p>
        <table class="table table-striped mt-3">
          <thead>
            <tr class="table-info">
              <th>Marca</th>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, index) in productos" :key="index">
              <th>{{ producto.producto.marca }}</th>
              <td>{{ producto.producto.descripcion }}</td>
              <td>{{ agregarSignoPesos(producto.producto.precio) }}</td>
              <td>{{ producto.cantidad }}</td>
              <td>
                {{ agregarSignoPesos(producto.producto.precio * producto.cantidad) }}
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr class="table-dark">
              <td>Total del Pedido:</td>
              <td />
              <td />
              <td />
              <td :style="{ color: cambiarColor }">
                {{ agregarSignoPesos(calcularTotal) }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-5 mb-2" style="float: right">
          <button class="btn btn-info" @click="irAPedidos()">
            Volver a Pedidos
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import filters from "../filters";

export default {
  name: "SrcComponentsPedidoDetailsCustomer",
  mixins: [filters],
  props: ["pedidoid"],
  data() {
    return {
      isRequestLoading: false,
      url: "http://localhost:3000/pedidos/",
      pedido: {},
      productos: []
    };
  },
  computed: {
    cambiarColor() {
      const importeTotal = this.calcularTotal;
      if (importeTotal < 1000) {
        return "#50C878";
      }
      if (importeTotal > 1000 && importeTotal < 2500) {
        return "#F2AE42";
      }
      return "#EA7571";
    },

    calcularTotal() {
      let sum = 0;
      for (let i = 0; i < this.productos.length; i++) {
        const producto = this.productos[i];
        const { precio } = producto.producto;
        sum += precio * producto.cantidad;
      }
      return sum;
    }
  },
  mounted() {
    this.getPedido(this.pedidoid);
  },
  methods: {
    async getPedido(pedidoid) {
      this.isRequestLoading = true;
      const res = await this.axios(this.url + pedidoid, {
        headers: { Authorization: `Bearer ${localStorage.jwt}` }
      });
      this.pedido = res.data;
      this.productos = this.pedido.productos;
      this.isRequestLoading = false;
    },
    irAPedidos() {
      this.$router.push({
        name: "PedidosCustomer"
      });
    }
  }
};
</script>

<style scoped lang="css"></style>
