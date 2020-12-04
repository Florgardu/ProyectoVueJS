import { createWebHistory, createRouter } from 'vue-router';

import Login from '../components/Login.vue';
import AltaProducto from '../components/AltaProducto.vue';
import ModificarProducto from '../components/ModificarProducto.vue';
import Productos from '../components/Productos.vue';
import ProductosCustomer from '../components/ProductosCustomer.vue';
import Pedidos from '../components/Pedidos.vue';
import PedidosCustomer from '../components/PedidosCustomer.vue';
import PedidoDetails from '../components/PedidoDetails.vue';
import PedidoDetailsCustomer from '../components/PedidoDetailsCustomer.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/login', name: 'Login', component: Login },
  { path: '/altaproducto', name: 'AltaProducto', component: AltaProducto },
  { path: '/productos', name: 'Productos', component: Productos },
  {
    path: '/modificarproducto/:productoid', name: 'ModificarProducto', component: ModificarProducto, props: true,
  },
  { path: '/productosCustomer/', name: 'ProductosCustomer', component: ProductosCustomer },
  { path: '/pedidos/', name: 'Pedidos', component: Pedidos },
  { path: '/pedidoscustomer/', name: 'PedidosCustomer', component: PedidosCustomer },
  { path: '/catchAll(.*)', name: 'NotFound', component: Login },
  {
    path: '/detallespedido/:pedidoid', name: 'PedidoDetails', component: PedidoDetails, props: true,
  },
  {
    path: '/detallespedido/:pedidoid', name: 'PedidoDetailsCustomer', component: PedidoDetailsCustomer, props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
