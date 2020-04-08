<template>
  <v-app dark class="bg">
    <Navbar />
    <v-spacer />
    <v-content class="pt-12 mt-12">
      <v-container class="pt-12 mt-12">
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './NavBar'
import Footer from './Footer'

export default {
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      // data
    }
  }
}
</script>

<style scoped>
.bg {
  background-image: url('https://ahmadmahmoud.sirv.com/aljameah/context%20background.png');
  background-size: cover;
  background-position: center;
}
</style>
