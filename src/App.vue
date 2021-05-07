
<template>
  <div id="app" style="background-color:#CFD8DC">
    <navigation_bar></navigation_bar>
  </div>
</template>
  

  /*RECORDA PONER LAS DESCRIPCIONES */
 // import { mapState, mapMutations } from "vuex";

<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>

<script>
import navigation_bar from "./components/NavigationBar.vue";

export default {
  components: {
    navigation_bar
  }
};
</script>




   


<style scoped>
#app {
  /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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