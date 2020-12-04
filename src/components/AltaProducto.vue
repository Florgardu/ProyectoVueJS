<template>
  <section class="src-components-altaproducto">
    <div class="jumbotron">
      <h4>Alta Producto</h4>
      <hr>

      <div class="container">
        <form
          novalidate
          autocomplete="off"
          @submit.prevent="enviar()"
        >
          <!-- ------------ -->
          <!-- CAMPO MARCA -->
          <!-- ------------ -->
          <div class="form-group">
            <label for="marca">Marca</label>
            <input
              id="marca"
              v-model="v.f.marca.$model"
              type="text"
              class="form-control"
              placeholder="Ingrese marca.."
            >
            <!-- CARTELES DE VALIDACIÓN -->
            <div
              v-if="v.f.marca.$error && v.f.marca.$dirty"
              class="alert alert-danger mt-1"
            >
              <div v-if="v.f.marca.required.$invalid">
                Este campo es requerido
              </div>
            </div>
          </div>
          <!-- ------------ -->
          <!--  CAMPO DESCRIPCION  -->
          <!-- ------------ -->
          <div class="form-group">
            <label for="descripcion">Descripcion</label>
            <input
              id="descripcion"
              v-model.number="v.f.descripcion.$model"
              type="text"
              class="form-control"
              placeholder="Ingrese descripcion.."
            >
            <!-- CARTELES DE VALIDACIÓN -->
            <div
              v-if="v.f.descripcion.$error && v.f.descripcion.$dirty"
              class="alert alert-danger mt-1"
            >
              <div v-if="v.f.descripcion.required.$invalid">
                Este campo es requerido
              </div>
            </div>
          </div>
          <!-- ------------- -->
          <!--  CAMPO PRECIO  -->
          <!-- ------------- -->
          <div class="form-group">
            <label for="precio">Precio</label>
            <input
              id="precio"
              v-model="v.f.precio.$model"
              type="number"
              class="form-control"
              placeholder="Ingrese precio.."
            >
            <!-- CARTELES DE VALIDACIÓN -->
            <div
              v-if="v.f.precio.$error && v.f.precio.$dirty"
              class="alert alert-danger mt-1"
            >
              <div v-if="v.f.precio.required.$invalid">
                Este campo es requerido
              </div>
            </div>
          </div>
          <!-- ------------ -->
          <!-- BOTÓN ENVÍO  -->
          <!-- ------------ -->
          <div class="form-group">
            <input
              type="submit"
              :disabled="v.$invalid"
              class="btn btn-success mt-4"
              value="Enviar"
            >
          </div>
        </form>

        <div
          v-if="agregado"
          class="alert alert-warning"
        >
          REGISTRO AGREGADO
        </div>
        <div v-if="agregado">
          <button
            class="btn btn-primary"
            @click="goProductos()"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
    <div class="mt-5 mb-2" style="float:right; margin-right: 25px;">
      <button class="btn btn-info" @click="irAProductos()">
        Volver
      </button>
    </div>
  </section>
</template>

<script>

import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import miMixin from '../miMixins';

export default {

  name: 'SrcComponentsAltaproducto',
  mixins: [miMixin],
  data() {
    return {

      f: {
        marca: '',
        descripcion: '',
        precio: '',
      },
      v: null,
      url: 'http://localhost:3000/products/',
      agregado: false,

    };
  },
  computed: {

  },

  created() {
    const rules = {
      f: {
        marca: {
          required,
        },
        descripcion: {
          required,
        },
        precio: {
          required,
        },
      },
    };

    const { f } = this;
    this.v = useVuelidate(rules, { f });
  },
  methods: {

    async sendDatosFormAxios(datos) {
      try {
        const config = {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.jwt}`,
          },
        };
        await this.axios.post(this.url, datos, config);
      } catch (err) {
        console.log(err);
      }
    },

    async enviar() {
      this.v.$touch();
      if (!this.v.$invalid) {
        const form = this.f;
        // console.log(form)
        await this.sendDatosFormAxios(form);
        this.agregado = true;
        this.v.$reset();
        this.$router.push({ name: 'Productos' });
      }
    },
    irAProductos() {
      this.$router.push({
        name: "Productos"
      });
    }
  },
};

</script>

<style scoped lang="css">
  .src-components-altaproducto {

  }

  .jumbotron {
    background-color:#2b3e50;
  }

</style>
