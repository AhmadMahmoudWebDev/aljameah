<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        v-if="!latestNews.length"
        cols="12"
        sm="8"
        md="8"
        lg="8"
        xl="8"
      >
        <v-card
          :color="items['0'].color"
          dark
          shaped
          raised
        >
          <v-card-title>
            لا يوجد أخبار جديدة للجمعية
          </v-card-title>
        </v-card>
      </v-col>
      <v-col
        v-for="(latestNew) in latestNews"
        :key="latestNew.id"
        cols="12"
        sm="8"
        md="8"
        lg="8"
        xl="8"
      >
        <v-card
          dark
          shaped
          :color="items['0'].color"
          raised
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ latestNew.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ latestNew.updatedAt.toLocaleDateString() }}
                <v-icon left>
                  fas fa-calendar-alt
                </v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-carousel
            v-if="latestNew.image1 != undefined || latestNew.image2 != undefined || latestNew.image3 != undefined"
            show-arrows-on-hover
            continuous
            cycle
            delimiter-icon="fas fa-image"
            height="300"
          >
            <v-carousel-item v-if="latestNew.image1 != undefined" :key="latestNew.image1._name">
              <v-sheet
                height="100%"
                color="rgba(0, 0, 0, .3)"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <v-img
                    :src="latestNew.image1._url"
                    cover
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5" />
                      </v-row>
                    </template>
                  </v-img>
                </v-row>
              </v-sheet>
            </v-carousel-item>
            <v-carousel-item v-if="latestNew.image2 != undefined" :key="latestNew.image2._name">
              <v-sheet
                height="100%"
                color="rgba(0, 0, 0, .3)"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <v-img
                    :src="latestNew.image2._url"
                    cover
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5" />
                      </v-row>
                    </template>
                  </v-img>
                </v-row>
              </v-sheet>
            </v-carousel-item>
            <v-carousel-item v-if="latestNew.image3 != undefined" :key="latestNew.image3._name">
              <v-sheet
                height="100%"
                color="rgba(0, 0, 0, .3)"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <v-img
                    :src="latestNew.image3._url"
                    cover
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5" />
                      </v-row>
                    </template>
                  </v-img>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>

          <v-card-text>
            {{ latestNew.excerpt }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Parse from 'parse'

export default {
  data: () => ({
    latestNews: []
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
    }
  }
}
</script>

<style scoped>
  .nuxt-link{
    text-decoration: none;
  }
</style>
