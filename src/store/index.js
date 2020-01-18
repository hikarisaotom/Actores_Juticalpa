import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   /* role:window.localStorage.getItem('Role'),
    usuario:window.localStorage.getItem('usuario'),
    organizacion:window.localStorage.getItem('Organizacion'),*/
    bandera_Log:false
  },
  mutations: {
    cambiar_bandera(state,valor){
      state.bandera_Log=valor;
      console.log("CAMBIANDO LA BANDERA DLE STATE",valor);
    }
  },
  actions: {
  },
  modules: {
  }
})
