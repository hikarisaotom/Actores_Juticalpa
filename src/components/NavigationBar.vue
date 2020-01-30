<template>
  <div class="letra">
    <div>
      <nav class="nav-extended grey darken-4" id="navigation_bar_logo">
        <div class="nav-wrapper" style="height:100px;">
          <!--p class="black-text">Bienvenido: {{usuario}}</p-->
          <!--a  class="brand-logo" PONER ESTO POR SI SE AGREGA UN LOGO-->
          <a class="brand-logo center">
            <b>Plataforma de Actores de Juticalpa</b>
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a
                v-show="bandera_Log == false"
                class="waves-effect waves-light modal-trigger enfasis"
                href="#login"
                >Log In</a
              >
              <a
                v-show="bandera_Log == true"
                class="waves-effect waves-light"
                @click="sign_out()"
                >Log out</a
              >
            </li>
          </ul>
        </div>
       
        <div class="nav-content">
          <ul class="tabs tabs-transparent">
            <li class="tab">
              <router-link to="/about">
                <b>Acerca de Nosotros</b>
              </router-link>
            </li>
            <li class="tab">
              <router-link to="/organizaciones">
                <b>Organizaciones</b>
              </router-link>
            </li>
            <li class="tab">
              <router-link to="/noticias">
                <b>Noticias</b>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div id="contenido">
      <router-view />
    </div>

    <!-- Modal Structure -->
    <div id="login" class="modal texto background2">
      <div class="modal-content">
        <div class="col s12 z-depth-6 card-panel login-opaco">
          <form class="login-form">
            <div class="row"></div>
            <div class="row">
              <div class="input-field col s12 m12 l12">
                <center>
                  <b>
                    <h3 class="blue-text">Log in</h3>
                  </b>
                </center>
                <center>
                  <!--img
                    src="https://cdn.jwplayer.com/v2/media/BMGOAvuU/poster.jpg?width=720"
                    width="30%"
                    height="40%"
                  /-->
                </center>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">mail_outline</i>
                <input
                  class="validate"
                  id="email"
                  v-model="email"
                  type="email"
                />
                <label
                  for="email"
                  style="font-size:20px;"
                  class="blue-text"
                  data-error="wrong"
                  data-success="right"
                  >Email</label
                >
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>
                <input
                  id="password"
                  v-model="password"
                  oncopy="return false"
                  onpaste="return false"
                  type="password"
                  v-on:keyup.enter="Sign_in"
                />
                <label class="blue-text" style="font-size:20px;" for="password"
                  >Password</label
                >
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <a
                  class="btn waves-effect waves-light col s12 blue"
                  @click="Sign_in()"
                  >Log in</a
                >
              </div>
            </div>
          </form>
          <center>
            <a href="#" class="blue-text flagmostrar">
              <b
                class="modal-trigger"
                href="#modal_restablecer_password"
                @click="limpiar()"
              >
                <h5>¿Olvido su contraseña?</h5>
              </b>
            </a>
          </center>
        </div>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="modal_restablecer_password" class="modal modal-fixed-footer">
      <div class="modal-content">
        <form id="app" action method="post">
          <h4 class="orange-text">Restablecer contraseña</h4>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mail_outline</i>
              <input
                disabled
                class="validate"
                id="restablecer_email"
                v-model="email"
                type="email"
                v-on:keyup.enter="find_employee"
              />
            </div>
          </div>
          <div class="row">
            <table width="100%">
              <td width="95%">
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock</i>
                  <input
                    id="nuevo_password"
                    type="password"
                    class="validate"
                    oncopy="return false"
                    onpaste="return false"
                    v-model="nuevo_password"
                    v-on:keyup.enter="find_employee"
                  />
                  <label :class="active" for="nuevo_password">
                    <b class="orange-text">Nuevo Password</b>
                  </label>
                </div>
              </td>
              <td width="5%" @click="show_password('nuevo_password')">
                <a href="#">
                  <i class="material-icons left">remove_red_eye</i>
                </a>
              </td>
            </table>
          </div>
          <div class="row">
            <table width="100%">
              <td width="95%">
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock</i>
                  <input
                    id="nuevo_password_copia"
                    type="password"
                    class="validate"
                    oncopy="return false"
                    onpaste="return false"
                    v-model="nuevo_password_copia"
                    v-on:keyup.enter="find_employee"
                  />
                  <label :class="active" for="nuevo_password_copia">
                    <b class="orange-text">Nuevo Password</b>
                  </label>
                </div>
              </td>
              <td width="5%" @click="show_password('nuevo_password_copia')">
                <a href="#">
                  <i class="material-icons left">remove_red_eye</i>
                </a>
              </td>
            </table>
          </div>
          <!-- RECUPERAR CONTRASEÑA FORM -->
          <div class="row">
            <div class="col s12">
              <div class="card red darken-2" v-if="validation != ''">
                <div class="card-content white-text">{{ validation }}</div>
                <div class="card-action">
                  <a href="#" @click="validation = ''">Aceptar</a>
                </div>
              </div>
            </div>
          </div>
        </form>
        <center>
          <a
            class="waves-light btn col s12 green accent-3"
            @click="find_employee()"
          >
            <i class="material-icons left">save</i>
            Cambiar
          </a>
        </center>
      </div>

      <div class="modal-footer">
        <a
          @click="salir()"
          class="modal-close white-text red lighten-1 btn-flat"
          >Salir</a
        >
      </div>
    </div>

    <!-- CODIGO DE RECUPERACION -->
    <div id="modal_update" class="modal">
      <div class="modal-content">
        <h4>
          <b class="orange-text">Confirmación:</b>
        </h4>
        <p>Ingrese el codigo de verificación en la caja de texto:</p>
        <center>
          <!--h4 oncopy="return false" onpaste="return false">{{ unic_key }}</h4-->
            <a v-show="mostrar_boton==true" class="green btn-flat white-text" @click="enviar(),mostrar_boton=false"
            >ENVIAR</a
          >
          <input
            width="40%"
            oncopy="return false"
            onpaste="return false"
            type="text"
            v-model="codigo_validacion"
            id="codigo_validacion"
            v-on:keyup.enter="update_password"
          />
          <a class="green btn-flat white-text" @click="update_password()"
            >Aceptar</a
          >
        </center>
      </div>
      <div class="modal-footer">
        <a class="red btn-flat white-text" @click="salir2()">Salir</a>
      </div>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>

<script>
import { firebase, database } from "../firebase";
//import { database } from "../firebase";
import { mapState, mapMutations } from "vuex";
import { mask } from "vue-the-mask";
export default {
  name: "navigation_bar",
  data: () => ({
    bgArray: [
      "https://www.itl.cat/pngfile/big/106-1060019_get-it-now-lord-shiva-facebook-cover-page.jpg",
      "http://staticpopopics.popopics.com/uploads/original/beautiful-hd-wallpaper-for-facebook-cover.jpg",
      "https://beinglol.com/media/facebook-cover/Sunset-facebook-covers-3236.jpeg"
    ],
    i: 0,
    email: "",
    password: "",
    validation: "",
    active: "deactive",
    restablecer_email: "",
    identificacion: "",
    nuevo_password: "",
    selected_employee: {},
    nuevo_password_copia: "",
    selected_: "",
    unic_key: "",
    codigo_validacion: "",
    num_intento: 0,
    role: "",
    usuario: "",
    organizacion: "",
    bandera_Log: false,
    mostrar_boton:false
  }),
  components: {
    firebase,
    database
  },
  directives: { mask },

  computed: {
    /*...mapState(["role"]),
    ...mapState(["usuario"]),
    ...mapState(["Organizacion"])*/
  },
  methods: {
    ...mapMutations(["cambiar_bandera"]),

    ChangeBackground() {
      var x = document.getElementById("navigation_bar_logo");
      x.style.backgroundImage = "url(" + this.bgArray[this.i] + ")";
      this.i = this.i + 1;
      setInterval(() => {
        if (this.i == this.bgArray.length) {
          this.i = 0;
        }
        var x = document.getElementById("navigation_bar_logo");
        x.style.backgroundImage = "url(" + this.bgArray[this.i] + ")";
        this.i = this.i + 1;
      }, 10000);
    },
    //ESTOS SON METODOS DEL LOG IN
    validatePassword: function(pass) {
      var re = /^(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;
      return re.test(String(pass));
    },
    validate_form: function() {
      if (
        this.email === "" ||
        this.nuevo_password === "" ||
        this.nuevo_password_copia === ""
      ) {
        this.validation = "No debe haber ningun campo vacío.";
        return false;
      } else if (this.nuevo_password != this.nuevo_password_copia) {
        this.validation = "Los passwords no coinciden";
        return false;
      } else if (this.validatePassword(this.nuevo_password) === false) {
        this.validation =
          "La contraseña debe tener:  " +
          "De 8 a 16 caracteres. " +
          "Al menos un número. ";
        return false;
      } else {
        this.identificacion = this.identificacion.replace(/[^\w\s]/gi, "");
        return true;
      }
    },
    salir() {
      M.Modal.getInstance(modal_restablecer_password).close();
      this.restablecer_email = "";
      this.identificacion = "";
      this.nuevo_password = "";
      this.nuevo_password_copia = "";
      M.updateTextFields();
    },
    salir2() {
      M.Modal.getInstance(modal_update).close();
      this.unic_key = "";
      this.codigo_validacion = "";
      M.updateTextFields();
      this.salir();
    },
    limpiar() {
      this.restablecer_email = "";
      this.identificacion = "";
      this.nuevo_password = "";
      this.nuevo_password_copia = "";
    },
    show_password: function(val) {
      var tipo = document.getElementById(val);
      if (tipo.type == "password") {
        tipo.type = "text";
      } else {
        tipo.type = "password";
      }
    },
    sign_out() {
      window.localStorage.removeItem("Role");
      window.localStorage.removeItem("usuario");
      window.localStorage.removeItem("Organizacion");
      window.localStorage.removeItem("login");
      this.usuario = "invitado";
      this.bandera_Log = false;
      console.log("SALIENDO LA BANDERA DEBERIA SER FALSE");
      this.$store.commit("cambiar_bandera", false);
      M.toast({
        html: "Saliendo del sistema..."
      });
    },
    traer() {
      console.log("VALOR DE LA BANDERA", window.localStorage.getItem("login"));
      if (window.localStorage.getItem("login") == "true") {
        this.role = window.localStorage.getItem("Role");
        this.usuario = window.localStorage.getItem("usuario");
        this.organizacion = window.localStorage.getItem("Organizacion");
        this.bandera_Log = true;
        console.log("AUTENTICADO, LOS DATOS DEBERIAN SER TRUE");
        this.$store.commit("cambiar_bandera", true);
      } else {
        this.role = "invitado";
        this.usuario = "invitado";
        this.organizacion = "invitado";
        this.bandera_Log = false;
        console.log("SIN AUTENTICAR, LOS DATOS DEBERIAN SER FALSE");
        this.$store.commit("cambiar_bandera", false);
      }
    },
    Sign_in() {
      if (localStorage.getItem("token") !== null) {
        localStorage.removeItem("token");
      }
      //Firebase
      if (!this.email) {
        M.toast({ html: "El correo electrónico es obligatorio" });
      } else if (!this.validEmail(this.email)) {
        M.toast({
          html: "Favor ingresar una dirección de correo electronico válida"
        });
        this.password = "";
      } else {
        console.log(this.email, "=>", this.password);
        database
          .collection("Actor")
          .get()
          .then(querySnapshot => {
            var found = false;

            querySnapshot.docs.forEach(doc => {
              if (this.email === doc.data().email_encargado) {
                if (this.password === doc.data().contrasena) {
                  found = true;
                  console.log("ENTRA");
                  window.localStorage.setItem("Role", doc.data().Role);
                  this.usuario = doc.data().nombre;
                  this.bandera_Log = true;
                  window.localStorage.setItem("usuario", doc.data().nombre);
                  window.localStorage.setItem(
                    "Organizacion",
                    doc.data().nombre
                  );
                  window.localStorage.setItem("login", true);
                  console.log("SE AUTENTICO DEBERIA SER TRUE");
                  this.$store.commit("cambiar_bandera", true);
                  M.toast({ html: "Bienvenido" });
                  M.Modal.getInstance(login).close();
                  this.email = "";
                  this.password = "";
                  M.Modal.getInstance(login).close();
                  localStorage.setItem("token", "abc");
                  (async () => {
                    let promise = new Promise((resolve, reject) => {
                      setTimeout(() => resolve("done!"), 1000);
                    });
                    let result = await promise;
                  })();
                } else {
                }
              } else {
              }
            }); //NO

            if (!found) {
              this.password = "";
              console.log("NO ENTRA");
              M.toast({ html: "Datos incorrectos" });
            } else {
            }
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      return re.test(email);
    },
    update_password() {
      if (this.unic_key == this.codigo_validacion) {
        firebase
          .firestore()
          .collection("Actor")
          .doc(this.selected_employee.ID)
          .update({
            /* area_trabajo:this.selected_employee.data.area_trabajo,
            descripcion:this.selected_employee.data.descripcion,
            email_encargado:this.selected_employee.data.email_encargado,
            email_institucion:this.selected_employee.data.email_institucion,
            funciones_en_municipio:this.selected_employee.data.funciones_en_municipio,
            logros:this.selected_employee.data.logros,
            nombre:this.selected_employee.data.nombre,
            proyectos:this.selected_employee.data.proyectos,
            representante:this.selected_employee.data.representante,
            socios:this.selected_employee.data.socios,
            telefono:this.selected_employee.data.telefono,
            telefono_representante:this.selected_employee.data.telefono_representante,
            tipo_organizacion:this.selected_employee.data.tipo_organizacion,
            ubicacion:this.selected_employee.data.ubicacion,
            url_img:this.selected_employee.data.url_img,*/

            contrasena: this.nuevo_password
          })
          .then(() => {
            console.log("Employee successfully updated!");
            M.toast({ html: "Actualización realizada correctamente." });
            this.salir2();
            this.num_intento = 0;
          })
          .catch(error => {
            console.error("Error updating Employee: ", error);
            M.toast({ html: "Se ha producido un error al actualizar." });
          });
      } else {
        M.toast({ html: "Codigo Invalido, intentelo de nuevo." });
        this.num_intento = this.num_intento + 1;
        if (this.num_intento > 4) {
          M.toast({
            html: "Se ha excedido el número de intento. Reiniciando proceso"
          });
          this.num_intento = 0;
          this.salir2();
        }
        this.unic_key = "";
        this.codigo_validacion = "";
        this.generate_code();
       this.enviar();
      }
    },
    find_employee: function() {
      if (this.validate_form()) {
        firebase
          .firestore()
          .collection("Actor")
          .get()
          .then(querySnapshot => {
            var found = false;
            var key = "";
            querySnapshot.docs.forEach(doc => {
              if (this.email === doc.data().email_encargado) {
                found = true;
                
                this.selected_employee = { ID: doc.id, data: doc.data() };
                
                this.unic_key = "";
                this.codigo_validacion = "";
                this.mostrar_boton=true;
                this.generate_code();
                M.Modal.getInstance(modal_update).open();
                
                return true;
              }
            });
            if (!found) {
              //this.password = "";
              M.toast({ html: "Datos incorrectos" });
              this.num_intento = this.num_intento + 1;
              if (this.num_intento > 4) {
                M.toast({
                  html:
                    "Se ha excedido el número de intento. Reiniciando proceso"
                });
                this.num_intento = 0;
                this.salir2();
              }
            } else {
            }
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      } //fin del if
      return false;
    },
    generate_code() {
      var chars = "0123456789abcdefABCDEFGIJKLMNOPQRSTUVWXYZ";
      var lon = 5;
      var code = "";
      var x = 0;
      for (x = 0; x < lon; x++) {
        var rand = Math.floor(Math.random() * chars.length);
        code += chars.substr(rand, 1);
      }
      this.unic_key = code;
     
    },

  enviar() {
      let data = {
      to_email: this.email,
      code:this.unic_key
      };

      emailjs.send("gmail", "template_i8sJz3O3", data).then(
        function(response) {
          if (response.text === "OK") {
           M.toast({
                  html:
                    "El codigo se ha enviado exitosamente a su bandeja de entrada"
                });
          }
          console.log(
            "SUCCESS. status=%d, text=%s",
            response.status,
            response.text
          );
        },
        function(err) {
          M.toast({
                  html:
                    "Se ha producido un error, el mensaje no se ha enviado"
                });
          console.log("FAILED. error=", err);
        }
      );
    }
  
  },
  mounted: function() {
    M.AutoInit();
    this.ChangeBackground();
    this.traer();

    /*
 var m = M.Modal.getInstance(modal_restablecer_password);
    m.options.dismissible = false;
    var m1 = M.Modal.getInstance(modal_update);
    m1.options.dismissible = false;*/
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Gelasio&display=swap");
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

.letra {
  font-family: "Gelasio", serif;
}
.enfasis {
  font-size: 20px;
}
#navigation_bar_logo {
  transition: background 1s;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#contenido {
  height: 700px;
  overflow: auto;
  /*background-color:#f3f3e3 ;*/
  background-image: url(https://avante.biz/wp-content/uploads/Minimal-Wallpaper/Minimal-Wallpaper-001.jpg);
}
.background2 {
  background-image: url(https://diarioroatan.com/wp-content/uploads/2019/10/asas-187.jpg);
}
.login-opaco {
  background-color: rgba(255, 255, 255, 0.7);
}
.x {
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}

@import url("https://fonts.googleapis.com/css?family=Julius+Sans+One&display=swap");
@import url("https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap");
#login-page {
  font-family: "Gelasio", serif;
  width: 500px;
}

.card {
  font-family: "Gelasio", serif;
  position: absolute;
  left: 50%;
  top: 50%;
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.otra_fuente {
  font-family: "Press Start 2P", cursive;
}

.arriba {
  z-index: -1;
}
</style>
