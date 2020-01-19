<template>
  <div class="about" height="100%">
        <div class="fixed-action-btn"  v-show="bandera_Log==true">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">add_circle_outline</i>
        </a>
        <ul>
          <li></li>
          <li>
            <a class="btn-floating blue">
              <i
                class="material-icons tooltipped modal-trigger"
                data-position="left"
                 data-tooltip="Crear Noticia"
                href="#crear_noticia"
               
              >add_circle</i>
            </a>
          </li>
        </ul>
      </div>


 
    <div v-for="noticia in noticias" :key="noticia.ID">
   <div class="row position">
        <div class="col s10 m10 ">
          <div class="card letra grey lighten-3">
            <div class="card-image white">
              <table width="100%">
                <td width="30%" height="40%">
                  <img v-bind:src="noticia.Imagen" />
                </td>
                <td>
                  <b>
                    <h4>{{noticia.Titulo}}</h4>
                    <p class="blue-text">{{noticia.Autor}}</p>
                  </b>
                </td>
              </table>
            </div>

            <div class="short ">
              <p class="ellipsis">{{noticia.Contenido}}</p>
            </div>

            <div align="right">
              <a
                @click="noticia_actual=noticia"
                class="modal-trigger posicion"
                href="#noticia"
              >Seguir Leyendo....</a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!--INICIO DEL MODAL DE LAS NOTICIAS-->
    <div id="noticia" class="modal modal-fixed-footer letra">
      <div class="modal-content">
        <h3>{{noticia_actual.Titulo}}</h3>
        <p class="tamano2">Autor: {{noticia_actual.Autor}}</p>
        <br />
        <img v-bind:src="noticia_actual.Imagen" width="50%" height="50%" />
        <br />
        <br />
        <div class="contenido">{{ noticia_actual.Contenido}}</div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat">Salir</a>
      </div>
    </div>

    <!--INICIO DEL MODAL DE CREAR NOTICIAS-->
    <div id="crear_noticia" class="modal modal-fixed-footer letra">
      <div class="modal-content">
        <h3>Crear Noticia</h3>

        <div class="row">
          <div class="col s12">
            <div class="card red darken-2" v-if="validation!=''">
              <div class="card-content white-text">{{validation}}</div>
              <div class="card-action">
                <a href="#" @click="validation=''">Aceptar</a>
              </div>
            </div>
          </div>
        </div>

        <!--FORMULARIO DE INFORMACION DE LA NOTICIA-->
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input id="Titulo" type="text" v-model="nuevo_titulo" class="validate datos" />
              <label for="Titulo" class="orange-text text-accent-4">
                <h6>Titulo de la Noticia</h6>
              </label>
            </div>
            <div class="input-field col s12">
              <textarea id="Contenido" class="materialize-textarea datos" v-model="nuevo_contenido"></textarea>
              <label for="Contenido" class="orange-text text-accent-4">
                <h6>Contenido</h6>
              </label>
            </div>
          </div>
        </form>

        <!--IMAGEN DE LA NOTICIA-->
        <label class="active" for="card_img">
          <h5>
            <b class="orange-text text-accent-4">Imagen</b>
          </h5>
        </label>
        <div class="card" id="card_img">
          <div class="card-image" width="50%" height="50%">
            <img
              class="materialboxed"
              @click="open_img()"
              v-bind:src="Imagen"
              id="producto_foto"
              width="100px"
              height="300px"
            />
            <a @click="open_file_selector()">
              <center class="orange-text">
                <b>Adjuntar Imagen</b>
              </center>
            </a>
            <input
              id="file-input"
              type="file"
              ref="myFiles"
              @change="change_img()"
              name="name"
              accept="image/x-png, image/gif, image/jpeg"
              style="display: none;"
            />
          </div>
        </div>

        <a class="waves-effect waves-light btn-large" @click=" Add_Noticia()">
          <i class="material-icons right">save</i>Guardar
        </a>
      </div>

      <div class="modal-footer">
        <a
          class="modal-close waves-effect waves-green btn-flat white-text text-accent-4 orange"
        >Salir</a>
      </div>
    </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
import { firebase, database } from "../firebase";
import { firestore } from "firebase";
import { mapState, mapMutations } from "vuex";
export default {
  name: "noticias",
  data() {
    return {
      Imagen: "http://www.globalservex.es/upload/news/news_12.png",
      titulo: "",
      contenido: "",
      autor: "",
      noticias: [],
      noticia_actual: {},
      nuevo_titulo: "",
      nuevo_contenido: "",
      validation: "",
      mostrar_advertencia: false
    };
  },computed: {
    ...mapState(["bandera_Log"])
 
  },
  components: {
    firebase,
    database
  },
  mounted: function() {
    this.Get_News();
    M.AutoInit();
    //Hace que el de las noticias  no se cierre si da click afuera
    var m = M.Modal.getInstance(crear_noticia);
    m.options.dismissible = false;
     var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  },

  methods: {
    validate_form: function() {
      if (this.nuevo_titulo === "") {
        this.validation = "Debe ingresar un Titulo para la noticia. ";
      }

      if (this.nuevo_contenido === "") {
        this.validation = "\n Debe ingresar contenido para la La noticia.";
      }

      if (this.validation === "") {
        return true;
      } else {
        return false;
      }
    },
    Add_Noticia() {
      if (this.validate_form()) {
        if (
          this.Imagen != "http://www.globalservex.es/upload/news/news_12.png"
        ) {
          // SUBIO UNA IMAGEN
          var file = this.$refs.myFiles.files[0];
          var storageRef = firebase.storage().ref();
          var tempUrl = "";
          storageRef
            .child("noticias/" + file.name)
            .put(file)
            .then(() => {
              storageRef
                .child("noticias/" + file.name)
                .getDownloadURL()
                .then(url => {
                  tempUrl = url;
                  console.log("Imagen guardada con link: ", tempUrl);

                  this.validation = "";

                  firebase
                    .firestore()
                    .collection("Noticias")
                    .add({
                      Titulo: this.nuevo_titulo,
                      Contenido: this.nuevo_contenido,
                      Autor: window.localStorage.getItem("Organizacion"),
                      Imagen: tempUrl,
                      Fecha: new Date()
                    })
                    .then(doc => {
                      console.log("categoria ", this.type);
                      console.log("Agregado con Exito!", doc.id);
                      this.Get_News();

                      M.toast({ html: "Agregado correctamente." });
                      this.nuevo_titulo = "";
                      this.nuevo_contenido = "";
                      this.Imagen =
                        "http://www.globalservex.es/upload/news/news_12.png";
                    })
                    .catch(function(error) {
                      console.log("Error getting Classes: ", error);
                    });
                })
                .catch(function(error) {
                  console.log("Error obteniendo imagen!.", error);
                });
            })
            .catch(function(error) {
              console.log("Error subiendo imagen!.");
            });
        } else {
          // NO SUBIO NINGUNA IMAGEN
          console.log(
            "NO SELECCIONO UNA IMAGEN ANTES DE SUBIR, ENTONCES SE PONE POR DEFECTO"
          );
          firebase
            .firestore()
            .collection("Noticias")
            .add({
              Titulo: this.nuevo_titulo,
              Contenido: this.nuevo_contenido,
              Autor: "ANONIMO",
              Imagen: "http://www.globalservex.es/upload/news/news_12.png",
              Fecha: new Date()
            })
            .then(doc => {
              console.log("categoria ", this.type);
              console.log("Agregado con Exito!", doc.id);
              this.Get_News();

              M.toast({ html: "Agregado correctamente." });
              this.nuevo_titulo = "";
              this.nuevo_contenido = "";
              this.Imagen =
                "http://www.globalservex.es/upload/news/news_12.png";
            })
            .catch(function(error) {
              console.log("Error getting Classes: ", error);
            });
        }
      }
    },
    open_file_selector: function() {
      document.getElementById("file-input").click();
    },
    change_img: function() {
      var file = this.$refs.myFiles.files[0];
      this.Imagen = URL.createObjectURL(file);
    },
    open_img() {
      var elems = document.querySelectorAll(".materialboxed");
      var instances = M.Materialbox.init(elems);
      instances.forEach(e => {
        e.open();
      });
    },
    Get_News() {
      this.noticias = [];
      firebase
        .firestore()
        .collection("Noticias").orderBy("Fecha", "desc")
        .get()
        .then(snap => {
          snap.forEach(element => {
            this.noticias.push({
              ID: element.id,
              Titulo: element.data().Titulo,
              Contenido: element.data().Contenido,
              Autor: element.data().Autor,
              Imagen: element.data().Imagen
            });
          });
        })
        .catch(function(error) {
          console.log("Error getting Products: ", error);
        });
       /*  _.sortBy(this.products, [
              function(p) {
                return p.CATEGORY;
              }
            ]);*/
    }
  }
};
</script>
<style  scoped>
</style>

<style type="text/css">
@import url("https://fonts.googleapis.com/css?family=Gelasio&display=swap");
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.short {
  width: 90%;
  font-size: 20px;
}

.contenido {
  text-align: justify;
  font-size: 20px;
}
.letra {
  font-family: "Gelasio", serif;
}

.tamano2 {
  font-size: 15px;
  color: #616161;
}

.datos {
  font-size: 50px;
  font-family: "Gelasio", serif;
}

.position{
  margin-left: 20%;
}
</style>