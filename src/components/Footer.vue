<template>
  <section class="src-components-footer">
    <br />
    <br />
    <footer class="layout-footer">
      <section class="w3l-footers-1">
        <div class="footer py-3">
          <div class="container">
            <div class="footer-content">
              <div class="row">
                <div class="col-lg-8 footer-left">
                  <a href="https://www.ort.edu.ar/" target="_blank"><img src="../assets/Ort.png" class="layout-footer-url"/></a>
                </div>
                <div class="col-lg-3 footer-right text-lg-right text-center mt-lg-0 mt-3 layout-div-apellidos">
                  <div class="apellidos">
                    <ul class="ml-auto social m-0 p-0">
                      <li><a href="https://github.com/maurook22" target="_blank"> Abraham</a></li>
                      <li><a href="https://github.com/Florgardu" target="_blank">Garduño</a></li>
                      <li><a href="https://github.com/JulianGrilli" target="_blank">Grilli</a></li>
                      <li><a href="https://github.com/federicomateucci" target="_blank">Mateucci</a></li>
                      <li><a href="https://github.com/romeramatias" target="_blank">Romera</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  </section>
</template>

<script>
export default {
  name: "src-components-footer",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped lang="css">
.layout-footer-url {
    height: 100px;
    margin-top: -16px;
}
.w3l-footers-1 {
  /*-- responsive design --*/
  /*-- //responsive design --*/
}
.w3l-footers-1 .d-grid {
  display: grid;
}
.w3l-footers-1 .grid-columns-2 {
  grid-template-columns: 2.5fr 1fr;
  grid-column-gap: 20px;
}
.w3l-footers-1 .align-right {
  text-align: right;
}
.w3l-footers-1 .footer {
  position: relative;
  background-color: var(--secondary);
}
.w3l-footers-1 .footer-left p {
  font-size: 16px;
  line-height: 26px;
  color: #aaa;
}
.w3l-footers-1 .footer-left p a {
  color: #ccc;
}
.w3l-footers-1 ul.social li {
  display: inline-block;
  margin-left: 20px;
}
.w3l-footers-1 ul.social li a {
  color: #aaa;
}
.w3l-footers-1 ul.social li a:hover {
  color: var(--primary);
}
@media (max-width: 992px) {
  .w3l-footers-1 .footer-content {
    text-align: center;
  }
}
@media (max-width: 737px) {
  .w3l-footers-1 ul.social li {
    margin-left: 0px;
    margin: 0 7px;
  }
}
@media (max-width: 480px) {
  .w3l-footers-1 .footer-right {
    margin-top: 5px;
  }
}
@media (max-width: 415px) {
  .w3l-footers-1 .footer-left,
  .w3l-footers-1 .footer-right {
    text-align: center;
  }
  .w3l-footers-1 .grid-columns-2 {
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
  }
}


</style>
