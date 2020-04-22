<template>
  <div class="about letra">
    <div class="fixed-action-btn" v-show="bandera_Log==true">
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
              data-tooltip="Agregar Imagen"
              href="#crear_noticia"
            >add</i>
          </a>
          <br />
          <a class="btn-floating green">
            <i
              v-show="bandera_Log==true"
              style="float:right"
              class="material-icons tooltipped"
              data-position="left"
              data-tooltip="Editar contenido"
              @click="Contenido_viejo = Contenido, Bandera_Mostrar = false"
            >create</i>
          </a>
        </li>
      </ul>
    </div>

    <center>
      <h2>
        <b>Con el apoyo de:</b>
      </h2>
    </center>

    <div class="carousel color2">
      <a class="carousel-item" href="#one!">
        <img width="300px" height="300px" v-bind:src="Imagenes[Imagenes.length-1].url" />
      </a>
      <a class="carousel-item" href="#one1!">
        <img width="300px" height="300px" v-bind:src="Imagenes[Imagenes.length-2].url" />
      </a>
      <a class="carousel-item" href="#one2!">
        <img width="300px" height="300px" v-bind:src="Imagenes[Imagenes.length-3].url" />
      </a>
      <a class="carousel-item" href="#one3!">
        <img width="300px" height="300px" v-bind:src="Imagenes[Imagenes.length-4].url" />
      </a>
      <a class="carousel-item" href="#one4!">
        <img width="300px" height="300px" v-bind:src="Imagenes[Imagenes.length-5].url" />
      </a>
    </div>
    <br />
    <i
      v-show="bandera_Log==true"
      style="float:right"
      class="material-icons"
      data-position="left"
      data-tooltip="Editar"
      @click="Contenido_viejo = Contenido, Bandera_Mostrar = false"
    >create</i>

    <br />

    <center>
      <center>
        <a
          v-show="Bandera_Mostrar == false"
          class="waves-effect waves-light btn red"
          @click="(Contenido = Contenido_viejo), (Bandera_Mostrar = true)"
        >
          <i class="material-icons left">cancel</i>
        </a> &nbsp;&nbsp;&nbsp;&nbsp;
        <a
          v-show="Bandera_Mostrar == false"
          class="waves-effect waves-light btn"
          @click="Update_Contenido()"
        >
          <i class="material-icons right">save</i>
        </a>
      </center>

      <div class="input-field col s8 contenido">
        <div v-show="Bandera_Mostrar == true">
          <textarea
            rows="60"
            cols="90"
            class="textarea_contenido tamano_contenido"
            readonly
            style="border: none;"
            v-model="Contenido"
            disabled
          ></textarea>
        </div>
        <div v-show="Bandera_Mostrar == false">
          <textarea
            rows="60"
            cols="90"
            class="textarea_contenido tamano_contenido"
            v-model="Contenido"
          ></textarea>
        </div>
      </div>
    </center>

    <!--ABOUT US MODAL PARA UPLOAD IMAGEN-->

    <!--INICIO DEL MODAL DE CREAR NOTICIAS-->
    <div id="crear_noticia" class="modal modal-fixed-footer letra">
      <div class="modal-content">
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

        <a class="waves-effect waves-light btn-large" @click="Add_Img()">
          <i class="material-icons right">cloud</i>Subir
        </a>
      </div>

      <div class="modal-footer">
        <a
          class="modal-close waves-effect waves-green btn-flat white-text text-accent-4 orange"
          @click="Imagen = 'http://www.globalservex.es/upload/news/news_12.png'"
        >Salir</a>
      </div>
    </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<style scoped></style>
<script>
import { firebase, database } from "../firebase";
import { firestore } from "firebase";
import { mapState, mapMutations } from "vuex";
export default {
  name: "noticias",
  data() {
    return {
      Bandera_Mostrar: true,
      Imagen: "http://www.globalservex.es/upload/news/news_12.png",
      Contenido: "hola",
      Contenido_viejo: "",
      ID: "",
      Imagenes: [
        "http://www.globalservex.es/upload/news/news_12.png",
        "http://www.globalservex.es/upload/news/news_12.png",
        "http://www.globalservex.es/upload/news/news_12.png",
        "http://www.globalservex.es/upload/news/news_12.png",
        "http://www.globalservex.es/upload/news/news_12.png",
        "http://www.globalservex.es/upload/news/news_12.png",
        "http://www.globalservex.es/upload/news/news_12.png"
      ]
    };
  },
  computed: {
    ...mapState(["bandera_Log"])
  },
  components: {
    firebase,
    database
  },
  mounted: function() {
    M.AutoInit();
    this.Get_Data();
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".carousel");
      var instances = M.Carousel.init(elems);
    });
    var instance = M.Carousel.init({
      fullWidth: true
    });
    var elems = document.querySelectorAll(".materialboxed");
    var instances = M.Materialbox.init(elems);
  },
  methods: {
    Update_Contenido() {
      firebase
        .firestore()
        .collection("AboutUs")
        .doc(this.ID)
        .update({
          Contenido: this.Contenido,
          Imagenes: this.Imagenes
        })
        .then(() => {
          console.log("Product successfully updated!");
          if (
            this.Imagen == "http://www.globalservex.es/upload/news/news_12.png"
          ) {
            this.Contenido_viejo = "";
            this.Bandera_Mostrar = true;
            M.toast({ html: "Contenido Actualizado exitosamente." });
          } else {
            M.toast({ html: "La imagen ha sido subida exitosamente." });
          }
          this.Imagen = "http://www.globalservex.es/upload/news/news_12.png";
        })
        .catch(error => {
          console.error("Error updating product: ", error);
        });
    },
    Add_Img() {
      if (this.Imagen != "http://www.globalservex.es/upload/news/news_12.png") {
        var file = this.$refs.myFiles.files[0];
        var storageRef = firebase.storage().ref();
        var tempUrl = "";
        storageRef
          .child("aboutus/" + file.name)
          .put(file)
          .then(() => {
            storageRef
              .child("aboutus/" + file.name)
              .getDownloadURL()
              .then(url => {
                tempUrl = url;
                console.log("Imagen guardada con link: ", tempUrl);
                this.Imagenes.push({
                  url: tempUrl,
                  fecha: new Date()
                });
                console.log("PUSHEADO: ", this.Imagenes);
                this.validation = "";
                this.Update_Contenido();
                //FIN DE ATUALIZAR INFO
              })
              .catch(function(error) {
                console.log("Error obteniendo imagen!.", error);
              });
          })
          .catch(function(error) {
            console.log("Error subiendo imagen!.");
          });
      } else {
        console.log("NO CAMBIO LA IMAGEN ANTES DE SUBIR");
        M.toast({ html: "No ha seleccionado ninguna imagen." });
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
    Get_Data() {
      firebase
        .firestore()
        .collection("AboutUs")
        .get()
        .then(snap => {
          snap.forEach(element => {
            this.Contenido = element.data().Contenido;
            this.Imagenes = element.data().Imagenes;
            this.ID = element.id;
          });
        })
        .catch(function(error) {
          console.log("Error getting Products: ", error);
        });
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Gelasio&display=swap");
.color2 {
  background-color: rgba(255, 255, 255, 0.6);
}
.letra {
  font-family: "Gelasio", serif;
}
.contenido {
  text-align: justify;
  font-size: 20px;
}
.textarea_contenido {
  background-color: rgba(255, 255, 255, 0.8);
  height: 400px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  font-family: "Gelasio", serif;
  color: black;
  font-size: 17pt;
}
.tamano_contenido {
  width: 80%;
  margin-left: 10%;
}
</style>