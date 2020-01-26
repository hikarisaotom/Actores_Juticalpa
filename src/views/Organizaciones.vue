<template>
  <div class="organizaciones">
    <br />
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">mode_edit</i>
      </a>
      <ul>
        <li>
          <a class="btn-floating green" @click="agregarOrganizacion();">
            <i class="material-icons">add</i>
          </a>
        </li>
      </ul>
    </div>

    <!--Cards de las organizaciones-->
    <div class="row">
      <div class="col s12 m3 l2" v-for="organizacion in organizaciones" :key="organizacion.id">
        <div class="card">
          <div class="card-image">
            <img
              :src="organizacion.url_img"
              style="display: block;
              margin-left: auto;
              margin-right: auto;
              width: 100%;
              height: 150px"
            />
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

    <!--Input File-->
    <input
      id="file-input"
      :disabled="editarBtn==false"
      type="file"
      ref="myFiles"
      @change="changeImg()"
      name="name"
      accept="image/x-png, image/gif, image/jpeg"
      style="display: none;"
    />

    <!--Modal de Organizacion-->
    <div id="modal_org" class="modal bottom-sheet">
      <div class="modal-content" v-if="loader==true">
        <loading></loading>
      </div>
      <div class="modal-content" v-if="loader==false">
        <div class="row">
          <div class="cols s12 m12 l12">
            <nav>
              <div class="nav-wrapper grey darken-3">
                <a href="#" class="brand-logo">{{nombre}}</a>
              </div>
            </nav>
          </div>
          <br />
          <div class="cols s6 m6 l6">
            <a
              class="waves-effect waves-light btn orange left"
              href="#"
              @click="editar_Organizacion(); edicion=true"
              v-if="edit==true"
            >
              <i class="material-icons white-text left">edit</i>
              <span class="white-text">Editar</span>
            </a>
          </div>
          <div class="cols s6 m6 l6">
            <a
              class="waves-effect waves-light btn red right"
              href="#"
              @click="delete_Organizacion()"
              v-if="edit==true"
            >
              <i class="material-icons white-text right">delete_forever</i>
              <span class="white-text">Eliminar</span>
            </a>
          </div>
        </div>
        <div class="row">
          <div class="cols s12">
            <a v-if="edit==false" class="waves-light btn-small green btn-block" @click="ejecutar()">
              <i class="material-icons left">save</i>
              Guardar
              <i class="material-icons right">save</i>
            </a>
          </div>
        </div>
        <div class="row">
          <div class="row">
            <!--Nombre y Descripcion-->
            <div class="card blue-grey darken-1 col s12 m6 l6 z-depth-5" id="nombre_desc">
              <div class="card-content white-text">
                <div class="input-field">
                  <i class="material-icons prefix">face</i>
                  <input
                    :disabled="editar"
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
                    :disabled="editar"
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
              <div class="card-image waves-effect waves-block waves-light">
                <a href="#" @click="openIMG()">
                  <img
                    class="materialboxed"
                    :src="url_img"
                    style="display: block;
                  margin-left: auto;
                  margin-right: auto;
                  width: 100%;
                  height: 300px"
                  />
                </a>
              </div>
              <div class="card-content" v-show="editarBtn">
                <a href="#" @click="openFileSelector()">
                  <i class="material-icons orange-text left">edit</i>
                </a>
                <a href="#">
                  <i
                    class="material-icons red-text right"
                    @click="url_img='https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'"
                  >delete_forever</i>
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
                  :disabled="editar"
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
                  :disabled="editar"
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
                  :disabled="editar"
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
                  :disabled="editar"
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
                  :disabled="editar"
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
                  :disabled="editar"
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
                        <input v-model="t0" type="checkbox" :disabled="editar" />
                        <span class="white-text">Gobierno central (secretaria de estado)</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t1" type="checkbox" :disabled="editar" />
                        <span class="white-text">Gobierno Local (Municipalidad)</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t2" type="checkbox" :disabled="editar" />
                        <span class="white-text">Micro y pequeña empresa</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t3" type="checkbox" :disabled="editar" />
                        <span class="white-text">Cooperativa</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t4" type="checkbox" :disabled="editar" />
                        <span class="white-text">Centro Educativo Público</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t5" type="checkbox" :disabled="editar" />
                        <span class="white-text">Centro Educativo Privado</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="t6" type="checkbox" :disabled="editar" />
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
                <span class="card-title white-text">Área de Trabajo</span>
                <!--Ubicación de Institución-->
                <div align="left">
                  <form action="#">
                    <p>
                      <label>
                        <input v-model="a0" type="checkbox" :disabled="editar" />
                        <span class="white-text">Económica</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a1" type="checkbox" :disabled="editar" />
                        <span class="white-text">Social/Cultural</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a2" type="checkbox" :disabled="editar" />
                        <span class="white-text">Educativa</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a3" type="checkbox" :disabled="editar" />
                        <span class="white-text">Salud</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a4" type="checkbox" :disabled="editar" />
                        <span class="white-text">Ambiental</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input v-model="a5" type="checkbox" :disabled="editar" />
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
                    <a href="#!" v-show="editarBtn" @click="delete_elemento(funcion, 1)">
                      <i class="red-text material-icons right">delete_forever</i>
                    </a>
                  </span>
                  {{funcion}}
                </p>
              </div>
              <table width="100%" v-show="editarBtn">
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
                  <a href="#!" @click="agregar_elemento(1)">
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
                    <a href="#!" v-show="editarBtn" @click="delete_elemento(logro, 2)">
                      <i class="red-text material-icons right">delete_forever</i>
                    </a>
                  </span>
                  {{logro}}
                </p>
              </div>
              <table width="100%" v-show="editarBtn">
                <td width="95%">
                  <div class="input-field">
                    <input
                      v-model="logro_en_municipio"
                      id="logro_org"
                      type="text"
                      class="materialize-textarea white-text"
                    />
                    <label for="logro_org">Nuevo Logro</label>
                  </div>
                </td>
                <td width="5%>" @click="agregar_elemento(2)">
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
                <p
                  class="collection-item"
                  v-for="proyecto in proyectos"
                  :key="proyecto.nombre_proyecto"
                >
                  <span class="badge">
                    <a href="#!" v-show="editarBtn" @click="delete_elemento(proyecto, 3)">
                      <i class="red-text material-icons right">delete_forever</i>
                    </a>
                  </span>
                  <b>Nombre:</b>
                  {{proyecto.nombre_proyecto}},
                  <b>Descripción:</b>
                  {{proyecto.descripción_proyecto}}
                </p>
              </div>
              <table width="100%" v-show="editarBtn">
                <td width="47%">
                  <div class="input-field">
                    <input
                      v-model="proyecto_en_municipio"
                      id="proyecto_org"
                      type="text"
                      class="materialize-textarea white-text"
                    />
                    <label for="proyecto_org">Nombre Proyecto</label>
                  </div>
                </td>
                <td width="47%">
                  <div class="input-field s12 m6 l6">
                    <input
                      v-model="proyecto_en_municipioD"
                      id="proyecto_orgD"
                      type="text"
                      class="materialize-textarea white-text"
                    />
                    <label for="proyecto_orgD">Descripción Proyecto</label>
                  </div>
                </td>
                <td width="6%>">
                  <a href="#!" @click="agregar_elemento(3)">
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
                    <a href="#!" v-show="editarBtn" @click="delete_elemento(socio, 4)">
                      <i class="red-text material-icons right">delete_forever</i>
                    </a>
                  </span>
                  {{socio}}
                </p>
              </div>
              <table width="100%" v-show="editarBtn">
                <td width="95%">
                  <div class="input-field">
                    <input
                      v-model="socio_en_municipio"
                      id="socio_org"
                      type="text"
                      class="materialize-textarea white-text"
                    />
                    <label for="socio_org">Nuevo Socio</label>
                  </div>
                </td>
                <td width="5%>">
                  <a href="#!" @click="agregar_elemento(4)">
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
    <loading v-if="loader==true"></loading>
  </div>
</template>

<script>
import loading from "../components/Loading.vue";
import "firebase/storage"; // <----
import { firebase } from "../firebase";
import { firestore } from "../firebase";
import { mask } from "vue-the-mask";
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    //Elementos de Interacción
    edicion: false,
    loader: false,
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
      id: "",
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
    id: "",
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
    proyecto_en_municipioD: "",
    representante: "",
    socios: [],
    socio_en_municipio: "",
    telefono: "",
    telefono_representante: "",
    tipo_organizacion: [],
    ubicacion: "",
    url_img: "",
    /*banderas*/
    editar: true,
    editarBtn: false,
    edit: false
  }),
  computed: {
    ...mapState(["bandera_Log"])
  },
  components: {
    firebase,
    firestore,
    loading
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
      this.loader = true;
      firestore
        .collection("Actor")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            //console.log(doc.id, " => ", doc.data());
            this.organizaciones.push({
              id: doc.id,
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
          this.loader = false;
        })
        .catch(function(error) {
          this.loader = false;
          console.log("Error getting Organizaciones: ", error);
        });
    },
    abrirModal() {
      M.Modal.getInstance(modal_org).open();
    },
    openFileSelector() {
      document.getElementById("file-input").click();
    },
    openIMG() {
      var elems = document.querySelectorAll(".materialboxed");
      var instances = M.Materialbox.init(elems);
      instances.forEach(e => {
        e.open();
      });
    },
    changeImg() {
      var file = this.$refs.myFiles.files[0];
      this.url_img = URL.createObjectURL(file);
    },
    deleteIMG() {
      // Delete the file
      if (
        this.organizacion_actual.url_img ===
        "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
      ) {
        this.guardar_Cambios();
      } else {
        console.log("Entra Borrar IMG");
        var storage = firebase.storage();
        const u = this.organizacion_actual.url_img;
        console.log(u);
        var desertRef = storage.refFromURL(u);
        desertRef
          .delete()
          .then(() => {
            console.log("Borrado");
            this.guardar_Cambios();
          })
          .catch(error => {
            console.log("Uh-oh, an error occurred!", error);
            this.loader = false;
            M.toast({ html: "Actualización no realizada. Intente de Nuevo." });
          });
      }
    },
    editarImg() {
      this.loader = true;
      if (this.url_img != this.organizacion_actual.url_img) {
        if (
          this.url_img ===
          "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
        ) {
          this.deleteIMG();
        } else {
          console.log("Entra IF");
          var file = this.$refs.myFiles.files[0];
          var storage = firebase.storage();
          var storageRef = storage.ref();
          storageRef
            .child("organizaciones_img/" + file.name)
            .put(file)
            .then(() => {
              storageRef
                .child("organizaciones_img/" + file.name)
                .getDownloadURL()
                .then(url => {
                  this.url_img = url;
                  this.deleteIMG();
                })
                .catch(error => {
                  console.log("Error obteniendo imagen!.", error);
                  this.loader = false;
                  M.toast({
                    html: "Actualización no realizada. Intente de Nuevo."
                  });
                });
            })
            .catch(function(error) {
              console.log("Error subiendo imagen!.");
            });
        }
      } else {
        console.log("Entra ELSE");
        this.guardar_Cambios();
      }
    },
    cerrarModal() {
      this.loader = false;
      this.editarBtn = false;
      this.editar = true;
      this.edit = false;
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
      this.proyecto_en_municipioD = "";
      this.socio_en_municipio = "";
      this.funcion_en_municipio = "";
      M.Modal.getInstance(modal_org).close();
    },
    mostrarOrganizacion() {
      this.active = "active";
      this.editarBtn = false;
      this.editar = true;
      this.edit = true;
      this.abrirModal();
      this.id = this.organizacion_actual.id;
      this.nombre = this.organizacion_actual.nombre;
      this.area_trabajo = this.organizacion_actual.area_trabajo;
      this.descripcion = this.organizacion_actual.descripcion;
      this.email_encargado = this.organizacion_actual.email_encargado;
      this.email_institucion = this.organizacion_actual.email_institucion;
      /*arreglos*/
      //this.funciones_en_municipio = this.organizacion_actual.funciones_en_municipio;
      //la linea anterior no funciona porque al eliminar borra la referencia del el elemento actual

      for (
        let index = 0;
        index < this.organizacion_actual.funciones_en_municipio.length;
        index++
      ) {
        this.funciones_en_municipio.push(
          this.organizacion_actual.funciones_en_municipio[index]
        );
      }

      for (
        let index = 0;
        index < this.organizacion_actual.logros.length;
        index++
      ) {
        this.logros.push(this.organizacion_actual.logros[index]);
      }

      for (
        let index = 0;
        index < this.organizacion_actual.proyectos.length;
        index++
      ) {
        this.proyectos.push(this.organizacion_actual.proyectos[index]);
      }

      for (
        let index = 0;
        index < this.organizacion_actual.socios.length;
        index++
      ) {
        this.socios.push(this.organizacion_actual.socios[index]);
      }
      //*fin */
      this.representante = this.organizacion_actual.representante;
      this.telefono = this.organizacion_actual.telefono;
      this.telefono_representante = this.organizacion_actual.telefono_representante;
      this.tipo_organizacion = this.organizacion_actual.tipo_organizacion;
      this.ubicacion = this.organizacion_actual.ubicacion;
      this.url_img = this.organizacion_actual.url_img;
      console.log(this.url_img);
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
      this.edicion = false;
      this.editar = false;
      this.editarBtn = true;
      this.url_img =
        "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
    },
    editar_Organizacion() {
      this.editar = false;
      this.editarBtn = true;
      this.edit = false;
    },
    guardar_Cambios() {
      //tipo de organizacion
      var tipoOrg = [];
      if (this.t0 === true) {
        tipoOrg.push("Gobierno central (secretaria de estado)");
      }
      if (this.t1 === true) {
        tipoOrg.push("Gobierno Local (Municipalidad)");
      }
      if (this.t2 === true) {
        tipoOrg.push("Micro y pequeña empresa");
      }
      if (this.t3 === true) {
        tipoOrg.push("Cooperativa");
      }
      if (this.t4 === true) {
        tipoOrg.push("Centro Educativo Público");
      }
      if (this.t5 === true) {
        tipoOrg.push("Centro Educativo Privado");
      }
      if (this.t6 === true) {
        tipoOrg.push(
          "Asociación de productores/empresarios/pobladores (cámaras de comercio, cámaras de turismo, patronatos)"
        );
      }

      /*área de trabajo */
      var areaOrg = [];
      if (this.a0 === true) {
        areaOrg.push("Económica");
      }
      if (this.a1 === true) {
        areaOrg.push("Social/Cultural");
      }
      if (this.a2 === true) {
        areaOrg.push("Educativa");
      }
      if (this.a3 === true) {
        areaOrg.push("Salud");
      }
      if (this.a4 === true) {
        areaOrg.push("Ambiental");
      }
      if (this.a5 === true) {
        areaOrg.push("Otra");
      }
      firebase
        .firestore()
        .collection("Actor")
        .doc(this.organizacion_actual.id)
        .update({
          nombre: this.nombre,
          area_trabajo: areaOrg,
          descripcion: this.descripcion,
          email_encargado: this.email_encargado,
          email_institucion: this.email_institucion,
          funciones_en_municipio: this.funciones_en_municipio,
          logros: this.logros,
          proyectos: this.proyectos,
          representante: this.representante,
          socios: this.socios,
          telefono: this.telefono,
          telefono_representante: this.telefono_representante,
          tipo_organizacion: tipoOrg,
          ubicacion: this.ubicacion,
          url_img: this.url_img
        })
        .then(() => {
          this.edit = true;
          this.editar = true;
          this.editarBtn = false;
          /*organizacion actual*/
          this.organizacion_actual.nombre = this.nombre;
          this.organizacion_actual.area_trabajo = areaOrg;
          this.organizacion_actual.descripcion = this.descripcion;
          this.organizacion_actual.email_encargado = this.email_encargado;
          this.organizacion_actual.email_institucion = this.email_encargado;
          this.organizacion_actual.funciones_en_municipio = this.funciones_en_municipio;
          this.organizacion_actual.logros = this.logros;
          this.organizacion_actual.proyectos = this.proyectos;
          this.organizacion_actual.representante = this.representante;
          this.organizacion_actual.socios = this.socios;
          this.organizacion_actual.telefono = this.telefono;
          this.organizacion_actual.telefono_representante = this.telefono_representante;
          this.organizacion_actual.tipo_organizacion = tipoOrg;
          this.organizacion_actual.ubicacion = this.ubicacion;
          this.organizacion_actual.url_img = this.url_img;

          console.log("Organization successfully updated!");
          this.loader = false;
          M.toast({ html: "Actualización realizada correctamente." });
        })
        .catch(error => {
          this.loader = false;
          M.toast({ html: "Actualización no realizada. Intente de Nuevo." });
        });
    },
    delete_elemento(elemento, opcion) {
      if (opcion == 1) {
        this.funciones_en_municipio.splice(
          this.funciones_en_municipio.indexOf(elemento),
          1
        );
        M.toast({ html: "Eliminado." });
      } else if (opcion == 2) {
        this.logros.splice(this.logros.indexOf(elemento), 1);
        M.toast({ html: "Eliminado." });
      } else if (opcion == 3) {
        this.proyectos.splice(this.proyectos.indexOf(elemento), 1);
        M.toast({ html: "Eliminado." });
      } else if (opcion == 4) {
        this.socios.splice(this.socios.indexOf(elemento), 1);
        M.toast({ html: "Eliminado." });
      }
    },
    agregar_elemento(opcion) {
      if (opcion == 1) {
        this.funciones_en_municipio.push(this.funcion_en_municipio);
        this.funcion_en_municipio = "";
        M.toast({ html: "Agregado." });
      } else if (opcion == 2) {
        this.logros.push(this.logro_en_municipio);
        this.logro_en_municipio = "";
        M.toast({ html: "Agregado." });
      } else if (opcion == 3) {
        this.proyectos.push({
          descripción_proyecto: this.proyecto_en_municipioD,
          nombre_proyecto: this.proyecto_en_municipio
        });
        this.proyecto_en_municipio = "";
        this.proyecto_en_municipioD = "";
        M.toast({ html: "Agregado." });
      } else if (opcion == 4) {
        this.socios.push(this.socio_en_municipio);
        this.socio_en_municipio = "";
        M.toast({ html: "Agregado." });
      }
    },
    delete_Organizacion() {
      this.loader = true;
      /*Al eliminar la organizacion, no se borra la imagen HACERLO DESPUES*/
      firebase
        .firestore()
        .collection("Actor")
        .doc(this.organizacion_actual.id)
        .delete()
        .then(error => {
          this.organizaciones.splice(
            this.organizaciones.indexOf(this.organizacion_actual),
            1
          );
          this.loader = false;
          M.toast({ html: "Organización eliminada." });
          this.cerrarModal();
        })
        .catch(error => {
          this.loader = false;
          M.toast({ html: "Error eliminando Organización." });
          this.cerrarModal();
        });
    },
    ejecutar() {
      if (this.edicion == true) {
        this.editarImg();
      } else {
        this.addOrganizacion();
      }
    },
    addOrganizacion() {
      this.loader = true;
      //tipo de organizacion
      var tipoOrg = [];
      if (this.t0 === true) {
        tipoOrg.push("Gobierno central (secretaria de estado)");
      }
      if (this.t1 === true) {
        tipoOrg.push("Gobierno Local (Municipalidad)");
      }
      if (this.t2 === true) {
        tipoOrg.push("Micro y pequeña empresa");
      }
      if (this.t3 === true) {
        tipoOrg.push("Cooperativa");
      }
      if (this.t4 === true) {
        tipoOrg.push("Centro Educativo Público");
      }
      if (this.t5 === true) {
        tipoOrg.push("Centro Educativo Privado");
      }
      if (this.t6 === true) {
        tipoOrg.push(
          "Asociación de productores/empresarios/pobladores (cámaras de comercio, cámaras de turismo, patronatos)"
        );
      }

      /*área de trabajo */
      var areaOrg = [];
      if (this.a0 === true) {
        areaOrg.push("Económica");
      }
      if (this.a1 === true) {
        areaOrg.push("Social/Cultural");
      }
      if (this.a2 === true) {
        areaOrg.push("Educativa");
      }
      if (this.a3 === true) {
        areaOrg.push("Salud");
      }
      if (this.a4 === true) {
        areaOrg.push("Ambiental");
      }
      if (this.a5 === true) {
        areaOrg.push("Otra");
      }
      if (
        this.url_img !=
        "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
      ) {
        var file = this.$refs.myFiles.files[0];
        var storage = firebase.storage();
        var storageRef = storage.ref();
        storageRef
          .child("organizaciones_img/" + file.name)
          .put(file)
          .then(() => {
            storageRef
              .child("organizaciones_img/" + file.name)
              .getDownloadURL()
              .then(url => {
                this.url_img = url;
                this.add(areaOrg, tipoOrg);
              })
              .catch(error => {
                console.log("Error obteniendo imagen!.", error);
                this.loader = false;
                M.toast({
                  html: "Actualización no realizada. Intente de Nuevo."
                });
              });
          })
          .catch(function(error) {
            console.log("Error subiendo imagen!.");
          });
      } else {
        this.add(areaOrg, tipoOrg);
      }
    },
    add(areaOrg, tipoOrg) {
      firebase
        .firestore()
        .collection("Actor")
        .add({
          nombre: this.nombre,
          area_trabajo: areaOrg,
          descripcion: this.descripcion,
          email_encargado: this.email_encargado,
          email_institucion: this.email_institucion,
          funciones_en_municipio: this.funciones_en_municipio,
          logros: this.logros,
          proyectos: this.proyectos,
          representante: this.representante,
          socios: this.socios,
          telefono: this.telefono,
          telefono_representante: this.telefono_representante,
          tipo_organizacion: tipoOrg,
          ubicacion: this.ubicacion,
          url_img: this.url_img
        })
        .then(doc => {
          this.edit = true;
          this.editar = true;
          this.editarBtn = false;
          /*organizacion actual*/
          this.organizacion_actual.id = doc.id;
          this.organizacion_actual.nombre = this.nombre;
          this.organizacion_actual.area_trabajo = areaOrg;
          this.organizacion_actual.descripcion = this.descripcion;
          this.organizacion_actual.email_encargado = this.email_encargado;
          this.organizacion_actual.email_institucion = this.email_encargado;
          this.organizacion_actual.funciones_en_municipio = this.funciones_en_municipio;
          this.organizacion_actual.logros = this.logros;
          this.organizacion_actual.proyectos = this.proyectos;
          this.organizacion_actual.representante = this.representante;
          this.organizacion_actual.socios = this.socios;
          this.organizacion_actual.telefono = this.telefono;
          this.organizacion_actual.telefono_representante = this.telefono_representante;
          this.organizacion_actual.tipo_organizacion = tipoOrg;
          this.organizacion_actual.ubicacion = this.ubicacion;
          this.organizacion_actual.url_img = this.url_img;
          this.organizaciones.push(this.organizacion_actual);
          this.cerrarModal();
          console.log("Organization successfully updated!");
          this.loader = false;
          M.toast({ html: "Organización agregada correctamente." });
        })
        .catch(error => {
          console.log("Error Agregando Organización. Intente de Nuevo.", error);
          this.loader = false;
          M.toast({ html: "Error Agregando Organización. Intente de Nuevo." });
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

.bottom-sheet {
  max-height: 100% !important;
}

.bottom-sheet .modal.content {
  width: 60%;
  margin: 0px auto;
}
</style>
