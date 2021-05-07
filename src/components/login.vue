<template>
  <div id="login-page" class="row">
    <div class="col s12 z-depth-6 card-panel arriba">
      <form class="login-form">
        <div class="row"></div>
        <div class="row">
          <div class="input-field brown-text col s12 m12 l12 login-text">
            <center>
              <img
                src="https://cdn.jwplayer.com/v2/media/BMGOAvuU/poster.jpg?width=720"
                width="30%"
                height="40%"
              />
            </center>
            <center>
              <label>
                <h4>Log in</h4>
              </label>
            </center>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">mail_outline</i>
            <input class="validate" id="email" v-model="email" type="email" />
            <label for="email" data-error="wrong" data-success="right">Email</label>
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
            <label for="password">Password</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <a class="btn waves-effect waves-light col s12 brown" @click="Sign_in()">Login</a>
          </div>
        </div>
      </form>
    </div>
    <center>
      <a href="#" class="brown-text flagmostrar">
        <b
          class="modal-trigger"
          href="#modal_restablecer_password"
          @click=" limpiar()"
        >¿Restablecer contraseña?</b>
      </a>
    </center>
    <!-- Modal Structure -->
    <div id="modal_restablecer_password" class="modal modal-fixed-footer">
      <div class="modal-content">
        <form id="app" action method="post">
          <h4 class="orange-text">Restablecer contraseña</h4>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mail_outline</i>
              <input
                class="validate"
                id="restablecer_email"
                v-model="restablecer_email"
                type="email"
                v-on:keyup.enter="find_employee"
              />
              <label for="restablecer_email" data-error="wrong" data-success="right">Email</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">lock_outline</i>
              <input
                id="id_number"
                type="tel"
                v-model="identificacion"
                v-mask="'####-####-#####'"
                v-on:keyup.enter="find_employee"
              />
              <label for="identificacion">Número de Identidad</label>
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
          <!-- Mensajes de Errores -->
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
        </form>
        <center>
          <a class="waves-light btn col s12 green accent-3" @click="find_employee()">
            <i class="material-icons left">save</i>
            Guardar
          </a>
        </center>
      </div>

      <div class="modal-footer">
        <a @click="salir()" class="modal-close white-text red lighten-1 btn-flat">Salir</a>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="modal_update" class="modal">
      <div class="modal-content">
        <h4>
          <b class="orange-text">Confirmación:</b>
        </h4>
        <p>Ingrese el codigo de verificación en la caja de texto:</p>
        <center>
          <h4 oncopy="return false" onpaste="return false">
            <!-- b class="red-text otra_fuente">{{unic_key}}</b-->
          </h4>

          <input
            width="40%"
            oncopy="return false"
            onpaste="return false"
            type="text"
            v-model="codigo_validacion"
            id="codigo_validacion"
            v-on:keyup.enter="update_password"
          />
          <a class="green btn-flat white-text" @click="update_password()">Aceptar</a>
        </center>
      </div>
      <div class="modal-footer">
        <a class="red btn-flat white-text" @click="salir2()">Salir</a>
      </div>
    </div>

    <!--FIN DEL DIV CONTENEDOR-->
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.emailjs.com/dist/email.js" type="text/javascript"></script>

<script>
window.addEventListener("offline", function(e) {
  //console.log("offline, ocultando funcionalidades");
  //document.getElementById("flagmostrar").style.visibility = "hidden"
  for (let el of document.querySelectorAll(".flagmostrar"))
    el.style.visibility = "hidden";
});
window.addEventListener("online", function(e) {
  //console.log("online recobrando funcionalidades");
  //document.getElementById("flagmostrar").style.visibility = "visible";
  for (let el of document.querySelectorAll(".flagmostrar"))
    el.style.visibility = "visible";
});

window.onbeforeunload = function() {
  if (navigator.onLine) {
    //console.log("online");
  } else {
    //console.log("offline");
    return "Are you sure you want to leave?";
  }
};

import { firebase, database } from "../firebase";
//import { database } from "../firebase";
import { mapState, mapMutations } from "vuex";
import { mask } from "vue-the-mask";

export default {
  name: "LoginCard",
  data() {
    return {
      email: "",
      password: "",
      validation: "",
      active: "deactive",
      restablecer_email: "",
      identificacion: "",
      nuevo_password: "",
      nuevo_password_copia: "",
      selected_employee: "",
      unic_key: "",
      codigo_validacion: "",
      num_intento: 0
    };
  },
  components: {
    firebase,
    database
  },
  directives: { mask },
  computed: {
    ...mapState(["NAME"]),
    ...mapState(["Bandera"])
  },
  methods: {
    beforePageDestroyed: function(event) {
      alert("NO HAY ESCAPE, BUAJAJA!!");
    },
    validatePassword: function(pass) {
      var re = /^(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;
      return re.test(String(pass));
    },

    encryption: function(pass) {
      let key = this.$CryptoJS.enc.Hex.stringify("santaburga1234");
      let iv = this.$CryptoJS.enc.Hex.stringify("keyIVSantaBurga");
      let encryptionPass = this.$CryptoJS.AES.encrypt(pass, key, { iv: iv });
      return encryptionPass.toString();
    },
    decryption: function(pass) {
      let key = this.$CryptoJS.enc.Hex.stringify("santaburga1234");
      let iv = this.$CryptoJS.enc.Hex.stringify("keyIVSantaBurga");
      let decryptionPass = this.$CryptoJS.AES.decrypt(pass, key, {
        iv: iv
      }).toString(this.$CryptoJS.enc.Latin1);
      return decryptionPass;
    },
    validate_form: function() {
      if (
        this.restablecer_email === "" ||
        this.identificacion === "" ||
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
        //console.log(this.email, "=>", this.password);
        database
          .collection("Actor")
          .get()
          .then(querySnapshot => {
            var found = false;

            querySnapshot.docs.forEach(doc => {
              if (this.email === doc.data().email_encargado) {
                if (
                  this.password ===
                  /*this.decryption(*/ doc.data().contrasena /*)*/
                ) {
                  found = true;

                  window.localStorage.setItem("NAME", doc.data().NAME);
                  M.toast({ html: "Bienvenido" });
                  localStorage.setItem("token", "abc");
                  (async () => {
                    let promise = new Promise((resolve, reject) => {
                      setTimeout(() => resolve("done!"), 1000);
                    });
                    let result = await promise;

                    this.$router.push("/about");
                    //console.log("ENTRANDO.....");
                    this.$store.commit("get_data", null);
                  })();
                } else {
                }
              } else {
              }
            }); //NO

            if (!found) {
              this.password = "";
              //console.log("NO ENTRA");
              M.toast({ html: "Datos incorrectos" });
            } else {
            }
          })
          .catch(function(error) {
            //console.log("Error getting documents: ", error);
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
          .collection("EMPLOYEE")
          .doc(this.selected_employee.ID)
          .update({
            NAME: this.selected_employee.data.NAME,
            SURNAME: this.selected_employee.data.SURNAME,
            ROLE: this.selected_employee.data.ROLE,
            ID_NUMBER: this.selected_employee.data.ID_NUMBER,
            E_MAIL: this.selected_employee.data.E_MAIL,
            PASSWORD: this.encryption(this.nuevo_password)
          })
          .then(() => {
            //console.log("Employee successfully updated!");
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
          .collection("EMPLOYEE")
          .get()
          .then(querySnapshot => {
            var found = false;
            var key = "";
            querySnapshot.docs.forEach(doc => {
              if (this.restablecer_email === doc.data().E_MAIL) {
                if (
                  this.identificacion.replace(/[^\w\s]/gi, "") ===
                  doc.data().ID_NUMBER
                ) {
                  found = true;
                  this.selected_employee = { ID: doc.id, data: doc.data() };
                  this.generate_code();
                  this.enviar();
                  M.Modal.getInstance(modal_update).open();
                  return true;
                }
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
            //console.log("Error getting documents: ", error);
          });
      } //fin del if
      return false;
    },
    generate_code() {
      var chars = "0123456789abcdefABCDEF?¿:;_-GIJKLMNOPQRSTUVWXYZ";
      var lon = 10;
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
        to_email: "plataforma.actores.juticalpa@gmail.com",
        code: this.unic_key
      };

      if (this.restablecer_email == "admin@plataforma.org") {
        emailjs.send("gmail", "recuperacion_password", data).then(
          function(response) {
            if (response.text === "OK") {
              M.toast({
                html:
                  "El codigo se ha enviado exitosamente a su bandeja de entrada"
              });
            }
          },
          function(err) {
            M.toast({
              html: "Se ha producido un error, el mensaje no se ha enviado"
            });
            //console.log("FAILED. error=", err);
          }
        );
      }
    }
  },

  mounted: function() {
    M.AutoInit();

    //Hace que el modal de restablecer contrasena no se cierre si da click afuera
    var m = M.Modal.getInstance(modal_restablecer_password);
    m.options.dismissible = false;
    var m1 = M.Modal.getInstance(modal_update);
    m1.options.dismissible = false;
  }
};
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".slider");
  var instances = M.Slider.init(elems);
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Julius+Sans+One&display=swap");
@import url("https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap");
#login-page {
  /*font-family: "Julius Sans One", sans-serif;*/
  width: 500px;
}

.card {
  /*font-family: "Julius Sans One", sans-serif;*/
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
  /*font-family: "Press Start 2P", cursive;*/
}

.arriba {
  z-index: -1;
}
</style>
