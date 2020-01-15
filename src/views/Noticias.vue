<template>
  <div class="about" height="100%">
    <a
      class="waves-effect waves-light btn-large modal-trigger"
      href="#crear_noticia"
      style="float:right"
    >Crear Noticia</a>

    <div v-for="noticia in noticias" :key="noticia.ID">
      <div class="row">
        <div class="col s12 m12">
          <div class="card letra">
            <div class="card-image">
              <table width="100%">
                <td width="10%" height="20%">
                    
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

            <div class="short">
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

  
<a class="waves-effect waves-light btn-large"   @click=" Add_Noticia()"><i class="material-icons right">cloud</i>button</a>
        
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
        var file = this.$refs.myFiles.files[0];
        var storageRef = firebase.storage().ref();
        var tempUrl="";
        storageRef
          .child("noticias/" + file.name)
          .put(file)
          .then(() => {
            storageRef
              .child("noticias/" + file.name)
              .getDownloadURL()
              .then(url => {
                  tempUrl=url;
                console.log("Imagen guardada con link: ", tempUrl);
        

                this.validation = "";

                firebase
                  .firestore()
                  .collection("Noticias")
                  .add({
                    Titulo: this.nuevo_titulo,
                    Contenido: this.nuevo_contenido,
                    Autor: "ANONIMO",
                    Imagen: tempUrl,
                    Fecha: new Date()
                  })
                  .then(doc => {
                    console.log("categoria ", this.type);
                    console.log("Agregado con Exito!", doc.id);

                   /* this.noticias.push({
                      ID: doc.id,
                      Titulo: this.nuevo_titulo,
                      Contenido: this.nuevo_contenido,
                      Autor: "ANONIMO",
                      Image: tempUrl
                    });*/
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
        .collection("Noticias")
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
</style>