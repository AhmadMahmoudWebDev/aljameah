<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-card-actions>
          <v-btn v-on="on" left color="info" ripple dark>
            معاينة الطلب
            <v-icon right>
              far fa-file-alt
            </v-icon>
          </v-btn>
          <v-card-actions />
        </v-card-actions>
      </template>
      <v-card>
        <v-toolbar dark color="#212121">
          <v-btn @click="dialog = false" icon dark>
            <v-icon>fa-window-close</v-icon>
          </v-btn>
          <v-toolbar-title>معاينة المناسبة</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn @click="dialog = false" dark text>
              تم
              <v-icon right>
                fa-check
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container fluid>
          <v-row justify="center">
            <v-col
              cols="12"
              sm="6"
              md="6"
              lg="4"
            >
              <v-card
                dark
                shaped
                color="#212121"
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
                      يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ <i class="fas fa-bookmark" area-hidden="true" /> ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً <i class="fas fa-bookmark" area-hidden="true" /> فَادْخُلِي فِي عِبَادِي <i class="fas fa-bookmark" area-hidden="true" /> وَادْخُلِي جَنَّتيِ.
                    </p>
                    <p class="font-weight-bold holy-text">
                      صدق اللَّهُ العظيم
                    </p>
                    <p class="font-weight-bold holy-text title">
                      إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                    </p>
                  </v-list-item-content>
                </v-list-item>

                <v-card-text class="grey--text text--lighten-2">
                  <span class="font-weight-bold title">
                    {{ items.gender === 'male' ? 'إنتقل' : 'إنتقلت' }} إلى رحمة اللّه تعالى
                  </span>
                  <span class="font-weight-bold title">
                    {{ items.gender === 'male' ? 'المرحوم' : 'المرحومة' }}
                  </span>
                  <h2 class="font-weight-bolder display-1">
                    {{ items.name }}
                  </h2>
                  <p class="font-weight-bold mt-2">
                    {{ items.relatives }}
                  </p>
                  <p class="text-right">
                    وذلك في <span class="font-weight-bold">{{ items.deathTime }}</span> يوم {{ dayName(items.deathDate) }} <span class="font-weight-bold" dir="rtl">{{ items.deathDate }}</span> ،
                    الصلاة على {{ items.gender === 'male' ? 'المرحوم' : 'المرحومة' }} في جامع <span class="font-weight-bold">{{ items.mosqueName }}</span> وسيتم الدفن في مقبرة <span class="font-weight-bold">{{ items.graveyard }}</span> يوم {{ dayName(items.buryDate) }} <span class="font-weight-bold" dir="rtl">{{ items.buryDate }}</span> بعد صلاة <span class="font-weight-bold">{{ items.prayTime }}.</span>
                  </p>
                  <p class="text-right">
                    تقبل التعازي في <span class="font-weight-bold">{{ items.place }}</span> وذلك لمدة ثلاثة أيام من تاريخ الدفن.
                  </p>
                </v-card-text>

                <v-card-actions>
                  <span class="caption"><v-icon small right>fas fa-feather</v-icon>نُشر من قبل <strong>{{ items.author }}</strong></span>
                  <v-spacer />
                  <v-btn icon>
                    <v-icon>fas fa-share-alt</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: 'PreviewOrder',
  data: () => ({
    dialog: false
  }),
  computed: {
    items () {
      return this.$store.state.createOccasion.list
    }
  },
  methods: {
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
  .holy-text {
    line-height: 1.7rem;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
</style>
