<template>
  <div class="home">
   

  </div>
</template>

<script>
// @ is an alias to /src
import login from '@/components/login.vue'

export default {
  name: 'home',
  components: {
    login
  } , mounted: function() {
    this.$router.push("/about");
  }
}
</script>
