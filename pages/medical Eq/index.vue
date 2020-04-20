<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        v-if="!medicalEqs.length"
        cols="12"
        sm="8"
        md="8"
        lg="8"
        xl="6"
      >
        <v-card
          :color="items['2'].color"
          dark
          shaped
          raised
        >
          <v-card-text>
            لا يوجد معدّات طبية جديدة
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="(medicalEq) in medicalEqs"
        :key="medicalEq.id"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="4"
      >
        <v-card
          dark
          shaped
          :color="items['2'].color"
          raised
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ medicalEq.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-carousel
            v-if="medicalEq.image1 != undefined || medicalEq.image2 != undefined || medicalEq.image3 != undefined"
            show-arrows-on-hover
            continuous
            cycle
            delimiter-icon="fas fa-image"
            height="300"
          >
            <v-carousel-item v-if="medicalEq.image1 != undefined" :key="medicalEq.image1._name">
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
                    :src="medicalEq.image1._url"
                    contain
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
            <v-carousel-item v-if="medicalEq.image2 != undefined" :key="medicalEq.image2._name">
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
                    :src="medicalEq.image2._url"
                    contain=""
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
            <v-carousel-item v-if="medicalEq.image3 != undefined" :key="medicalEq.image3._name">
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
                    :src="medicalEq.image3._url"
                    contain
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

          <v-card-text class="text-justify white--text">
            {{ medicalEq.excerpt }}
          </v-card-text>

          <v-card-actions>
            <v-chip
              color="primary"
              dark
              ripple
              :link="true"
              href="tel:00963112712550"
            >
              <span dir="ltr" class="font-weight-bold">+963-11-271 25 50</span>
              <v-avatar right>
                <v-icon>fa fa-phone</v-icon>
              </v-avatar>
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Parse from 'parse'

export default {
  data: () => ({
    medicalEqs: []
  }),
  computed: {
    items () {
      return this.$store.state.mainCategories.items
    }
  },
  created () {
    this.loadMedicalEqs()
  },
  methods: {
    loadMedicalEqs () {
      if (process.client) {
        const online = navigator.onLine
        if (online) {
          Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
          Parse.initialize(
            'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
            'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
          )
          const MedicalEq = Parse.Object.extend('MedicalEq')
          const query = new Parse.Query(MedicalEq)
          query.find().then((results) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
            results.forEach((medicalEq) => {
              this.medicalEqs.push({
                id: medicalEq.id,
                title: medicalEq.get('title'),
                excerpt: medicalEq.get('excerpt'),
                image1: medicalEq.get('image1'),
                image2: medicalEq.get('image2'),
                image3: medicalEq.get('image3')
              })
            })
            this.$localForage.medicalEqs.setItem('medicalEqs', this.medicalEqs)
          })
        } else {
          this.$localForage.medicalEqs.getItem('medicalEqs').then((medicalEqs) => {
            this.medicalEqs = medicalEqs
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
