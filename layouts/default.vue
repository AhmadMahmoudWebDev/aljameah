<template>
  <v-app dark class="bg">
    <Navbar />
    <v-spacer />
    <v-content class="pt-12 mt-12">
      <v-container class="pt-12 mt-12">
        <v-alert
          v-if="$nuxt.isOffline"
          prominent
          type="info"
          class="caption"
        >
          إن التطبيق الآن يعمل بوضع غير متصل بالإنترنيت يمكنك مشاهدة آخر الأخبار و المناسبات التي تمت مشاهدتها مسبقاً <v-btn to="/" color="success">
            إعادة التحميل
          </v-btn>
        </v-alert>
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
