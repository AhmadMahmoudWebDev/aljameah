<template>
  <v-card-text>
    <v-textarea
      v-model="place"
      :counter="254"
      :rules="placeRules"
      :change="addToForm('place', place)"
      name="place"
      label="تُقبل التعازي في"
      hint="مكان التعزية، يمكن التفصيل"
      required
    />
    <v-text-field
      v-model="phone"
      :rules="phoneRules"
      :change="addToForm('phone', phone)"
      label="للإتصال أو التعازي"
      required
      hint="إختياري"
      type="number"
    />
  </v-card-text>
</template>
<script>
export default {
  name: 'Step3',
  data: () => ({
    place: '',
    placeRules: [
      v => !!v || 'حقل مكان التعزية مطلوب',
      // eslint-disable-next-line no-misleading-character-class
      v => v.match(/^[0-9٠-٩\sأ-يء ّ ءَ:. ً ُ]+$/) ? true : false || 'فقط أحرف عربية و أرقام',
      v => (v && v.length <= 254) || 'على الحقل ألا يتجاوز ال 254 حرف'
    ],
    phone: '',
    phoneRules: [
      v => v.match(/^[0-9٠-٩]+$/) ? true : false || 'أرقام فقط',
      v => (v && v.length <= 10) || 'على الحقل ألا يتجاوز ال 10 رقم'
    ]
  }),
  methods: {
    addToForm (key, text) {
      this.$store.commit('createOccasion/add', { key, text })
    }
  }
}
</script>
