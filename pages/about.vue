<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="8"
        lg="5"
        xl="4"
      >
        <v-card
          dark
          shaped
          :color="items['3'].color"
          class="mt-3"
          raised
        >
          <v-card-text>
            <h2 class="white--text">
              الجمعية التضامنية الإجتماعية الخيرية
            </h2>
          </v-card-text>
          <v-card-subtitle class="pt-0">
            رقم و تاريخ شهرها: ٨٦٠-لعام ١٩٦٦<sub>م</sub> وتاريخ تعديل شهرها في ٢٨-٨-١٩٩٧<sub>م</sub>
          </v-card-subtitle>
          <v-card-text class="text-justify">
            <h3 class="white--text">
              أهداف الجمعية:
            </h3>
            <ul class="px-4">
              <li>
                مساعدة جميع الأعضاء في الحالات المرضية و العمليات الجراحية و الكوارث بما يراه مجلس الإدارة ضروري و ضمن إمكانيات الجمعية.
              </li>
              <li>
                مساعدة أسر الأعضاء الفقيرة في حالات الوفاة.
              </li>
              <li>
                تقديم المساعدات المالية و العينية للأرامل و الأيتام بشكل دوري.
              </li>
            </ul>
          </v-card-text>
          <Members />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="6"
      >
        <Delegates />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Delegates from '~/components/Delegates'
import Members from '~/components/Members'

export default {
  components: {
    Delegates,
    Members
  },
  computed: {
    items () {
      return this.$store.state.mainCategories.items
    }
  }
}
</script>
