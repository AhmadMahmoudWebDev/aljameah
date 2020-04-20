<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        v-if="!latestNews.length"
        cols="12"
        sm="8"
        md="8"
        lg="8"
        xl="6"
      >
        <v-card
          :color="items['0'].color"
          dark
          shaped
          raised
        >
          <v-card-text>
            لا يوجد أخبار جديدة للجمعية
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="(latestNew) in latestNews"
        :key="latestNew.id"
        cols="12"
        sm="8"
        md="8"
        lg="8"
        xl="6"
      >
        <v-card
          dark
          shaped
          :color="items['0'].color"
          raised
        >
          <v-row v-if="latestNew.image1 != undefined || latestNew.image2 != undefined || latestNew.image3 != undefined" dense>
            <v-col
              v-if="latestNew.image1 != undefined"
              :key="latestNew.image1._name"
              cols="12"
            >
              <v-img :src="latestNew.image1._url">
                <v-avatar tile @click="previewImage(latestNew.title, latestNew.image1._url)">
                  <v-icon>
                    fa fa-search-plus
                  </v-icon>
                </v-avatar>
              </v-img>
            </v-col>
            <v-col
              v-if="latestNew.image2 != undefined"
              :key="latestNew.image2._name"
              cols="6"
            >
              <v-img :src="latestNew.image2._url">
                <v-avatar tile @click="previewImage(latestNew.title, latestNew.image2._url)">
                  <v-icon>
                    fa fa-search-plus
                  </v-icon>
                </v-avatar>
              </v-img>
            </v-col>
            <v-col
              v-if="latestNew.image3 != undefined"
              :key="latestNew.image3._name"
              cols="6"
            >
              <v-img :src="latestNew.image3._url">
                <v-avatar tile @click="previewImage(latestNew.title, latestNew.image3._url)">
                  <v-icon>
                    fa fa-search-plus
                  </v-icon>
                </v-avatar>
              </v-img>
            </v-col>
          </v-row>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-center font-weight-bold">
                {{ latestNew.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="mb-0 pb-0 float-left">
                {{ latestNew.updatedAt.toLocaleDateString() }}
                <v-icon right small>
                  fas fa-calendar-alt
                </v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="text-justify white--text pt-0">
            {{ latestNew.excerpt }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card dark color="rgba(0, 0, 0, 0.8)">
          <v-toolbar dark :color="items['0'].color">
            <v-btn icon dark @click="dialog = false">
              <v-icon>fa-window-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ dialogImageTitle }}</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn dark text @click="dialog = false">
                إغلاق
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-img :src="dialogImageUrl" />
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import Parse from 'parse'

export default {
  data: () => ({
    latestNews: [],
    dialog: false,
    dialogImageTitle: '',
    dialogImageUrl: ''
  }),
  computed: {
    items () {
      return this.$store.state.mainCategories.items
    }
  },
  created () {
    this.loadLatestNews()
  },
  methods: {
    loadLatestNews () {
      if (process.client) {
        const online = navigator.onLine
        if (online) {
          Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
          Parse.initialize(
            'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
            'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
          )
          const LatestNews = Parse.Object.extend('News')
          const query = new Parse.Query(LatestNews)
          query.find().then((results) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
            results.forEach((latestNew) => {
              this.latestNews.push({
                id: latestNew.id,
                title: latestNew.get('title'),
                excerpt: latestNew.get('excerpt'),
                image1: latestNew.get('image1'),
                image2: latestNew.get('image2'),
                image3: latestNew.get('image3'),
                updatedAt: latestNew.get('updatedAt')
              })
            })
            this.$localForage.latestNews.setItem('latestNews', this.latestNews)
          })
        } else {
          this.$localForage.latestNews.getItem('latestNews').then((latestNews) => {
            this.latestNews = latestNews
          })
        }
      }
    },
    previewImage (imageTitle, imageUrl) {
      this.dialog = true
      this.dialogImageTitle = imageTitle
      this.dialogImageUrl = imageUrl
    }
  }
}
</script>

<style scoped>
  .nuxt-link{
    text-decoration: none;
  }
</style>
