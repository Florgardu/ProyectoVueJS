<template>
  <section class="src-components-pedido-details px-5 m-5">
    <div>
      <div v-if="isRequestLoading" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <h2 class="display-7">
        Pedido ID: <b>{{ pedido._id }}</b>
      </h2>
      <hr class="my-4" />
      <div class="">
        <p class="lead infoContacto">
          Pedido del cliente: <b>{{ cliente.username }}</b> | Contacto:
          <b>{{ cliente.email }}</b>
        </p>
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
              <td>{{ agregarSignoPesos(calcularTotal) }}</td>
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
  name: "SrcComponentsPedidoDetails",
  mixins: [filters],
  props: ["pedidoid"],
  data() {
    return {
      isRequestLoading: false,
      url: "http://localhost:3000/pedidos/",
      pedido: {},
      cliente: {},
      productos: []
      // importeTotal: 0,
    };
  },
  computed: {
    calcularTotal() {
      let sum = 0;
      console.log(this.productos.length);
      for (let i = 0; i < this.productos.length; i++) {
        const producto = this.productos[i];
        const { precio } = producto.producto;
        console.log(precio);
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
      this.getCliente();
      this.productos = this.pedido.productos;
      this.isRequestLoading = false;
    },
    async getCliente() {
      this.isRequestLoading = true;
      const res = await this.axios(`http://localhost:3000/users/${this.pedido.idCustomer}`, {
        headers: { Authorization: `Bearer ${localStorage.jwt}` }
      });
      this.cliente = res.data;
    },
    irAPedidos() {
      this.$router.push({
        name: "Pedidos"
      });
    }
  }
};
</script>

<style scoped lang="css">
.infoContacto {
  border: 3px solid #438591;
  width: 50%;
  padding: 5px;
}
</style>
