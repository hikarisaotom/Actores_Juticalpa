<template>
  <div class="organizaciones">
    <!--Agregar Organizacion-->
    <br />
    <div class="row">
      <div class="col s12">
        <a class="waves-light btn-small green" @click="agregarOrganizacion()">
          <i class="material-icons left">add_box</i>
          Agregar Organización
        </a>
      </div>
    </div>

    <!--Cards de las organizaciones-->
    <div class="row">
      <div class="col s12 m3 l2" v-for="organizacion in organizaciones" :key="organizacion.ID">
        <div class="card">
          <div
            id="img_org"
            class="card-image"
            v-bind:style="{ backgroundImage: 'url(' + organizacion.url_img + ')'}"
          >
            <a
              @click="organizacion_actual=organizacion; mostrarOrganizacion()"
              class="btn-floating halfway-fab waves-effect waves-light red"
            >
              <i class="material-icons">remove_red_eye</i>
            </a>
          </div>
          <div class="card-content">
            <span class="flow-text">{{organizacion.nombre}}</span>
          </div>
        </div>
      </div>
    </div>

    <!--Modal de Organizacion-->
    <div id="modal_org" class="modal bottom-sheet">
      <div class="modal-content">
        <h4>{{nombre}}</h4>
        <div class="row">
          <div class="row">
            <!--Nombre y Descripcion-->
            <div class="card blue-grey darken-1 col s12 m6 l6 z-depth-5" id="nombre_desc">
              <div class="card-content white-text">
                <div class="input-field">
                  <i class="material-icons prefix">face</i>
                  <input
                    v-model="nombre"
                    id="nombre_org"
                    type="text"
                    class="materialize-textarea white-text"
                  />
                  <label :class="active" for="nombre_org">Nombre de la Institución</label>
                </div>
                <div class="input-field">
                  <i class="material-icons prefix">chrome_reader_mode</i>
                  <textarea
                    v-model="descripcion"
                    id="descripcion"
                    type="text"
                    class="materialize-textarea white-text"
                  />
                  <label :class="active" for="descripcion">Descripcion</label>
                </div>
              </div>
            </div>

            <!--Imagen-->
            <div class="card col s12 m5 l5 offset-m1 offset-l1 z-depth-5">
              <div
                class="card-image waves-effect waves-block waves-light"
                :style="{ backgroundImage: 'url(' + url_img + ')'}"
                id="img_org"
              ></div>
              <div class="card-content">
                <a href="#">
                  <i class="material-icons orange-text left">edit</i>
                </a>
                <a href="#">
                  <i class="material-icons red-text right">delete_forever</i>
                </a>
                <br />
              </div>
            </div>
          </div>

          <!--DATOS GENERALES-->
          <div class="card grey darken-3 col s12 m12 l12 z-depth-5">
            <div class="card-content">
              <span class="card-title white-text">Datos Generales</span>
              <!--Ubicación de Institución-->
              <div class="input-field">
                <i class="material-icons white-text prefix">location_on</i>
                <textarea
                  v-model="ubicacion"
                  id="ubicacion_org"
                  type="text"
                  class="materialize-textarea white-text"
                />
                <label :class="active" for="ubicacion_org">Ubicación de la Institución</label>
              </div>

              <!--Teléfono Fijo o Celular de Institución-->
              <div class="input-field">
                <i class="material-icons white-text prefix">local_phone</i>
                <input
                  v-model="telefono"
                  id="telefono_org"
                  type="text"
                  class="materialize-textarea white-text"
                />
                <label :class="active" for="telefono_org">Teléfono de la Institución</label>
              </div>

              <!--E-mail de Institución-->
              <div class="input-field">
                <i class="material-icons white-text prefix">email</i>
                <input
                  v-model="email_institucion"
                  id="email_org"
                  type="text"
                  class="materialize-textarea white-text"
                />
                <label :class="active" for="email_org">E-mail de la Institución</label>
              </div>

              <!--Representante/Gerente-->
              <div class="input-field">
                <i class="material-icons white-text prefix">face</i>
                <input
                  v-model="representante"
                  id="nombre_rep"
                  type="text"
                  class="materialize-textarea white-text"
                />
                <label :class="active" for="nombre_rep">Representante/Gerente</label>
              </div>

              <!--Teléfono Representante/Gerente-->
              <div class="input-field">
                <i class="material-icons white-text prefix">contact_phone</i>
                <input
                  v-model="telefono_representante"
                  id="tel_rep"
                  type="text"
                  class="materialize-textarea white-text"
                />
                <label :class="active" for="tel_rep">Teléfono Representante/Gerente</label>
              </div>

              <!--E-mail Representante/Gerente-->
              <div class="input-field">
                <i class="material-icons white-text prefix">contact_mail</i>
                <input
                  v-model="email_encargado"
                  id="email_rep"
                  type="text"
                  class="materialize-textarea white-text"
                />
                <label :class="active" for="email_rep">Teléfono Representante/Gerente</label>
              </div>
            </div>
          </div>

          <div class="row">
            <!--Tipos de Organización-->
            <div class="card grey darken-3 col s12 m6 l6 z-depth-5">
              <div class="card-content">
                <span class="card-title white-text">Tipo de Organización</span>
                <!--Ubicación de Institución-->
                <div align="left">
                  <form action="#">
                    <p>
                      <label>
                        <input v-model="t0" type="checkbox" />
                        <span class="white-text">Gobierno central (secretaria de estado)</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t1" type="checkbox" />
                        <span class="white-text">Gobierno Local (Municipalidad)</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t2" type="checkbox" />
                        <span class="white-text">Micro y pequeña empresa</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t3" type="checkbox" />
                        <span class="white-text">Cooperativa</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t4" type="checkbox" />
                        <span class="white-text">Centro Educativo Público</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t5" type="checkbox" />
                        <span class="white-text">Centro Educativo Privado</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t6" type="checkbox" />
                        <span
                          class="white-text"
                        >Asociación de productores/empresarios/pobladores (cámaras de comercio, cámaras de turismo, patronatos)</span>
                      </label>
                    </p>
                  </form>
                </div>
              </div>
            </div>

            <!--Área de Trabajo-->
            <div class="card grey darken-3 col s12 m5 l5 offset-m1 offset-l1 z-depth-5">
              <div class="card-content">
                <span class="card-title white-text">Tipo de Organización</span>
                <!--Ubicación de Institución-->
                <div align="left">
                  <form action="#">
                    <p>
                      <label>
                        <input v-model="a0" type="checkbox" />
                        <span class="white-text">Económica</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a1" type="checkbox" />
                        <span class="white-text">Social/Cultural</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a2" type="checkbox" />
                        <span class="white-text">Educativa</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a3" type="checkbox" />
                        <span class="white-text">Salud</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a4" type="checkbox" />
                        <span class="white-text">Ambiental</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a5" type="checkbox" />
                        <span class="white-text">Otra</span>
                      </label>
                    </p>
                  </form>
                </div>
              </div>
              <br />
              <br />
              <br />
            </div>
          </div>

          <!--Funciones en Municipio-->
          <div class="card grey darken-3 col s12 m12 l12 z-depth-5">
            <div class="card-content">
              <span class="card-title white-text">Funciones en el Municipio</span>
              <div class="collection">
                <p class="collection-item" v-for="funcion in funciones_en_municipio" :key="funcion">
                  <span class="badge">
                    <a href="#!">
                      <i class="red-text material-icons right">delete_forever</i>
                    </a>
                  </span>
                  {{funcion}}
                </p>
              </div>
              <table width="100%">
                <td width="95%">
                  <div class="input-field">
                    <input
                      v-model="funcion_en_municipio"
                      id="funcion_org"
                      type="text"
                      class="materialize-textarea white-text"
                    />
                    <label for="funcion_org">Nueva Función</label>
                  </div>
                </td>
                <td width="5%>">
                  <a href="#!">
                    <i
                      class="white-text material-icons right tooltipped"
                      data-position="top"
                      data-tooltip="Agregar Nueva Función"
                    >add_box</i>
                  </a>
                </td>
              </table>
            </div>
          </div>

          <!--Logros en Municipio-->
          <div class="card grey darken-3 col s12 m12 l12 z-depth-5">
            <div class="card-content">
              <span class="card-title white-text">Logros Importantes en el Municipio</span>
              <div class="collection">
                <p class="collection-item" v-for="logro in logros" :key="logro">
                  <span class="badge">
                    <a href="#!">
                      <i class="red-text material-icons right">delete_forever</i>
                    </a>
                  </span>
                  {{logro}}
                </p>
              </div>
              <table width="100%">
                <td width="95%">
                  <div class="input-field">
                    <input
                      v-model="logro_en_municipio"
                      id="logro_org"
                      type="text"
                      class="materialize-textarea white-text"
                    />
                    <label for="funcion_org">Nuevo Logro</label>
                  </div>
                </td>
                <td width="5%>">
                  <a href="#!">
                    <i
                      class="white-text material-icons right tooltipped"
                      data-position="top"
                      data-tooltip="Agregar Nuevo Logro"
                    >add_box</i>
                  </a>
                </td>
              </table>
            </div>
          </div>

          <!--Proyectos en Municipio-->
          <div class="card grey darken-3 col s12 m12 l12 z-depth-5">
            <div class="card-content">
              <span class="card-title white-text">Proyectos Desarrollándose en el Municipio</span>
              <div class="collection">
                <p class="collection-item" v-for="proyecto in proyectos" :key="proyecto">
                  <span class="badge">
                    <a href="#!">
                      <i class="red-text material-icons right">delete_forever</i>
                    </a>
                  </span>
                  {{proyecto}}
                </p>
              </div>
              <table width="100%">
                <td width="95%">
                  <div class="input-field">
                    <input
                      v-model="proyecto_en_municipio"
                      id="proyecto_org"
                      type="text"
                      class="materialize-textarea white-text"
                    />
                    <label for="funcion_org">Nuevo Proyecto</label>
                  </div>
                </td>
                <td width="5%>">
                  <a href="#!">
                    <i
                      class="white-text material-icons right tooltipped"
                      data-position="top"
                      data-tooltip="Agregar Nuevo Proyecto"
                    >add_box</i>
                  </a>
                </td>
              </table>
            </div>
          </div>

          <!--Socios en Municipio-->
          <div class="card grey darken-3 col s12 m12 l12 z-depth-5">
            <div class="card-content">
              <span
                class="card-title white-text"
              >Socios Estratégicos con los que Coordina Actividades en el Municipio</span>
              <div class="collection">
                <p class="collection-item" v-for="socio in socios" :key="socio">
                  <span class="badge">
                    <a href="#!">
                      <i class="red-text material-icons right">delete_forever</i>
                    </a>
                  </span>
                  {{socio}}
                </p>
              </div>
              <table width="100%">
                <td width="95%">
                  <div class="input-field">
                    <input
                      v-model="socio_en_municipio"
                      id="socio_org"
                      type="text"
                      class="materialize-textarea white-text"
                    />
                    <label for="funcion_org">Nuevo Socio</label>
                  </div>
                </td>
                <td width="5%>">
                  <a href="#!">
                    <i
                      class="white-text material-icons right tooltipped"
                      data-position="top"
                      data-tooltip="Agregar Nuevo Socio"
                    >add_box</i>
                  </a>
                </td>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="waves-effect red btn" @click="cerrarModal()">Salir</a>
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
    //Elementos de Interacción
    active: "deactive",
    t0: false,
    t1: false,
    t2: false,
    t3: false,
    t4: false,
    t5: false,
    t6: false,
    a0: false,
    a1: false,
    a2: false,
    a3: false,
    a4: false,
    a5: false,

    //Datos de organizaicon - organizaciones
    organizaciones: [],
    organizacion_actual: {
      nombre: "",
      area_trabajo: [],
      descripcion: "",
      email_encargado: "",
      email_institucion: "",
      funciones_en_municipio: [],
      logros: [],
      proyectos: [],
      representante: "",
      socios: [],
      telefono: "",
      telefono_representante: "",
      tipo_organizacion: [],
      ubicacion: "",
      url_img: ""
    },
    nombre: "",
    area_trabajo: [],
    descripcion: "",
    email_encargado: "",
    email_institucion: "",
    funciones_en_municipio: [],
    funcion_en_municipio: "",
    logros: [],
    logro_en_municipio: "",
    proyectos: [],
    proyecto_en_municipio: "",
    representante: "",
    socios: [],
    socio_en_municipio: "",
    telefono: "",
    telefono_representante: "",
    tipo_organizacion: [],
    ubicacion: "",
    url_img: ""
  }),
  components: {
    firebase,
    firestore
  },
  directives: { mask },
  mounted: function() {
    M.AutoInit();
    //Hace que el Modal1 no se cierre si da click afuera
    var m = M.Modal.getInstance(modal_org);
    m.options.dismissible = false;
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
              url_img: doc.data().url_img
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
    },
    abrirModal() {
      M.Modal.getInstance(modal_org).open();
    },
    cerrarModal() {
      this.active = "deactive";
      this.nombre = "";
      this.area_trabajo = "";
      this.descripcion = "";
      this.email_encargado = "";
      this.email_institucion = "";
      this.funciones_en_municipio = [];
      this.logros = [];
      this.proyectos = [];
      this.representante = "";
      this.socios = [];
      this.telefono = "";
      this.telefono_representante = "";
      this.tipo_organizacion = [];
      this.ubicacion = "";
      this.url_img = "";
      this.logro_en_municipio = "";
      this.proyecto_en_municipio = "";
      this.socio_en_municipio = "";
      this.funcion_en_municipio = "";
      M.Modal.getInstance(modal_org).close();
    },
    mostrarOrganizacion() {
      this.active = "active";
      this.abrirModal();
      this.nombre = this.organizacion_actual.nombre;
      this.area_trabajo = this.organizacion_actual.area_trabajo;
      this.descripcion = this.organizacion_actual.descripcion;
      this.email_encargado = this.organizacion_actual.email_encargado;
      this.email_institucion = this.organizacion_actual.email_institucion;
      this.funciones_en_municipio = this.organizacion_actual.funciones_en_municipio;
      this.logros = this.organizacion_actual.logros;
      this.proyectos = this.organizacion_actual.proyectos;
      this.representante = this.organizacion_actual.representante;
      this.socios = this.organizacion_actual.socios;
      this.telefono = this.organizacion_actual.telefono;
      this.telefono_representante = this.organizacion_actual.telefono_representante;
      this.tipo_organizacion = this.organizacion_actual.tipo_organizacion;
      this.ubicacion = this.organizacion_actual.ubicacion;
      this.url_img = this.organizacion_actual.url_img;
      //Selección de los tipos de organización
      if (
        this.tipo_organizacion.includes(
          "Gobierno central (secretaria de estado)"
        )
      )
        this.t0 = true;
      else this.t0 = false;
      if (this.tipo_organizacion.includes("Gobierno Local (Municipalidad)"))
        this.t1 = true;
      else this.t1 = false;
      if (this.tipo_organizacion.includes("Micro y pequeña empresa"))
        this.t2 = true;
      else this.t2 = false;
      if (this.tipo_organizacion.includes("Cooperativa")) this.t3 = true;
      else this.t3 = false;
      if (this.tipo_organizacion.includes("Centro Educativo Público"))
        this.t4 = true;
      else this.t4 = false;
      if (this.tipo_organizacion.includes("Centro Educativo Privado"))
        this.t5 = true;
      else this.t5 = false;
      if (
        this.tipo_organizacion.includes(
          "Asociación de productores/empresarios/pobladores (cámaras de comercio, cámaras de turismo, patronatos)"
        )
      )
        this.t6 = true;
      else this.t6 = false;

      if (this.area_trabajo.includes("Económica")) this.a0 = true;
      else this.a0 = false;
      if (this.area_trabajo.includes("Social/Cultural")) this.a1 = true;
      else this.a1 = false;
      if (this.area_trabajo.includes("Educativa")) this.a2 = true;
      else this.a2 = false;
      if (this.area_trabajo.includes("Salud")) this.a3 = true;
      else this.a3 = false;
      if (this.area_trabajo.includes("Ambiental")) this.a4 = true;
      else this.a4 = false;
      if (this.area_trabajo.includes("Otra")) this.a5 = true;
      else this.a5 = false;

      //Pendiente para que se muestre de un sólo todo el texto dentro
      var txt = document.getElementsByTagName("textarea");
      txt.forEach(el => {
        el.style.cssText = "height:auto; padding:0";
      });
    },
    agregarOrganizacion() {
      this.abrirModal();
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

.bottom-sheet {
  max-height: 100% !important;
}

.bottom-sheet .modal.content {
  width: 60%;
  margin: 0px auto;
}
</style>