import { createStore } from 'vuex';
import axios from 'axios';

const url= 'http://localhost:3000/products/'
const urlPedidos = 'http://localhost:3000/pedidos/'

export default createStore({
  state() {
    return {
     productos: [],
     pedidos: []
    }
  },
  actions: {
    async getProductosAxios({commit}){
      try {
//        this.isRequestLoading = true;
        const response = await axios(url, {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
        });
        console.log(response.data);
       commit('guardarProductosMutation',response.data);
    //   this.isRequestLoading = false;
      } catch (error) {
     //   this.isRequestLoading = false;
        console.log('HTTP GET ERROR', error);
        this.$router.push('/');
      }
    },

    async getPedidosAxios({commit}){
      try {
        const response = await axios(urlPedidos, {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
        });
       commit('guardarPedidosMutation',response.data);
      } catch (error) {
        console.log('HTTP GET ERROR', error);
        this.$router.push('/');
      }
    }

  },
  
  mutations: {
     guardarProductosMutation(state,productos) {
            state.productos = productos
        } ,
     guardarPedidosMutation(state,pedidos) {
          state.pedidos = pedidos
     } 
  },
});
