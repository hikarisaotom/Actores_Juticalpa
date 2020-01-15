<template>
  <div class="organization">
    <br>
    <div class="row">
      <div class="col s4">
        <a class="waves-light btn-small col s12 green" @click="btn_agregar_organization()">
          <i class="material-icons left">add_box</i>
          Agregar Organización
        </a>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="modal1" class="modal modal-fixed-footer">
      <div class="modal-content">
        <p>Agregar Organización</p>
        <div class="row">
          <!-- INPUT de Nombre Organization-->
          <div class="input-field col s7">
            <i class="material-icons prefix">person</i>
            <input id="name_prefix" type="text" v-model="NOMBRE" />
            <label :class="active" for="name_prefix">
              <b class="blue-grey-text">Nombre de la organización</b>
            </label>
          </div>
          <!-- Input del telefono -->
          <div class="input-field col s5">
            <i class="material-icons prefix">phone</i>
            <input id="icon_telephone" type="tel" v-model="TELEFONO" class="validate" />
            <label for="icon_telephone">
              <b class="blue-grey-text">Telefono</b>
            </label>
          </div>
          <!-- Input del email -->
          <div class="input-field col s7">
            <i class="material-icons prefix">contact_mail</i>
            <input id="email" type="email" v-model="E_MAIL" />
            <label :class="active" for="email">
              <b class="blue-grey-text">Email</b>
            </label>
            <span class="helper-text" data-error="wrong" data-success="right"></span>
          </div>

          <!-- INPUT de Representante-->
          <div class="input-field col s7">
            <i class="material-icons prefix">person</i>
            <input id="representante_prefix" type="text" v-model="REPRESENTANTE" />
            <label :class="active" for="representante_prefix">
              <b class="blue-grey-text">Nombre del representante</b>
            </label>
          </div>
          <!-- Input del telefono representante-->
          <div class="input-field col s5">
            <i class="material-icons prefix">phone</i>
            <input
              id="icon_telephoneR"
              type="tel"
              v-model="TELEFONO_REPRESENTANTE"
              class="validate"
            />
            <label for="icon_telephoneR">
              <b class="blue-grey-text">Telefono Repre.</b>
            </label>
          </div>
          <!-- Input del email del representante -->
          <div class="input-field col s7">
            <i class="material-icons prefix">contact_mail</i>
            <input id="emailR" type="email" v-model="E_MAILR" />
            <label :class="active" for="emailR">
              <b class="blue-grey-text">Email Representante</b>
            </label>
            <span class="helper-text" data-error="wrong" data-success="right"></span>
          </div>

          <!-- INPUT de Socios-->
          <div class="input-field col s6">
            <i class="material-icons prefix">person</i>
            <input id="socios_prefix" type="text" v-model="SOCIOS" />
            <label :class="active" for="socios_prefix">
              <b class="blue-grey-text">Nombre de los socios</b>
            </label>
          </div>
          <!-- INPUT de Proyectos-->
          <div class="input-field col s6">
            <i class="material-icons prefix">person</i>
            <input id="proyectos_prefix" type="text" v-model="PROYECTOS" />
            <label :class="active" for="proyectos_prefix">
              <b class="blue-grey-text">Nombre de los proyectos</b>
            </label>
          </div>
          <!-- INPUT de Logros-->
          <div class="input-field col s6">
            <i class="material-icons prefix">person</i>
            <input id="logros_prefix" type="text" v-model="LOGROS" />
            <label :class="active" for="logros_prefix">
              <b class="blue-grey-text">Logros</b>
            </label>
          </div>
          <!-- INPUT de ubicación-->
          <div class="input-field col s6">
            <i class="material-icons prefix">person</i>
            <input id="ubicacion_prefix" type="text" v-model="UBICACION" />
            <label :class="active" for="ubicacion_prefix">
              <b class="blue-grey-text">Ubicación</b>
            </label>
          </div>

          <!-- INPUT de funciones-->
          <div class="input-field col s6">
            <i class="material-icons prefix">person</i>
            <input id="funciones_prefix" type="text" v-model="FUNCIONES" />
            <label :class="active" for="funciones_prefix">
              <b class="blue-grey-text">Funciones</b>
            </label>
          </div>
          <!-- INPUT de Imagen
          <div class="col s6">
            <img class="materialboxed" @click="open_img()" v-bind:src="imagen"
                id="organizacion_foto"/>
            <a href="#" @click="open_file_selector()">
                <center class="orange-text">
                    <b>Editar Imagen</b>
              </center>
            </a>               
            <input id="file-input" type="file"
                ref="myFiles" name="name"
                accept="image/x-png, image/gif, image/jpeg"
                style="display: none;"/>
          </div>-->
        </div>
        <!-- Input tipo de organización-->
        <div class="row">
          <div class="input-field col s10">
            <!--  <i class="material-icons prefix">person</i> NO SE MIRA BIEN -->
            <!-- Select de Payment -->
            <select multiple v-model="TIPO">
              <option value disabled>Escoge el tipo</option>
              <option value="Gobierno">Gobierno central (secretaria de estado)</option>
              <option value="Micro">Micro y pequeña empresa</option>
              <option value="Cooperativa">Cooperativa</option>
            </select>
            <label>
              <b class="blue-grey-text">Tipo de organizacón</b>
            </label>
          </div>
        </div>
        <!-- Input área de trabajo-->
        <div class="row">
          <div class="input-field col s10">
            <!--  <i class="material-icons prefix">person</i> NO SE MIRA BIEN -->
            <!-- Select de Payment -->
            <select multiple v-model="AREA">
              <option value disabled>Escoge el tipo</option>
              <option value="Economica">Económica</option>
              <option value="Social">Social/Cultural</option>
              <option value="Salud">Salud</option>
              <option value="Ambiental">Ambiental</option>
              <option value="Otra">Otra</option>
            </select>
            <label>
              <b class="blue-grey-text">Tipo de área de trabajo</b>
            </label>
          </div>
        </div>
        <div class="row">
          <!-- INPUT de descripcion-->
          <div class="input-field col s10">
            <i class="material-icons prefix">person</i>
            <input id="descripcion_prefix" type="text" v-model="DESCRIPCION" />
            <label :class="active" for="descripcion_prefix">
              <b class="blue-grey-text">Descripcion</b>
            </label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close white-text red btn-flat rigth">X</a>
      </div>
    </div>


    <!--<input placeholder="Search" v-model="filterOrganization"/>-->
    <div class="row" v-for="organization in organizations" :key="organization.ID"> 
      <div class="col s6">
          <br/>
          <div class="card">
          <div class="card-action">
            <p><b>Nombre: {{organization.NOMBRE}}</b></p>
        </div>
        <div class="card-content">
            Descripcion:{{organization.DESCRIPCION}}
            Ubicación: {{organization.UBICACION}}
          </div>
          </div>
          </div>
          
        </div>
      </div>
</template>

<script>
// @ is an alias to /src
import { firebase } from "../firebase";
import { firestore } from "firebase";
export default {
  name: "organization",
  data: () => ({
    filterOrganization: "",
    NOMBRE: "",
    REPRESENTANTE: "",
    SOCIOS: "",
    PROYECTOS: "",
    LOGROS: "",
    TELEFONO: "",
    TELEFONO_REPRESENTANTE: "",
    TIPO: [],
    UBICACION: "",
    AREA: [],
    E_MAIL: "",
    E_MAILR: "",
    FUNCIONES: "",
    URL: "",
    DESCRIPCION: "",
    active: "deactive",
    organizations: []
  }),
  mounted: function() {
    M.AutoInit();
    //Hace que el Modal1 no se cierre si da click afuera
    var m = M.Modal.getInstance(modal1);
    m.options.dismissible = false;
    this.get_Organizations();
  },
  computed:{
      filter: function() {
      return this.organizations.filter(organization => {
        return organizations.NOMBRE.toUpperCase().match(
          this.filterOrganization.toUpperCase()
        );
      });
    }
  },
  methods: {
    btn_agregar_organization() {
      M.Modal.getInstance(modal1).open();
      console.log("hay? ", this.organizations);
    },
    open_file_selector: function() {
      document.getElementById("file-input").click();
    },
    open_img() {
      var elems = document.querySelectorAll(".materialboxed");
      var instances = M.Materialbox.init(elems);
      instances.forEach(e => {
        e.open();
      });
    },

    get_Organizations() {
      console.log("here?");
      this.organizations = [],
        firebase
          .firestore()
          .collection("Actor")
          .get()
          .then(snap => {
            snap.forEach(element => {
              this.organizations.push({
                ID: element.id,
                NOMBRE: element.data().nombre,
                REPRESENTANTE: element.data().representante,
                DESCRIPCION: element.data().descripcion,
                E_MAIL: element.data().email_institucion,
                E_MAILR: element.data().email_encargado,
                TELEFONO: element.data().telefono,
                TELEFONO_REPRESENTANTE: element.data().telefono_representante,
                UBICACION: element.data().ubicacion,
                URL: element.data().url_img
              });
            });
          })
          .catch(error => {
            console.error("Error getting organizations: ", error);
          });
    }
  }
};
</script>