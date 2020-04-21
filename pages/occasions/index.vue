<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        v-if="!occasions.length"
        cols="12"
        sm="8"
        md="8"
        lg="8"
        xl="6"
      >
        <v-card
          :color="items['1'].color"
          dark
          shaped
          raised
        >
          <v-card-text>
            لا يوجد مناسبات جديدة
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="(occasion) in occasions"
        :key="occasion.id"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
      >
        <v-card
          dark
          shaped
          :color="items['1'].color"
          raised
          class="text-center"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">
                <h4 class="holy-text">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </h4>
              </v-list-item-title>
              <p class="holy-text">
                يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ <i class="fas fa-bookmark fa-xs" area-hidden="true" /> ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً <i class="fas fa-bookmark fa-xs" area-hidden="true" /> فَادْخُلِي فِي عِبَادِي <i class="fas fa-bookmark fa-xs" area-hidden="true" /> وَادْخُلِي جَنَّتيِ.
              </p>
              <p class="holy-text text-left">
                صدق اللَّهُ العظيم
              </p>
              <p class="font-weight-bold holy-text pt-3 pb-0 mb-0">
                إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
              </p>
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="grey--text text--lighten-2 pt-0 mt-0">
            <span class="font-weight-bold">
              {{ occasion.gender === 'male' ? 'إنتقل' : 'إنتقلت' }} إلى رحمة اللّه تعالى
            </span>
            <span class="font-weight-bold">
              {{ occasion.gender === 'male' ? 'المرحوم' : 'المرحومة' }}
            </span>
            <h2 class="font-weight-bolder white--text display-1 pt-2">
              {{ occasion.name }}
            </h2>
            <p class="font-weight-bold mt-3">
              {{ occasion.relatives }}
            </p>
            <p class="text-right text-justify" style="text-indent: 4rem;">
              وذلك في <span class="font-weight-bold white--text">{{ occasion.deathTime }}</span> يوم {{ dayName(occasion.deathDate) }} <span class="font-weight-bold white--text" dir="rtl">{{ occasion.deathDate }}</span> ،
              الصلاة على {{ occasion.gender === 'male' ? 'المرحوم' : 'المرحومة' }} في جامع <span class="font-weight-bold white--text">{{ occasion.mosqueName }}</span> وسيتم الدفن في مقبرة <span class="font-weight-bold white--text">{{ occasion.graveyard }}</span> يوم {{ dayName(occasion.buryDate) }} <span class="font-weight-bold white--text" dir="rtl">{{ occasion.buryDate }}</span> بعد صلاة <span class="font-weight-bold white--text">{{ occasion.prayTime }}.</span>
            </p>
            <p class="text-right text-justify">
              تقبل التعازي في <span class="font-weight-bold white--text">{{ occasion.place }}</span> وذلك لمدة ثلاثة أيام من تاريخ الدفن.
            </p>
          </v-card-text>

          <v-card-actions>
            <span class="caption"><v-icon small right>fas fa-feather</v-icon>نُشر من قبل <strong>{{ occasion.author }}</strong></span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Parse from 'parse'

export default {
  data () {
    return {
      occasions: []
    }
  },
  computed: {
    items () {
      return this.$store.state.mainCategories.items
    }
  },
  created () {
    this.loadOccasions()
  },
  methods: {
    loadOccasions () {
      if (process.client) {
        if (this.$nuxt.isOnline) {
          Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
          Parse.initialize(
            'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
            'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
          )
          const Occasion = Parse.Object.extend('Occasion')
          const query = new Parse.Query(Occasion)
          query.descending('createdAt')
          query.find().then((results) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
            results.forEach((occasion) => {
              this.occasions.push({
                id: occasion.id,
                name: occasion.get('name'),
                relatives: occasion.get('relatives'),
                deathTime: occasion.get('deathTime'),
                mosqueName: occasion.get('mosqueName'),
                graveyard: occasion.get('graveyard'),
                prayTime: occasion.get('prayTime'),
                place: occasion.get('place'),
                phone: occasion.get('phone'),
                gender: occasion.get('gender'),
                deathDate: occasion.get('deathDate'),
                buryDate: occasion.get('deathDate'),
                author: occasion.get('author')
              })
            })
            this.$localForage.occasions.setItem('occasions', this.occasions)
          })
        } else {
          this.$localForage.occasions.getItem('occasions').then((occasions) => {
            this.occasions = occasions
          })
        }
      }
    },
    dayName (dateString) {
      const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
      const d = new Date(dateString)
      const dayName = days[d.getDay()]
      return dayName
    }
  }
}
</script>

<style scoped>
  @font-face {
    font-family: Quran;
    src: url('~assets/quran.ttf');
  }
  .nuxt-link{
    text-decoration: none;
  }
  .holy-text {
    line-height: 1.7rem;
    font-family: Quran,'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.5rem;
  }
</style>
