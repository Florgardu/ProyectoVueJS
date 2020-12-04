export default {
  methods: {
    agregarSignoPesos(value) {
      return `$${value}`;
    },
  },

  computed: {
    mostrarProductos() {
      return this.$store.state.productos
    }
  }  
};
