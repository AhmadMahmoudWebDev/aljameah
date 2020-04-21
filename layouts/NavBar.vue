<template>
  <v-container>
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      fixed
      color="teal darken-4"
      dark
      shrink-on-scroll
      scroll-threshold="300"
      src="https://ahmadmahmoud.sirv.com/aljameah/header.jpg"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top, rgba(55,236,186,.7), rgba(25,32,72,.6)"
        />
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>
        <h1 class="headline font-weight-bold">
          الجمعية التضامنية الإجتماعية الخيرية
        </h1>
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs
          v-model="currentItem"
          fixed-tabs
          slider-color="white"
          background-color="rgba(0, 0, 0, 0)"
          dark
        >
          <v-tab
            v-for="item in items"
            :key="item.id"
            :to="item.link"
            class="white--text"
          >
            <v-icon color="white" class="visible-sm-and-down hidden-md-and-up">
              {{ item.icon }}
            </v-icon>
            <span class="hidden-sm-and-down">
              <v-icon class="left">
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </span>
          </v-tab>
        </v-tabs>
      </template>
      <v-spacer />
      <nuxt-link to="/">
        <v-avatar>
          <img
            src="https://ahmadmahmoud.sirv.com/aljameah/icon.gif?w=150&h=150"
            alt="aljameah logo"
          >
        </v-avatar>
      </nuxt-link>
    </v-app-bar>
    <v-navigation-drawer
      id="navDrawer"
      v-model="drawer"
      fixed
      temporary
    >
      <v-list-item class="teal darken-4" link to="/">
        <v-list-item-avatar>
          <v-img src="https://ahmadmahmoud.sirv.com/aljameah/icon.gif?w=150&h=150" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text">
            الجمعية التضامنية
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="currentUser" class="teal darken-4">
        <v-list-item-content>
          <v-list-item-title class="white--text text-center">
            أهلاً {{ currentUser }}
          </v-list-item-title>
        </v-list-item-content>
        <v-divider />
      </v-list-item>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :href="item.link"
          :to="item.link"
          :color="item.color"
          link
          ripple
        >
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="/occasions/create" to="/occasions/create" link ripple>
          <v-list-item-icon>
            <v-icon>
              far fa-edit
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              إضافة مناسبة وفاة
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!isInstalled" link ripple class="teal darken-4" @click="installApp()">
          <v-list-item-icon>
            <v-icon color="white">
              fas fa-download
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content class="white--text overline">
            تثبيت تطبيق الجمعية على جهازك
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import Parse from 'parse'
let deferredPrompt
if (process.client) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    // Stash the event so tit can be trigger later.
    deferredPrompt = e
  })
}
export default {
  name: 'Navbar',
  data: () => ({
    collapseOnScroll: true,
    drawer: false,
    currentItem: '',
    isInstalled: false
  }),
  computed: {
    items () {
      return this.$store.state.mainCategories.items
    },
    currentUser () {
      let username = null
      if (process.client) {
        Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
        Parse.initialize(
          'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
          'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
        )
        const currentUser = Parse.User.current()
        if (currentUser) {
          username = currentUser.getUsername()
        } else {
          username = null
        }
      }
      return username
    }
  },
  created () {
    try {
      if (process.client) {
        this.isInstalled = this.$localForage.generalInfo.getItem('isInstall')
      }
    } catch {
      this.isInstalled = false
    }
  },
  methods: {
    installApp () {
      if (process.client) {
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
          // eslint-disable-next-line no-console
            console.log('User accepted the install prompt')
            this.$localForage.generalInfo.setItem('isInstall', true)
          } else {
          // eslint-disable-next-line no-console
            console.log('User dismissed the install prompt')
          }
          deferredPrompt = null
        })
      }
    }
  }
}
</script>

<style scoped>
h1 {
  text-shadow: 0.1rem .1rem .3rem #203553, .1rem .1rem .3rem #203553;
}
#navDrawer {
  background-color: #E0F2F1;
}
.v-tabs {
  text-shadow: 0.1rem .1rem .3rem #203553, .1rem .1rem .3rem #203553;
}
.v-toolbar__title {
  white-space: normal !important;
}
</style>
