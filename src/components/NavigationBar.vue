<template>
  <div>
    <div>
      <nav class="nav-extended grey darken-4" id="navigation_bar_logo">
        <div class="nav-wrapper" style="height:100px;">
          <a href="#" class="brand-logo">
            <b>Juticalpa</b>
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a >About</a>
            </li>
            <li>
              <a >Log In</a>
            </li>
          </ul>
        </div>
        <div class="nav-content">
          <ul class="tabs tabs-transparent">
            <li class="tab">
              <router-link to="/organization">
                <b>Organizations</b>
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
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>

<script>
export default {
  name: "navigation_bar",
  data: () => ({
    bgArray: [
      "https://www.itl.cat/pngfile/big/106-1060019_get-it-now-lord-shiva-facebook-cover-page.jpg",
      "http://staticpopopics.popopics.com/uploads/original/beautiful-hd-wallpaper-for-facebook-cover.jpg",
      "https://beinglol.com/media/facebook-cover/Sunset-facebook-covers-3236.jpeg"
    ],
    i: 0
  }),
  mounted: function() {
    M.AutoInit();
    this.ChangeBackground();
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
#navigation_bar_logo {
  transition: background 1s;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#contenido {
  height: 470px;
  overflow: auto;
}

.x {
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
</style>