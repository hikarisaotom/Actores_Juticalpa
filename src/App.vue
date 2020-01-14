
<template>
  <div id="app">
    <div id="nav">
    </div>
    <table id="tabla_principal">
      <tr  >
        <td width="5%" id="menu_lateral">
         
        </td>
        <td id="principal" >
          <router-view />
        </td>
      </tr>
    </table>
  </div>
</template>
  
  <script>
  /*RECORDA PONER LAS DESCRIPCIONES */
 // import { mapState, mapMutations } from "vuex";

export default {
   name: "app",
  components: {
 
  },  data: () => ({
    
    
  }),
  mounted() {

   
    
    
  }, 
  /*computed: {

  },
  methods: {

    
  }*/

};
</script>

<style scoped>
#tabla_principal{
  height:100%;
  /*background-color: #fff8e1;*/
  padding: 0px;
  overflow-y: auto;

}
#app{
  margin:0px;
  height:100%;
  width: 100%;
  /*background-color: #fff8e1;*/
  padding: 0px;
}
#principal{
 /* background-color:#fff8e1  ;*/
  padding: 0px;
  overflow-y: auto;
  height: 100%;
  
}
#menu_lateral{
  padding: 0px;
}
</style>