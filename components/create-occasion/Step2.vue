<template>
  <v-card-text>
    <v-radio-group v-model="deathTime" :change="addToForm('deathTime', deathTime)" :rules="checkRules" row>
      <span> يرجى الإختيار بين:</span>
      <v-radio label="صباح" value="صباح" />
      <v-radio label="مساء" value="مساء" />
    </v-radio-group>
    <v-menu
      v-model="deathDatePicker"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="deathDate"
          label="تاريخ الوفاة"
          prepend-icon="far fa-calendar-alt"
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="deathDate"
        :change="addToForm('deathDate', deathDate)"
        color="#212121"
        locale="ar-sy"
        @input="deathDatePicker = false"
      />
    </v-menu>
    <v-text-field
      v-model="mosqueName"
      :counter="50"
      :rules="nameRules"
      :change="addToForm('mosqueName', mosqueName)"
      label="الصلاة على المتوفى في جامع"
      required
    />
    <v-select
      v-model="graveyardSelect"
      :items="graveyard"
      :rules="[v => !!v || 'إسم المقبرة مطلوب']"
      :change="addToForm('graveyard', graveyardSelect)"
      label="إسم المقبرة"
      required
      dark=""
    />
    <v-menu
      v-model="buryDatePicker"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="buryDate"
          label="تاريخ الوفاة"
          prepend-icon="far fa-calendar-alt"
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="buryDate"
        :change="addToForm('buryDate', buryDate)"
        color="#212121"
        locale="ar-sy"
        @input="buryDatePicker = false"
      />
    </v-menu>
    <v-select
      v-model="prayTimeSelect"
      :items="prayTime"
      :rules="[v => !!v || 'وقت الصلاة على المتوفى مطلوب']"
      :change="addToForm('prayTime', prayTimeSelect)"
      label="وقت الصلاة على المتوفى"
      required
      dark
    />
  </v-card-text>
</template>
<script>
export default {
  name: 'Step2',
  data: () => ({
    deathTime: '',
    checkRules: [
      v => !!v || 'يرجى الإختيار'
    ],
    deathDatePicker: false,
    deathDate: new Date().toISOString().substr(0, 10),
    mosqueName: '',
    nameRules: [
      v => !!v || 'الإسم مطلوب',
      // eslint-disable-next-line no-misleading-character-class
      v => v.match(/^[\sأ-يء ّ ءَ ً ُ]+$/) ? true : false || 'فقط أحرف عربية',
      v => (v && v.length <= 50) || 'على الإسم ألا يتجاوز ال 50 حرف'
    ],
    graveyardSelect: null,
    graveyard: [
      'الكسوة الشرقية',
      'الكسوة الغربية'
    ],
    buryDatePicker: false,
    buryDate: new Date().toISOString().substr(0, 10),
    prayTimeSelect: null,
    prayTime: [
      'الظهر',
      'العصر'
    ]
  }),
  methods: {
    addToForm (key, text) {
      this.$store.commit('createOccasion/add', { key, text })
    }
  }
}
</script>
