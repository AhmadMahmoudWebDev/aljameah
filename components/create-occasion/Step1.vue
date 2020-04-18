<template>
  <v-card-text>
    <v-radio-group v-model="gender" :change="addToForm('gender', gender)" :rules="checkRules" row>
      <span>يرجى الإختيار بين:</span>
      <v-radio label="المرحوم" value="male" />
      <v-radio label="المرحومة" value="female" />
    </v-radio-group>
    <v-text-field
      v-model="name"
      :counter="50"
      :rules="nameRules"
      :change="addToForm('name', name)"
      label="الإسم"
      required
      hint="يمكن إضافة لقب مثل: الحاج، الحاجة، الطفل، الشاب..."
    />

    <v-textarea
      v-model="relatives"
      :counter="100"
      :rules="relativesRules"
      :change="addToForm('relatives', relatives)"
      name="relatives"
      label="أقارب المتوفى"
      hint="مثال: والد كل من...،شقيق كل من..."
      required
    />
  </v-card-text>
</template>
<script>
export default {
  name: 'Step1',
  data: () => ({
    gender: '',
    checkRules: [
      v => !!v || 'يرجى الإختيار'
    ],
    name: '',
    nameRules: [
      v => !!v || 'الإسم مطلوب',
      // eslint-disable-next-line no-misleading-character-class
      v => v.match(/^[\sأ-يء ّ ءَ ً ُ]+$/) ? true : false || 'فقط أحرف عربية',
      v => (v && v.length <= 50) || 'على الإسم ألا يتجاوز ال 50 حرف'
    ],
    relatives: '',
    relativesRules: [
      v => !!v || 'حقل الأقارب مطلوب',
      // eslint-disable-next-line no-misleading-character-class
      v => v.match(/^[\sأ-يء ّ ءَ.: ً ُ]+$/) ? true : false || 'فقط أحرف عربية',
      v => (v && v.length <= 100) || 'على الحقل ألا يتجاوز ال 100 حرف'
    ]
  }),
  methods: {
    addToForm (key, text) {
      this.$store.commit('createOccasion/add', { key, text })
    }
  }
}
</script>
