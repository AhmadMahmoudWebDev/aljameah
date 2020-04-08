<template>
  <div class="container-fluid mt-9 pt-7">
    <v-tabs
      v-model="tab"
      icons-and-text
      background-color="teal darken-4"
      class="elevation-2"
      show-arrows
      dark
    >
      <v-tabs-slider />

      <v-tab
        v-for="item in items"
        :key="item.title"
        :href="`#tab-${item.title}`"
      >
        {{ item.title }}
        <v-icon>
          {{ item.icon }}
        </v-icon>
      </v-tab>

      <v-tab-item
        v-for="item in items"
        :key="item.title"
        :value="'tab-' + item.title"
      >
        <v-card
          flat
          tile
        >
          <v-card-text>
            <LatestNews v-if="item.title === 'أخبار الجمعية'" :color="item.color" />
            <MedicalEqs v-if="item.title === 'الأجهزة الطبية'" />
            <Occasions v-if="item.title === 'الوفيات'" />
            <About v-if="item.title === 'عن الجمعية'" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import LatestNews from '~/components/editor/LatestNews'
import MedicalEqs from '~/components/editor/MedicalEqs'
import Occasions from '~/components/editor/Occasions'
import About from '~/components/editor/About'
export default {
  components: {
    LatestNews,
    MedicalEqs,
    Occasions,
    About
  },
  data () {
    return {
      tab: null
    }
  },
  middleware: ['auth-admin'],
  computed: {
    items () {
      return this.$store.state.mainCategories.items
    }
  }
}
</script>
