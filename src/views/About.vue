<template>
  <div class="about letra">
    <!-- Modal Trigger -->
    <a
      class="waves-effect waves-light btn modal-trigger"
      href="#crear_noticia"
      style="float:right"
    >Agregar imagen</a>
    <center><h2>Con el apoyo de:</h2></center>
    <div class="carousel white">
      <a class="carousel-item" href="#one!">
        <img width="300px" height="300px" v-bind:src="Imagenes[0]" />
      </a>
      <a class="carousel-item" href="#one3!">
        <img width="300px" height="300px" v-bind:src="Imagenes[1]" />
      </a>
      <a class="carousel-item" href="#one1!">
        <img width="300px" height="300px" v-bind:src="Imagenes[2]" />
      </a>
      <a class="carousel-item" href="#one2!">
        <img width="300px" height="300px" v-bind:src="Imagenes[3]" />
      </a>
    </div>
    <br />
   <center> <div class="input-field col s8 contenido">{{Contenido}}</div></center>

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

        <a class="waves-effect waves-light btn-large" @click=" Add_Img()">
          <i class="material-icons right">cloud</i>Subir
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

<style scoped></style>
<script>
import { firebase, database } from "../firebase";
import { firestore } from "firebase";
export default {
  name: "noticias",
  data() {
    return {
      Imagen: "http://www.globalservex.es/upload/news/news_12.png",
      Contenido: "hola",
      ID: "",
      Imagenes: [
        "http://www.globalservex.es/upload/news/news_12.png",
        "http://www.globalservex.es/upload/news/news_12.png",
        "http://www.globalservex.es/upload/news/news_12.png",
        "http://www.globalservex.es/upload/news/news_12.png"
      ]
    };
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
  },
  methods: {
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
                this.Imagenes.push(tempUrl);
                console.log("PUSHEADO: ", this.Imagenes);
                this.validation = "";
                //ACTUALIZANDO LA INFOR
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
                    M.toast({ html: "Imagen subida exitosamente." });
                    this.Imagen =
                      "http://www.globalservex.es/upload/news/news_12.png";
                  })
                  .catch(error => {
                    console.error("Error updating product: ", error);
                  });
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
.letra {
  font-family: "Gelasio", serif;
}
.contenido {
  text-align: justify;
  font-size: 20px;
  width: 80%;
}
</style>