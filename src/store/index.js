import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   /* role:window.localStorage.getItem('Role'),
    usuario:window.localStorage.getItem('usuario'),
    organizacion:window.localStorage.getItem('Organizacion'),
    bandera_Log:window.localStorage.getItem('login')*/
  },
  mutations: {
   /* Estado_Bandera(state) {
      var Valor=window.localStorage.getItem('login')
      console.log("VALOR QUE HAY EN LA VARIABLE",Valor)
      if(Valor==true){
        this.bandera_Log=true
      }else{
        this.bandera_Log=false
        window.localStorage.setItem('Role',"invitado")
        window.localStorage.setItem('usuario',"invitado")
        window.localStorage.setItem('Organizacion',"invitado")
        window.localStorage.setItem('login',false)


      }
      console.log("Valor de la Bandera: ",this.bandera_Log)
      console.log("Valor del usuario: ", this.usuario)
    },
    Get_datos(state) {
      this.role=window.localStorage.getItem('Role'),
      this.usuario=window.localStorage.getItem('usuario'),
      this.organizacion=window.localStorage.getItem('Organizacion'),
      this.bandera_Log=window.localStorage.getItem('login')
      console.log("CAMBIO DE DATOS",this.usuario);
    },
    Set_datos(state,nuevo_val) {
      
      this.usuario=nuevo_val
      window.localStorage.setItem('usuario',nuevo_val)
      console.log("CAMBIARON LOS DATOS A ", nuevo_val);
    }*/
  },
  actions: {
  },
  modules: {
  }
})
