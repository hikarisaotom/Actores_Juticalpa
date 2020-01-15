<template>
  <div class="organizaciones">
    <div class="row">
      <div class="col s12 m3 l2" v-for="organizacion in organizaciones" :key="organizacion.ID">
        <div class="card">
          <div
            id="img_org"
            class="card-image"
            v-bind:style="{ backgroundImage: 'url(' + organizacion.imagen_organizacion + ')'}"
          >
            <a class="btn-floating halfway-fab waves-effect waves-light red">
              <i class="material-icons">remove_red_eye</i>
            </a>
          </div>
          <div class="card-content">
            <span class="flow-text">{{organizacion.nombre}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "../firebase";
import { firestore } from "../firebase";
import { mask } from "vue-the-mask";

export default {
  data: () => ({
    organizaciones: [],
    organizacion_actual: {}
  }),
  components: {
    firebase,
    firestore
  },
  directives: { mask },
  mounted: function() {
    this.getOrganizaciones();
  },
  methods: {
    getOrganizaciones: function() {
      firestore
        .collection("Actor")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            //console.log(doc.id, " => ", doc.data());
            this.organizaciones.push({
              ID: doc.id,
              nombre: doc.data().nombre,
              area_trabajo: doc.data().area_trabajo,
              descripcion: doc.data().descripcion,
              email_encargado: doc.data().email_encargado,
              email_institucion: doc.data().email_institucion,
              funciones_en_municipio: doc.data().funciones_en_municipio,
              logros: doc.data().logros,
              proyectos: doc.data().proyectos,
              representante: doc.data().representante,
              socios: doc.data().socios,
              telefono: doc.data().telefono,
              telefono_representante: doc.data().telefono_representante,
              tipo_organizacion: doc.data().tipo_organizacion,
              ubicacion: doc.data().ubicacion,
              imagen_organizacion: doc.data().imagen_organizacion
            });
            //console.log(this.organizaciones[this.organizaciones.length - 1]);
            this.organizaciones.sort((a, b) =>
              a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
            );
          });
        })
        .catch(function(error) {
          console.log("Error getting Organizaciones: ", error);
        });
    }
  }
};
</script>

<style>
#img_org {
  height: 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>